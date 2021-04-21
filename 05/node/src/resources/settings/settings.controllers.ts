import { Request, Response } from 'express'
import { SettingsService } from './settings.services'

class SettingsController {
   async create(req: Request, res: Response): Promise<Response | void> {
      if (!req.body) {
         return res.status(404).end()
      }

      const { chat, username } = req.body

      if (!chat || !username) {
         return res.status(404).end()
      }

      try {
         const settingsService = new SettingsService()
         const settings = await settingsService.create({ chat, username })

         return res.json(settings)
      } catch (err) {
         return res.status(400).json({ message: err.message })
      }
   }
}

export { SettingsController }
