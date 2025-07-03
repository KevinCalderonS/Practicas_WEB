import { ObjectType, Field, Int } from '@nestjs/graphql';
import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { Donante } from 'src/donante/entities/donante.entity';

@ObjectType()
@Entity()
export class Verificacion {
  @Field(() => Int)
  @PrimaryGeneratedColumn()
  id: number;

  @Field(() => Donante)
  @ManyToOne(() => Donante, (d) => d.verificaciones)
  donante: Donante;

  @Field()
  @Column()
  fecha_verificacion: string;

  @Field()
  @Column()
  resultado: string;

  @Field()
  @Column()
  observaciones: string;
}
