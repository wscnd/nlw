import { getCustomRepository } from 'typeorm'
import { Setting } from './settings.entity'
import { SettingsRepository } from './settings.repository'

interface ISettingsCreate {
   chat: boolean
   username: string
}

class SettingsService {
   async create({ chat, username }: ISettingsCreate): Promise<Setting> {
      const settingsRepository = getCustomRepository(SettingsRepository)

      if (settingsRepository.findOne({ username })) {
         throw new Error('User Already Exists')
      }

      const settings = settingsRepository.create({
         chat,
         username
      })

      await settingsRepository.save(settings)

      return settings
   }
}

export { SettingsService }
