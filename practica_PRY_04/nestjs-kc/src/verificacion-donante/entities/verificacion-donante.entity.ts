import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, JoinColumn, CreateDateColumn } from "typeorm"
import { Donante } from "../../donante/entities/donante.entity"

@Entity("verificacion_donante")
export class VerificacionDonante {
  @PrimaryGeneratedColumn()
  id: number

  @Column()
  donante_id: number

  @Column({ length: 50 })
  tipo_colaboracion: string

  @Column("text")
  descripcion: string

  @CreateDateColumn()
  fecha_colaboracion: Date

  @ManyToOne(
    () => Donante,
    (donante) => donante.colaboraciones,
    { onDelete: "CASCADE" },
  )
  @JoinColumn({ name: "donante_id" })
  donante: Donante
}
