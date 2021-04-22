import {
   EntityRepository,
   Repository
} from 'typeorm'

import { Connection } from './connection.entity'

@EntityRepository(Connection)
class ConnectionsRepository extends Repository<Connection> {}

export { ConnectionsRepository }
