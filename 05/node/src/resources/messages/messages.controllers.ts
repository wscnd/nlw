import {
   Request,
   Response
} from 'express'

import { MessagesService } from './message.services'

class MessagesController {
   async create(req: Request, res: Response): Promise<Response> {
      const { admin_id, text, user_id } = req.body

      const messagesService = new MessagesService()

      const message = await messagesService.createOne({
         admin_id,
         text,
         user_id
      })

      return res.json(message)
   }

   async showByUser(req: Request, res: Response): Promise<Response> {
      const { id } = req.params

      const messagesService = new MessagesService()

      const messagesList = await messagesService.getMany(id)
      
      return res.json(messagesList)
   }
}

export { MessagesController }
