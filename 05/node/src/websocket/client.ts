import { io } from '../http'
import { ConnectionsService } from '../resources/connection/connection.services'
import { UsersService } from '../resources/users/users.services'
import { MessagesService } from '../resources/messages/message.services'

interface IParams {
   text: string
   email: string
}

io.on('connection', async (socket) => {
   console.log(
      'OPENED\t\t',
      socket.id,
      'from',
      socket.handshake.headers.referer
   )

   const connectionsService = new ConnectionsService()
   const usersService = new UsersService()
   const messagesService = new MessagesService()

   socket.on('client_first_access', async (params: IParams) => {
      console.log('client_first_access:      ', params)

      const socket_id = socket.id
      const { text, email } = params
      const userExists = await usersService.findOne({ email })

      let user_id

      console.log(`CONNECTION \t${email} @ ${socket_id}`)

      if (!userExists) {
         console.log(`!REGISTERED \t${email}`)

         const user = await usersService.createOne({ email })

         user_id = user.id

         await connectionsService.createOne({
            socket_id,
            user_id
         })
      } else {
         console.log(`REGISTERED! \t${userExists.email}`)

         user_id = userExists.id

         let connection = await connectionsService.findOne({
            user_id: userExists.id
         })

         if (!connection) {
            console.log(`!CONNECTION \t${userExists.email}`)

            await connectionsService.createOne({
               socket_id,
               user_id: userExists.id
            })
         } else {
            console.log(
               `CONNECTION! \n\tid: ${connection.id}\n\told_s_id: ${connection.admin_id} `
            )

            await connectionsService.updateOneNew({
               set: {
                  socket_id
               },
               where: {
                  condition: 'user_id = :user_id',
                  object: { ['user_id']: user_id }
               }
            })

            connection = await connectionsService.findOne({
               user_id: userExists.id
            })
            if (connection) {
               console.log(`\tnew_s_id: ${connection.admin_id} `)
            }
         }
      }

      await messagesService.createOne({ user_id, text })

      const allMessages = await messagesService.getMany(user_id)

      socket.emit('client_list_all_messages', allMessages)

      const allConnectionsWithoutAdmin = await connectionsService.findMany({
         where: { admin_id: null, relations: ['user'] }
      })

      io.emit('admin_list_all_users', allConnectionsWithoutAdmin)
   })

   socket.on('admin_list_messages', async (params) => {
      const { admin_socket_id, user_id } = params

      await connectionsService.updateOneNew({
         set: {
            admin_id: admin_socket_id
         },
         where: {
            condition: 'user_id = :user_id',
            object: { ['user_id']: user_id }
         }
      })
   })

   socket.on('client_send_to_admin', async (params) => {
      const { text, socket_id } = params

      console.log('received params', params)

      const connection = await connectionsService.findOne({
         socket_id: socket_id
      })

      if (connection) {
         const message = await messagesService.createOne({
            text,
            user_id: connection.user_id
         })

         if (connection.admin_id) {
            console.log('we have admin?')
            console.log(connection.admin_id)
            const user = await usersService.findOne({ id: message.user_id })
            io.to(connection.admin_id).emit('admin_receive_message', {
               message,
               user
            })
         }
      }
   })
})
