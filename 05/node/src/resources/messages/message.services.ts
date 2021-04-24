import { getCustomRepository, Repository } from 'typeorm'
import { v4 as uuid } from 'uuid'

import { Message } from './messages.entity'
import { MessagesRepository } from './messages.repository'

interface ISettingsCreate {
   admin_id?: any
   text: string
   user_id: string
   id?: string
}

class MessagesService {
   private messagesRepository: Repository<Message>

   constructor() {
      this.messagesRepository = getCustomRepository(MessagesRepository)
   }

   async createOne({
      admin_id,
      text,
      user_id
   }: ISettingsCreate): Promise<Message> {
      const message = this.messagesRepository.create({
         id: uuid(),
         admin_id,
         text,
         user_id
      })

      const messages = await this.messagesRepository.save(message)

      console.log(`NEW MESSAGE\t${messages.id}\t${messages.text}`)
      return messages
   }

   async getMany(user_id: string): Promise<Message[]> {
      const messageRepository = getCustomRepository(MessagesRepository)

      const messagesList = messageRepository.find({
         where: { user_id },
         relations: ['user']
      })

      return messagesList
   }
}

export { MessagesService }
