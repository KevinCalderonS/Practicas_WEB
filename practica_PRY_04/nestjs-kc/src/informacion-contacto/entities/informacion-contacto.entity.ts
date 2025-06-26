import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, JoinColumn } from "typeorm"
import { Donante } from "../../donante/entities/donante.entity"

@Entity("informacion_contacto")
export class InformacionContacto {
  @PrimaryGeneratedColumn()
  id: number

  @Column()
  donante_id: number

  @Column({ length: 100 })
  nombre_contacto: string

  @Column({ length: 20 })
  telefono: string

  @Column({ length: 50 })
  relacion: string

  @ManyToOne(
    () => Donante,
    (donante) => donante.contactos,
    { onDelete: "CASCADE" },
  )
  @JoinColumn({ name: "donante_id" })
  donante: Donante
}
