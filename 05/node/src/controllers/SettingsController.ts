import { Request, Response } from 'express'
import { SettingsService } from '../services/SettingsService'

class SettingsController {
   async create(req: Request, res: Response): Promise<Response | void> {
      console.log(req.body)

      if (!req.body) {
         return res.status(404).end()
      }

      const { chat, username } = req.body

      if (!chat || !username) {
         return res.status(404).end()
      }

      const settingsService = new SettingsService()

      const settings = settingsService.create({ chat, username })

      return res.json(settings)
   }
}

export { SettingsController }
