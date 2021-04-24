import {
   getCustomRepository,
   ObjectLiteral,
   Repository,
   UpdateResult
} from 'typeorm'
import { v4 as uuid } from 'uuid'

import { Connection } from './connection.entity'
import { ConnectionsRepository } from './connection.repository'

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
   }: {
      user_id: string
      socket_id: string
      admin_id?: string
      id?: string
   }): Promise<Connection> {
      const connection = this.connectionsRepository.create({
         id,
         socket_id,
         user_id,
         admin_id
      })

      const connections = await this.connectionsRepository.save(connection)
      return connections
   }

   async findOne(params: ObjectLiteral): Promise<Connection | undefined> {
      const connection = await this.connectionsRepository.findOne({
         ...params
      })

      return connection
   }

   async findMany({ where }: { where: ObjectLiteral }): Promise<Connection[]> {
      const connections = this.connectionsRepository.find({
         ...where
      })

      return connections
   }
   async updateOneNew({
      set,
      where
   }: {
      set: ObjectLiteral
      where: {
         condition: string
         object: ObjectLiteral
      }
   }): Promise<UpdateResult> {
      const updatedSettings = await this.connectionsRepository
         .createQueryBuilder()
         .update(Connection)
         .set({ ...set })
         .where(where.condition, { ...where.object })
         .execute()

      return updatedSettings
   }

   async updateOne({
      user_id,
      admin_id
   }: {
      admin_id: string
      user_id: string
   }): Promise<UpdateResult> {
      const updatedSettings = await this.connectionsRepository
         .createQueryBuilder()
         .update(Connection)
         .set({ socket_id: admin_id })
         .where('user_id = :user_id', {
            user_id
         })
         .execute()

      return updatedSettings
   }
}

export { ConnectionsService }
