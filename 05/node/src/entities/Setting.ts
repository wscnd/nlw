import { Entity, Column, CreateDateColumn, UpdateDateColumn, PrimaryColumn, EntitySchema } from "typeorm";

import { v4 as uuid } from "uuid";

@Entity("settings")
class Setting {

    @PrimaryColumn()
    id!: string;

    @Column()
    username!: string;

    @Column()
    chat!: boolean;

    @CreateDateColumn()
    created_at!: Date;

    @UpdateDateColumn()
    update_at!: Date;

    constructor() {
        if (!this.id) {
            this.id == uuid();
        }
    }
}

export { Setting };