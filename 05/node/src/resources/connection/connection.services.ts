import { getCustomRepository, Repository } from 'typeorm'
import { v4 as uuid } from 'uuid'

import { Connection } from './connection.entity'
import { ConnectionsRepository } from './connection.repository'

interface IConnectionCreate {
   socket_id: string
   user_id: string
   admin_id?: string
   id?: string
}

class ConnectionsService {
   private connectionsRepository: Repository<Connection>

   constructor() {
      this.connectionsRepository = getCustomRepository(ConnectionsRepository)
   }

   async createOne({
      user_id,
      socket_id,
      admin_id,
      id = uuid()
   }: IConnectionCreate): Promise<Connection> {
      const connection = this.connectionsRepository.create({
         id,
         socket_id,
         user_id,
         admin_id
      })

      const connections = await this.connectionsRepository.save(connection)
      return connections
   }

   async findOne(user_id: string): Promise<Connection | undefined> {
      const connection = await this.connectionsRepository.findOne({
         user_id
      })

      return connection
   }
}

export { ConnectionsService }
