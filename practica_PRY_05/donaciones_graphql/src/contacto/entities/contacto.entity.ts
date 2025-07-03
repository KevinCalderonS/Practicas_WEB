import { ObjectType, Field, Int } from '@nestjs/graphql';
import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { Donante } from 'src/donante/entities/donante.entity';

@ObjectType()
@Entity()
export class Contacto {
  @Field(() => Int)
  @PrimaryGeneratedColumn()
  id: number;

  @Field(() => Donante, { nullable: true }) // ← Añade esto
  @ManyToOne(() => Donante, (d) => d.contactos, { nullable: true })
  donante: Donante;

  @Field()
  @Column()
  nombre_contacto: string;

  @Field()
  @Column()
  telefono: string;

  @Field()
  @Column()
  relacion: string;
}
