import {
   Entity,
   PrimaryColumn,
   CreateDateColumn,
   Column,
   ManyToOne,
   JoinColumn,
   UpdateDateColumn
} from 'typeorm'

import { User } from '../users/users.entity'

@Entity('connections')
class Connection {
   @PrimaryColumn()
   id!: string

   @Column()
   socket_id?: string

   @Column()
   admin_id!: string

   @JoinColumn({ name: 'user_id' })
   @ManyToOne(() => User)
   user!: User

   @Column()
   user_id!: string

   @CreateDateColumn()
   created_at!: Date

   @UpdateDateColumn()
   updated_at!: Date
}

export { Connection }
