import { DataSource } from "typeorm"
import { Donor } from "./donor.entity"
import { DonationType } from "./donation-type.entity"
import { Donation } from "./donation.entity"
import { DonorRecognition } from "./donor-recognition.entity"
import { DonationGoal } from "./donation-goal.entity"

export const AppDataSource = new DataSource({
  type: "postgres",
  host: process.env.DB_HOST || "localhost",
  port: Number.parseInt(process.env.DB_PORT || "5432"),
  username: process.env.DB_USERNAME || "postgres",
  password: process.env.DB_PASSWORD || "12345",
  database: process.env.DB_DATABASE || "donation_management",
  synchronize: true,
  logging: true,
  entities: [Donor, DonationType, Donation, DonorRecognition, DonationGoal],
  subscribers: [],
  migrations: [],
})
