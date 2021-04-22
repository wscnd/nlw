import { Request, Response } from 'express'

import { SettingsService } from './settings.services'

class SettingsController {
   async create(req: Request, res: Response): Promise<Response> {
      const { chat, username } = req.body

      if (typeof chat !== 'boolean' || !username) {
         return res.status(404).json('Chat | Username required')
      }

      try {
         const settingsService = new SettingsService()
         const settingsExist = settingsService.findOne(username)

         let settings

         if (!settingsExist) {
            settings = await settingsService.createOne({ chat, username })
            return res.json(settings)
         } else {
            settings = await settingsService.updateOne({ username, chat })
            return res.json(settings)
         }
      } catch (err) {
         return res.status(400).json({ message: err.message })
      }
   }

   async findOne(req: Request, res: Response): Promise<Response> {
      const { username } = req.params

      const settingsService = new SettingsService()
      const settings = await settingsService.findOne(username)

      return res.json(settings)
   }
}

export { SettingsController }
