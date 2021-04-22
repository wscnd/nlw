import { getCustomRepository, Repository } from 'typeorm'
import { v4 as uuid } from 'uuid'

import { User } from './users.entity'
import { UserRepository } from './users.repository'

interface IUsersCreate {
   email: string
   id?: string
}

class UsersService {
   private usersRepository: Repository<User>

   constructor() {
      this.usersRepository = getCustomRepository(UserRepository)
   }

   async createOne({ email }: IUsersCreate): Promise<User> {
      const usersExists = await this.usersRepository.findOne({ email })

      if (usersExists) {
         return usersExists
      }

      const user = this.usersRepository.create({
         id: uuid(),
         email
      })

      await this.usersRepository.save(user)
      return user
   }

   async findByEmail(email: string): Promise<User | undefined> {
      const user = await this.usersRepository.findOne({ email })

      return user
   }
}

export { UsersService }
