import {Column, Entity, ManyToOne, PrimaryGeneratedColumn} from "typeorm";
import { user } from "./user";

@Entity()
export class views{
    static id(id: any) {
        throw new Error('Method not implemented.');
    }
    @PrimaryGeneratedColumn()
    id!: number;
    @Column()
    vista!: string;
    @ManyToOne(()=>user, (user:user)=> user.vistas)
    user!: user;
}

