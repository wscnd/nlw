import 'reflect-metadata'
import './database'

import express from 'express'

import { routes } from './routes'

const app = express()
app.use(express.json())
app.use(routes)

const PORT = 3333
app.listen(PORT, () => {
   console.log(`running at port ${PORT}`)
})
