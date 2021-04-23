import { Router } from 'express'

import { MessagesController } from './resources/messages/messages.controllers'
import { SettingsController } from './resources/settings/settings.controllers'
import { UserController } from './resources/users/users.controllers'

const routes = Router()

const settingsController = new SettingsController()
const usersController = new UserController()
const messagesController = new MessagesController()

routes.post('/settings', settingsController.create)
routes.get('/settings/:username', settingsController.findOne)
routes.put('/settings/:username', settingsController.updateOne)
routes.post('/users', usersController.create)
routes.post('/messages', messagesController.create)
routes.get('/messages/:id', messagesController.showByUser)

export { routes }
