import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm"
import { Donation } from "./donation.entity"

@Entity()
export class DonationType {
  @PrimaryGeneratedColumn()
  id!: number

  @Column()
  name!: string

  @Column()
  description!: string

  @Column({ default: true })
  isActive!: boolean

  @Column({ type: "timestamp", default: () => "CURRENT_TIMESTAMP" })
  createdAt!: Date

  @Column({ type: "timestamp", default: () => "CURRENT_TIMESTAMP", onUpdate: "CURRENT_TIMESTAMP" })
  updatedAt!: Date

  @OneToMany(
    () => Donation,
    (donation) => donation.donationType,
  )
  donations!: Donation[]
}
