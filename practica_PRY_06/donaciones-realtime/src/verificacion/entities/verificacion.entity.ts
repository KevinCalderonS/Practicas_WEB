import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { Donante } from 'src/donante/entities/donante.entity';

@Entity()
export class Verificacion {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Donante, { nullable: true, eager: true })
  donante: Donante;

  @Column()
  fecha_verificacion: string;

  @Column()
  resultado: string;

  @Column()
  observaciones: string;
}
