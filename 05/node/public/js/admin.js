/* global io Mustache dayjs */
const socket = io()

let connectionsUsers = []

socket.onAny((event, ...args) => {
   console.log(`got ${event}`)
})

socket.on('admin_receive_message', (msg) => {
   const { message, user } = msg

   const divMessages = document.getElementById(`allMessages${user.id}`)
   const div = document.createElement('div')
   div.className = 'admin_message_client'
   div.innerHTML = `<span>${user.email} </span>`
   div.innerHTML += `<span>${message.text}</span>`
   div.innerHTML += `<span class="date">${dayjs().format(
      'DD/MM/YYYY HH:mm:ss'
   )}</span>`

   divMessages.appendChild(div)
})

socket.on('admin_list_all_users', (connections) => {
   connectionsUsers = connections
   document.getElementById('list_users').innerHTML = ''

   connections.map((connection) => {
      let template = document.getElementById('template').innerHTML

      const withAdmin =
         connection.admin_id === null
            ? '     SUPPORT NEEDED'
            : '        IN SUPPORT'
      const render = Mustache.render(template, {
         email: connection.user.email + withAdmin,
         id: connection.socket_id
      })

      document.getElementById('list_users').innerHTML += render
   })
})

function call(socket_id) {
   const connection = connectionsUsers.find(
      (connection) => connection.socket_id === socket_id
   )

   let template = document.getElementById('admin_template').innerHTML

   const render = Mustache.render(template, {
      email: connection.user.email,
      id: connection.user_id
   })

   document.getElementById('supports').innerHTML += render

   const params = {
      user_id: connection.user_id,
      admin_socket_id: socket.id
   }

   socket.emit('admin_list_messages', params, (messages, err) => {
      if (err) {
         console.log(err)
      } else {
         const divMessages = document.getElementById(
            `allMessages${connection.user_id}`
         )

         messages.map((msg) => {
            const div = document.createElement('div')

            msg.admin_id === null
               ? ((div.className = 'admin_message_client'),
                 (div.innerHTML = `<span>${connection.user.email} </span>`),
                 (div.innerHTML += `<span>${msg.text}</span>`))
               : ((div.className = 'admin_message_admin'),
                 (div.innerHTML = `Atendente: <span>${msg.text}</span>`))

            div.innerHTML += `<span class="date">${dayjs(msg.created_at).format(
               'DD/MM/YYYY HH:mm:ss'
            )}</span>`
            divMessages.appendChild(div)
         })
      }
   })
}

function sendMessage(user_id) {
   const text = document.getElementById(`send_message_${user_id}`)

   const params = {
      text: text.value,
      user_id
   }

   socket.emit('admin_send_message', params)

   const divMessages = document.getElementById(`allMessages${user_id}`)
   const div = document.createElement('div')
   div.className = 'admin_message_admin'
   div.innerHTML = `Atendente: <span>${params.text}</span>`
   div.innerHTML += `<span class="date">${dayjs().format(
      'DD/MM/YYYY HH:mm:ss'
   )}</span>`

   divMessages.appendChild(div)

   text.value = ''
}
