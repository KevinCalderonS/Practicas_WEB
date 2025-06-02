import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm"
import { Donation } from "./donation.entity"
import { DonorRecognition } from "./donor-recognition.entity"

@Entity()
export class Donor {
  @PrimaryGeneratedColumn()
  id!: number

  @Column()
  name!: string

  @Column()
  email!: string

  @Column()
  phone!: string

  @Column()
  address!: string

  @Column({ nullable: true })
  city!: string

  @Column({ nullable: true })
  state!: string

  @Column({ nullable: true })
  zipCode!: string

  @Column({ default: true })
  isActive!: boolean

  @Column({ type: "timestamp", default: () => "CURRENT_TIMESTAMP" })
  createdAt!: Date

  @Column({ type: "timestamp", default: () => "CURRENT_TIMESTAMP", onUpdate: "CURRENT_TIMESTAMP" })
  updatedAt!: Date

  @OneToMany(
    () => Donation,
    (donation) => donation.donor,
  )
  donations!: Donation[]

  @OneToMany(
    () => DonorRecognition,
    (recognition) => recognition.donor,
  )
  recognitions!: DonorRecognition[]
}
