"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppDataSource = void 0;
const typeorm_1 = require("typeorm");
const donor_entity_1 = require("./donor.entity");
const donation_type_entity_1 = require("./donation-type.entity");
const donation_entity_1 = require("./donation.entity");
const donor_recognition_entity_1 = require("./donor-recognition.entity");
const donation_goal_entity_1 = require("./donation-goal.entity");
exports.AppDataSource = new typeorm_1.DataSource({
    type: "postgres",
    host: process.env.DB_HOST || "localhost",
    port: Number.parseInt(process.env.DB_PORT || "5432"),
    username: process.env.DB_USERNAME || "postgres",
    password: process.env.DB_PASSWORD || "12345",
    database: process.env.DB_DATABASE || "donation_management",
    synchronize: true,
    logging: true,
    entities: [donor_entity_1.Donor, donation_type_entity_1.DonationType, donation_entity_1.Donation, donor_recognition_entity_1.DonorRecognition, donation_goal_entity_1.DonationGoal],
    subscribers: [],
    migrations: [],
});
