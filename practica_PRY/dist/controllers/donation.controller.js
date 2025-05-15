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
exports.DonationController = void 0;
const data_source_1 = require("../models/data-source");
const donation_entity_1 = require("../models/donation.entity");
const donor_entity_1 = require("../models/donor.entity");
const donation_type_entity_1 = require("../models/donation-type.entity");
const donationRepository = data_source_1.AppDataSource.getRepository(donation_entity_1.Donation);
const donorRepository = data_source_1.AppDataSource.getRepository(donor_entity_1.Donor);
const donationTypeRepository = data_source_1.AppDataSource.getRepository(donation_type_entity_1.DonationType);
class DonationController {
    // Obtener todas las donaciones
    static getAll(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const donations = yield donationRepository.find({
                    where: { isActive: true },
                    relations: ["donor", "donationType"],
                });
                return res.status(200).json(donations);
            }
            catch (error) {
                console.error(error);
                return res.status(500).json({ message: "Error al obtener donaciones" });
            }
        });
    }
    // Obtener una donación por ID
    static getById(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const id = Number.parseInt(req.params.id);
                const donation = yield donationRepository.findOne({
                    where: { id, isActive: true },
                    relations: ["donor", "donationType"],
                });
                if (!donation) {
                    return res.status(404).json({ message: "Donación no encontrada" });
                }
                return res.status(200).json(donation);
            }
            catch (error) {
                console.error(error);
                return res.status(500).json({ message: "Error al obtener donación" });
            }
        });
    }
    // Crear una nueva donación
    static create(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { amount, description, donationDate, itemsDescription, quantity, donorId, donationTypeId } = req.body;
                // Verificar que el donante existe
                const donor = yield donorRepository.findOneBy({ id: donorId });
                if (!donor) {
                    return res.status(404).json({ message: "Donante no encontrado" });
                }
                // Verificar que el tipo de donación existe
                const donationType = yield donationTypeRepository.findOneBy({ id: donationTypeId });
                if (!donationType) {
                    return res.status(404).json({ message: "Tipo de donación no encontrado" });
                }
                const donation = new donation_entity_1.Donation();
                donation.amount = amount;
                donation.description = description;
                donation.donationDate = donationDate ? new Date(donationDate) : new Date();
                donation.itemsDescription = itemsDescription;
                donation.quantity = quantity;
                donation.donor = donor;
                donation.donationType = donationType;
                yield donationRepository.save(donation);
                return res.status(201).json(donation);
            }
            catch (error) {
                console.error(error);
                return res.status(500).json({ message: "Error al crear donación" });
            }
        });
    }
    // Actualizar una donación
    static update(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const id = Number.parseInt(req.params.id);
                const { amount, description, donationDate, itemsDescription, quantity, donorId, donationTypeId } = req.body;
                const donation = yield donationRepository.findOne({
                    where: { id },
                    relations: ["donor", "donationType"],
                });
                if (!donation) {
                    return res.status(404).json({ message: "Donación no encontrada" });
                }
                // Actualizar donante si se proporciona
                if (donorId) {
                    const donor = yield donorRepository.findOneBy({ id: donorId });
                    if (!donor) {
                        return res.status(404).json({ message: "Donante no encontrado" });
                    }
                    donation.donor = donor;
                }
                // Actualizar tipo de donación si se proporciona
                if (donationTypeId) {
                    const donationType = yield donationTypeRepository.findOneBy({ id: donationTypeId });
                    if (!donationType) {
                        return res.status(404).json({ message: "Tipo de donación no encontrado" });
                    }
                    donation.donationType = donationType;
                }
                donation.amount = amount !== undefined ? amount : donation.amount;
                donation.description = description || donation.description;
                donation.donationDate = donationDate ? new Date(donationDate) : donation.donationDate;
                donation.itemsDescription = itemsDescription || donation.itemsDescription;
                donation.quantity = quantity !== undefined ? quantity : donation.quantity;
                yield donationRepository.save(donation);
                return res.status(200).json(donation);
            }
            catch (error) {
                console.error(error);
                return res.status(500).json({ message: "Error al actualizar donación" });
            }
        });
    }
    // Eliminar una donación (soft delete)
    static delete(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const id = Number.parseInt(req.params.id);
                const donation = yield donationRepository.findOneBy({ id });
                if (!donation) {
                    return res.status(404).json({ message: "Donación no encontrada" });
                }
                donation.isActive = false;
                yield donationRepository.save(donation);
                return res.status(200).json({ message: "Donación eliminada correctamente" });
            }
            catch (error) {
                console.error(error);
                return res.status(500).json({ message: "Error al eliminar donación" });
            }
        });
    }
}
exports.DonationController = DonationController;
