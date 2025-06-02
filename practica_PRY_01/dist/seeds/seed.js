"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.seedDatabase = seedDatabase;
const data_source_1 = require("../models/data-source");
const donor_entity_1 = require("../models/donor.entity");
const donation_type_entity_1 = require("../models/donation-type.entity");
const donation_entity_1 = require("../models/donation.entity");
const donor_recognition_entity_1 = require("../models/donor-recognition.entity");
const donation_goal_entity_1 = require("../models/donation-goal.entity");
// Función para inicializar la base de datos con datos de prueba
function seedDatabase() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            // Inicializar la conexión a la base de datos
            yield data_source_1.AppDataSource.initialize();
            console.log("Conexión a la base de datos establecida");
            // Crear tipos de donación
            const donationTypes = yield createDonationTypes();
            console.log("Tipos de donación creados:", donationTypes.length);
            // Crear donantes
            const donors = yield createDonors();
            console.log("Donantes creados:", donors.length);
            // Crear donaciones
            const donations = yield createDonations(donors, donationTypes);
            console.log("Donaciones creadas:", donations.length);
            // Crear reconocimientos
            const recognitions = yield createRecognitions(donors);
            console.log("Reconocimientos creados:", recognitions.length);
            // Crear metas de donación
            const goals = yield createDonationGoals();
            console.log("Metas de donación creadas:", goals.length);
            console.log("Base de datos inicializada correctamente");
        }
        catch (error) {
            console.error("Error al inicializar la base de datos:", error);
        }
    });
}
// Crear tipos de donación
function createDonationTypes() {
    return __awaiter(this, void 0, void 0, function* () {
        const donationTypeRepository = data_source_1.AppDataSource.getRepository(donation_type_entity_1.DonationType);
        // Verificar si ya existen tipos de donación
        const existingCount = yield donationTypeRepository.count();
        if (existingCount > 0) {
            return yield donationTypeRepository.find();
        }
        const types = [
            { name: "Dinero", description: "Donaciones monetarias" },
            { name: "Alimentos", description: "Donaciones de alimentos no perecederos" },
            { name: "Ropa", description: "Donaciones de ropa en buen estado" },
            { name: "Medicamentos", description: "Donaciones de medicamentos" },
            { name: "Suministros", description: "Donaciones de suministros varios" },
        ];
        const donationTypes = [];
        for (const type of types) {
            const donationType = new donation_type_entity_1.DonationType();
            donationType.name = type.name;
            donationType.description = type.description;
            donationTypes.push(yield donationTypeRepository.save(donationType));
        }
        return donationTypes;
    });
}
// Crear donantes
function createDonors() {
    return __awaiter(this, void 0, void 0, function* () {
        const donorRepository = data_source_1.AppDataSource.getRepository(donor_entity_1.Donor);
        // Verificar si ya existen donantes
        const existingCount = yield donorRepository.count();
        if (existingCount > 0) {
            return yield donorRepository.find();
        }
        const donorData = [
            {
                name: "Juan Pérez",
                email: "juan@example.com",
                phone: "555-1234",
                address: "Calle Principal 123",
                city: "Guayaquil",
                state: "Guayas",
                zipCode: "090150",
            },
            {
                name: "María López",
                email: "maria@example.com",
                phone: "555-5678",
                address: "Avenida Central 456",
                city: "Quito",
                state: "Pichincha",
                zipCode: "170150",
            },
            {
                name: "Carlos Rodríguez",
                email: "carlos@example.com",
                phone: "555-9012",
                address: "Calle Secundaria 789",
                city: "Cuenca",
                state: "Azuay",
                zipCode: "010150",
            },
            {
                name: "Ana Martínez",
                email: "ana@example.com",
                phone: "555-3456",
                address: "Avenida Norte 101",
                city: "Manta",
                state: "Manabí",
                zipCode: "130802",
            },
            {
                name: "Pedro Sánchez",
                email: "pedro@example.com",
                phone: "555-7890",
                address: "Calle Sur 202",
                city: "Ambato",
                state: "Tungurahua",
                zipCode: "180103",
            },
        ];
        const donors = [];
        for (const data of donorData) {
            const donor = new donor_entity_1.Donor();
            donor.name = data.name;
            donor.email = data.email;
            donor.phone = data.phone;
            donor.address = data.address;
            donor.city = data.city;
            donor.state = data.state;
            donor.zipCode = data.zipCode;
            donors.push(yield donorRepository.save(donor));
        }
        return donors;
    });
}
// Crear donaciones
function createDonations(donors, donationTypes) {
    return __awaiter(this, void 0, void 0, function* () {
        var _a;
        const donationRepository = data_source_1.AppDataSource.getRepository(donation_entity_1.Donation);
        // Verificar si ya existen donaciones
        const existingCount = yield donationRepository.count();
        if (existingCount > 0) {
            return yield donationRepository.find();
        }
        const donationData = [
            { amount: 100, description: "Donación mensual", donorIndex: 0, typeIndex: 0 },
            {
                amount: null,
                description: "Donación de alimentos",
                itemsDescription: "5kg de arroz, 3kg de frijoles",
                quantity: 8,
                donorIndex: 1,
                typeIndex: 1,
            },
            { amount: 250, description: "Donación anual", donorIndex: 2, typeIndex: 0 },
            {
                amount: null,
                description: "Donación de ropa",
                itemsDescription: "10 camisetas, 5 pantalones",
                quantity: 15,
                donorIndex: 3,
                typeIndex: 2,
            },
            {
                amount: null,
                description: "Donación de suministros",
                itemsDescription: "Cuadernos, lápices, mochilas",
                quantity: 20,
                donorIndex: 4,
                typeIndex: 4,
            },
            { amount: 50, description: "Donación única", donorIndex: 0, typeIndex: 0 },
            {
                amount: null,
                description: "Donación de medicamentos",
                itemsDescription: "Analgésicos, antibióticos",
                quantity: 10,
                donorIndex: 1,
                typeIndex: 3,
            },
        ];
        const donations = [];
        for (const data of donationData) {
            const donation = new donation_entity_1.Donation();
            if (data.amount !== null && data.amount !== undefined) {
                donation.amount = data.amount;
            }
            donation.description = data.description;
            donation.itemsDescription = (_a = data.itemsDescription) !== null && _a !== void 0 ? _a : "";
            if (data.quantity !== undefined) {
                donation.quantity = data.quantity;
            }
            donation.donationDate = new Date();
            donation.donor = donors[data.donorIndex];
            donation.donationType = donationTypes[data.typeIndex];
            donations.push(yield donationRepository.save(donation));
        }
        return donations;
    });
}
// Crear reconocimientos
function createRecognitions(donors) {
    return __awaiter(this, void 0, void 0, function* () {
        const recognitionRepository = data_source_1.AppDataSource.getRepository(donor_recognition_entity_1.DonorRecognition);
        // Verificar si ya existen reconocimientos
        const existingCount = yield recognitionRepository.count();
        if (existingCount > 0) {
            return yield recognitionRepository.find();
        }
        const recognitionData = [
            { title: "Donante del Mes", description: "Reconocimiento por ser el donante más generoso del mes", donorIndex: 0 },
            { title: "Donante Frecuente", description: "Reconocimiento por donaciones constantes", donorIndex: 1 },
            { title: "Donante Destacado", description: "Reconocimiento por contribuciones significativas", donorIndex: 2 },
            { title: "Donante Comprometido", description: "Reconocimiento por su compromiso con la causa", donorIndex: 3 },
            { title: "Donante Ejemplar", description: "Reconocimiento por ser un ejemplo para la comunidad", donorIndex: 4 },
        ];
        const recognitions = [];
        for (const data of recognitionData) {
            const recognition = new donor_recognition_entity_1.DonorRecognition();
            recognition.title = data.title;
            recognition.description = data.description;
            recognition.recognitionDate = new Date();
            recognition.donor = donors[data.donorIndex];
            recognitions.push(yield recognitionRepository.save(recognition));
        }
        return recognitions;
    });
}
// Crear metas de donación
function createDonationGoals() {
    return __awaiter(this, void 0, void 0, function* () {
        const goalRepository = data_source_1.AppDataSource.getRepository(donation_goal_entity_1.DonationGoal);
        // Verificar si ya existen metas
        const existingCount = yield goalRepository.count();
        if (existingCount > 0) {
            return yield goalRepository.find();
        }
        const goalData = [
            {
                title: "Campaña Navideña",
                description: "Meta para recaudar fondos durante la temporada navideña",
                targetAmount: 5000,
                currentAmount: 1200,
            },
            {
                title: "Campaña Escolar",
                description: "Meta para recaudar útiles escolares",
                targetAmount: 3000,
                currentAmount: 800,
            },
            {
                title: "Campaña de Alimentos",
                description: "Meta para recaudar alimentos no perecederos",
                targetAmount: 2000,
                currentAmount: 500,
            },
            {
                title: "Campaña de Medicamentos",
                description: "Meta para recaudar medicamentos esenciales",
                targetAmount: 4000,
                currentAmount: 1500,
            },
            {
                title: "Campaña de Emergencia",
                description: "Meta para recaudar fondos para situaciones de emergencia",
                targetAmount: 10000,
                currentAmount: 3000,
            },
        ];
        const goals = [];
        const now = new Date();
        const threeMonthsLater = new Date();
        threeMonthsLater.setMonth(threeMonthsLater.getMonth() + 3);
        for (const data of goalData) {
            const goal = new donation_goal_entity_1.DonationGoal();
            goal.title = data.title;
            goal.description = data.description;
            goal.targetAmount = data.targetAmount;
            goal.currentAmount = data.currentAmount;
            goal.startDate = new Date(now);
            goal.endDate = new Date(threeMonthsLater);
            goal.status = "active";
            goals.push(yield goalRepository.save(goal));
        }
        return goals;
    });
}
// Ejecutar la función de inicialización si este archivo se ejecuta directamente
if (require.main === module) {
    seedDatabase()
        .then(() => {
        console.log("Proceso de inicialización completado");
        process.exit(0);
    })
        .catch((error) => {
        console.error("Error en el proceso de inicialización:", error);
        process.exit(1);
    });
}
