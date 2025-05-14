import {Column, Entity, ManyToOne, PrimaryGeneratedColumn} from "typeorm";
import { user } from "./user";

@Entity()
export class views{
    @PrimaryGeneratedColumn()
    id!: number;
    @Column()
    vista!: string;
    @ManyToOne(()=>user, (user:user)=> user.vistas)
    user!: user;
}

