import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Donante {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  nombre: string;

  @Column()
  correo: string;

  @Column()
  telefono: string;

  @Column()
  direccion: string;

  @Column()
  tipo_documento: string;

  @Column()
  numero_documento: string;

  @Column()
  fecha_registro: string;

  @Column()
  estado: string;
}
