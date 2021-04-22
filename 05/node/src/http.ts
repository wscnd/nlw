import 'reflect-metadata'
import './database'

import ejs = require('ejs')
import express from 'express'
import { createServer } from 'http'
import path = require('path')
import { Server, Socket } from 'socket.io'

import { routes } from './routes'

const app = express()
const http = createServer(app)
const io = new Server(http)

app.use(express.json())
app.use(routes)
app.set('views', path.join(__dirname, '..', 'public'))
app.use(express.static(path.join(__dirname, '..', 'public')))
app.engine('html', ejs.renderFile)
app.set('view engine', 'html')

app.get('/pages/client', (req, res) => {
   return res.render('html/client.html')
})

io.on('connection', (socket: Socket) => {
   console.log('OPENED\t\t', socket.id)
})

export { http, io }
