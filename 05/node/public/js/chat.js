/* global io Mustache */

document.querySelector('#start_chat').addEventListener('click', () => {
   const socket = io()

   const chat_help = document.getElementById('chat_help')
   chat_help.style.display = 'none'

   const chat_in_support = document.getElementById('chat_in_support')
   chat_in_support.style.display = 'block'

   const email = document.getElementById('email').value
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
})
