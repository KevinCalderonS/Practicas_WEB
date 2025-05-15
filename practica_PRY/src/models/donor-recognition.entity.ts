import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from "typeorm"
import { Donor } from "./donor.entity"

@Entity()
export class DonorRecognition {
  @PrimaryGeneratedColumn()
  id!: number

  @Column()
  title!: string

  @Column()
  description!: string

  @Column({ type: "timestamp", default: () => "CURRENT_TIMESTAMP" })
  recognitionDate!: Date

  @Column({ nullable: true })
  certificateUrl!: string

  @Column({ default: true })
  isActive!: boolean

  @Column({ type: "timestamp", default: () => "CURRENT_TIMESTAMP" })
  createdAt!: Date

  @Column({ type: "timestamp", default: () => "CURRENT_TIMESTAMP", onUpdate: "CURRENT_TIMESTAMP" })
  updatedAt!: Date

  @ManyToOne(
    () => Donor,
    (donor) => donor.recognitions,
  )
  @JoinColumn({ name: "donorId" })
  donor!: Donor
}
