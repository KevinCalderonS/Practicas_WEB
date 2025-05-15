import { Entity, PrimaryGeneratedColumn, Column } from "typeorm"

@Entity()
export class DonationGoal {
  @PrimaryGeneratedColumn()
  id!: number

  @Column()
  title!: string

  @Column()
  description!: string

  @Column({ type: "decimal", precision: 10, scale: 2 })
  targetAmount!: number

  @Column({ type: "decimal", precision: 10, scale: 2, default: 0 })
  currentAmount!: number

  @Column({ type: "timestamp" })
  startDate!: Date

  @Column({ type: "timestamp" })
  endDate!: Date

  @Column({ default: "active" })
  status!: string

  @Column({ default: true })
  isActive!: boolean

  @Column({ type: "timestamp", default: () => "CURRENT_TIMESTAMP" })
  createdAt!: Date

  @Column({ type: "timestamp", default: () => "CURRENT_TIMESTAMP", onUpdate: "CURRENT_TIMESTAMP" })
  updatedAt!: Date
}
