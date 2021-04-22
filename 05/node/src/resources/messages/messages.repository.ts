import {
   EntityRepository,
   Repository
} from 'typeorm'

import { Message } from './messages.entity'

@EntityRepository(Message)
class MessagesRepository extends Repository<Message> {}

export { MessagesRepository }
