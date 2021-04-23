import {
   getCustomRepository, //
   Repository,
   UpdateResult
} from 'typeorm'
import { v4 as uuid } from 'uuid'

import { Setting } from './settings.entity'
import { SettingsRepository } from './settings.repository'

interface ISettingsCreate {
   chat: boolean
   username: string
   id?: string
}

class SettingsService {
   private settingsRepository: Repository<Setting>

   constructor() {
      this.settingsRepository = getCustomRepository(SettingsRepository)
   }

   async createOne({ chat, username }: ISettingsCreate): Promise<Setting> {
      const settingsFound = await this.settingsRepository.findOne({ username })

      if (settingsFound) {
         throw new Error('User Already Exists')
      }

      const settings = this.settingsRepository.create({
         id: uuid(),
         chat,
         username
      })

      await this.settingsRepository.save(settings)

      return settings
   }

   async findOne(username: string): Promise<Setting | undefined> {
      const settings = await this.settingsRepository.findOne({
         username
      })

      return settings
   }

   async updateOne({
      username,
      chat
   }: {
      username: string
      chat: boolean
   }): Promise<UpdateResult> {
      const updatedSettings = await this.settingsRepository
         .createQueryBuilder()
         .update(Setting)
         .set({ chat })
         .where('username = :username', {
            username
         })
         .execute()

      return updatedSettings
   }
}

export { SettingsService }
