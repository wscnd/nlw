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
    updated_at!: Date;

    constructor() {
        if (typeof this.id == "undefined") {
            this.id = uuid();
            console.log(this.id);
        }
    }
}

export { Setting };