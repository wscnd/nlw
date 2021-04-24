/* global io Mustache dayjs */

let socket
let emailUser

document.querySelector('#start_chat').addEventListener('click', () => {
   socket = io()

   const chat_help = document.getElementById('chat_help')
   chat_help.style.display = 'none'

   const chat_in_support = document.getElementById('chat_in_support')
   chat_in_support.style.display = 'block'

   const email = document.getElementById('email').value
   emailUser = email
   const text = document.getElementById('txt_help').value

   socket.on('connect', () => {
      const params = {
         email,
         text
      }

      socket.emit('client_first_access', params, (call, err) => {
         if (err) {
            console.log(err)
         } else {
            console.log(call)
         }
      })
   })

   socket.on('client_list_all_messages', (messages) => {
      const template_client = document.getElementById('message-user-template')
         .innerHTML
      const template_admin = document.getElementById('admin-template').innerHTML

      messages.map((msg) => {
         let template
         let tag

         msg.admin_id === null
            ? ((template = template_client), (tag = 'message'))
            : ((template = template_admin), (tag = 'message_admin'))

         const render = Mustache.render(template, {
            [tag]: msg.text,
            email
         })

         document.getElementById('messages').innerHTML += render
      })
   })

   socket.on('admin_send_to_client', (message) => {
      const template_admin = document.getElementById('admin-template').innerHTML
      const render = Mustache.render(template_admin, {
         message_admin: message.text
      })

      document.getElementById('messages').innerHTML += render
   })
})

document
   .querySelector('#send_message_button')
   .addEventListener('click', (event) => {
      const text = document.getElementById('message_user').value

      const params = {
         text,
         socket_id: socket.id
      }

      socket.emit('client_send_to_admin', params)
      const template_client = document.getElementById('message-user-template')
         .innerHTML

      const render = Mustache.render(template_client, {
         message: text,
         email: emailUser
      })
      document.getElementById('messages').innerHTML += render
   })
