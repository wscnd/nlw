import { Request, Response } from 'express'

import { UsersService } from './users.services'

class UserController {
   async create(req: Request, res: Response): Promise<Response> {
      const { email } = req.body

      if (!email) {
         return res.status(404).json('Email required')
      }

      const usersService = new UsersService()

      const user = await usersService.createOne({ email })

      return res.json(user)
   }

}

export { UserController }
