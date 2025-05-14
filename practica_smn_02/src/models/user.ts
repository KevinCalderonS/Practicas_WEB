import {Column, Entity, ManyToMany, PrimaryGeneratedColumn} from "typeorm";
import { views } from "./views";

@Entity()
export class user{
    @PrimaryGeneratedColumn()
    id!: number;
    @Column()
    nombre!: string;
    @Column()
    correo!: string;
    @ManyToMany(()=>views, (views:views)=> views.user)
    vistas!: views[];
}
