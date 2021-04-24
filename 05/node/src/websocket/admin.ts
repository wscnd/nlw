import { io } from '../http'
import { ConnectionsService } from '../resources/connection/connection.services'
import { MessagesService } from '../resources/messages/message.services'

io.on('connect', async (socket) => {
   const connectionsService = new ConnectionsService()
   const messagesService = new MessagesService()

   const allConnectionsWithoutAdmin = await connectionsService.findMany({
      where: { admin_id: null, relations: ['user'] }
   })

   console.log(allConnectionsWithoutAdmin.length, ' chamadas em aberto')

   io.emit('admin_list_all_users', allConnectionsWithoutAdmin)

   socket.on('admin_list_messages', async (params, callback) => {
      const { user_id } = params

      const allMessages = await messagesService.getMany(user_id)
      callback(allMessages)
   })

   socket.on('admin_send_message', async (params) => {
      const { user_id, text } = params

      const connection = await connectionsService.findOne({ user_id })

      if (connection) {
         await messagesService.createOne({
            text,
            user_id,
            admin_id: connection.admin_id || null
         })

         if (connection.socket_id) {
            io.to(connection.socket_id).emit('admin_send_to_client', {
               text,
               socket_id: connection.socket_id
            })
         }
      }
   })
})
