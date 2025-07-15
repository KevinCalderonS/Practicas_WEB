import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { Donante } from 'src/donante/entities/donante.entity';

@Entity()
export class Contacto {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Donante, { nullable: true, eager: true })
  donante: Donante;

  @Column()
  nombre_contacto: string;

  @Column()
  telefono: string;

  @Column()
  relacion: string;
}
