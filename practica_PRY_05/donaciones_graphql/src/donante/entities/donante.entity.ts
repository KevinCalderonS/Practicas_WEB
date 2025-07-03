import { ObjectType, Field, Int } from '@nestjs/graphql';
import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { Verificacion } from 'src/verificacion/entities/verificacion.entity';
import { Contacto } from 'src/contacto/entities/contacto.entity';

@ObjectType()
@Entity()
export class Donante {
  @Field(() => Int)
  @PrimaryGeneratedColumn()
  id: number;

  @Field()
  @Column()
  nombre: string;

  @Field()
  @Column()
  correo: string;

  @Field()
  @Column()
  telefono: string;

  @Field()
  @Column()
  direccion: string;

  @Field()
  @Column()
  tipo_documento: string;

  @Field()
  @Column()
  numero_documento: string;

  @Field()
  @Column()
  fecha_registro: string;

  @Field()
  @Column()
  estado: string;

  @OneToMany(() => Verificacion, (v) => v.donante)
  verificaciones: Verificacion[];

  @OneToMany(() => Contacto, (c) => c.donante)
  contactos: Contacto[];
}
