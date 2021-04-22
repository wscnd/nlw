import {
   Column,
   CreateDateColumn,
   Entity,
   PrimaryColumn,
   UpdateDateColumn
} from 'typeorm'

@Entity('settings')
class Setting {
   @PrimaryColumn()
   id!: string

   @Column()
   username!: string

   @Column()
   chat!: boolean

   @CreateDateColumn()
   created_at!: Date

   @UpdateDateColumn()
   updated_at!: Date
}

export { Setting }
