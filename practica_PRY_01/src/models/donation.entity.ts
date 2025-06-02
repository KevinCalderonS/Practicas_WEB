import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from "typeorm"
import { Donor } from "./donor.entity"
import { DonationType } from "./donation-type.entity"

@Entity()
export class Donation {
  @PrimaryGeneratedColumn()
  id!: number

  @Column({ type: "decimal", precision: 10, scale: 2, nullable: true })
  amount!: number

  @Column({ nullable: true })
  description!: string

  @Column({ type: "timestamp", default: () => "CURRENT_TIMESTAMP" })
  donationDate!: Date

  @Column({ nullable: true })
  itemsDescription!: string

  @Column({ nullable: true })
  quantity!: number

  @Column({ default: true })
  isActive!: boolean

  @Column({ type: "timestamp", default: () => "CURRENT_TIMESTAMP" })
  createdAt!: Date

  @Column({ type: "timestamp", default: () => "CURRENT_TIMESTAMP", onUpdate: "CURRENT_TIMESTAMP" })
  updatedAt!: Date

  @ManyToOne(
    () => Donor,
    (donor) => donor.donations,
  )
  @JoinColumn({ name: "donorId" })
  donor!: Donor

  @ManyToOne(
    () => DonationType,
    (donationType) => donationType.donations,
  )
  @JoinColumn({ name: "donationTypeId" })
  donationType!: DonationType
}
