import { io } from '../http'
import { ConnectionsService } from '../resources/connection/connection.services'
import { UsersService } from '../resources/users/users.services'
import { MessagesService } from '../resources/messages/message.services'

interface IParams {
   text: string
   email: string
}

io.on('connection', (socket) => {
   const connectionsService = new ConnectionsService()
   const usersService = new UsersService()
   const messagesService = new MessagesService()

   socket.on('client_first_access', async (params: IParams) => {
      console.log('client_first_access:      ', params)

      const socket_id = socket.id
      const { text, email } = params
      const userExists = await usersService.findByEmail(email)

      let user_id

      console.log(`CONNECTION \t${email} @ ${socket_id}`)

      if (!userExists) {
         console.log(`!REGISTERED \t${email}`)

         const user = await usersService.createOne({ email })

         await connectionsService.createOne({
            socket_id,
            user_id: user.id
         })
         user_id = user.id
      } else {
         console.log(`REGISTERED! \t${userExists.email}`)

         user_id = userExists.id

         const connection = await connectionsService.findOne(userExists.id)

         if (!connection) {
            console.log(`!CONNECTION \t${userExists.email}`)

            await connectionsService.createOne({
               socket_id,
               user_id: userExists.id
            })
         } else {
            console.log(
               `CONNECTION! \n\tid: ${connection.id}\n\told_s_id: ${connection.socket_id} `
            )
            connection.socket_id = socket_id
            console.log(`\tnew_s_id: ${connection.socket_id} `)
            await connectionsService.createOne({ ...connection })
         }
      }

      await messagesService.createOne({ user_id, text })

      const allMessages = await messagesService.getMany(user_id)

      socket.emit('client_list_all_messages', allMessages)
   })
})
