import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, OneToMany } from "typeorm"
import { InformacionContacto } from "../../informacion-contacto/entities/informacion-contacto.entity"
import { VerificacionDonante } from "../../verificacion-donante/entities/verificacion-donante.entity"

@Entity("donantes")
export class Donante {
  @PrimaryGeneratedColumn()
  id: number

  @Column({ length: 100 })
  nombre: string

  @Column({ length: 100, unique: true })
  correo: string

  @Column({ length: 20 })
  telefono: string

  @Column({ length: 200 })
  direccion: string

  @Column({ length: 20 })
  tipo_documento: string

  @Column({ length: 50, unique: true })
  numero_documento: string

  @CreateDateColumn()
  fecha_registro: Date

  @Column({ length: 20, default: "Activo" })
  estado: string

  @OneToMany(
    () => InformacionContacto,
    (contacto) => contacto.donante,
  )
  contactos: InformacionContacto[]

  @OneToMany(
    () => VerificacionDonante,
    (verificacion) => verificacion.donante,
  )
  colaboraciones: VerificacionDonante[]
}
