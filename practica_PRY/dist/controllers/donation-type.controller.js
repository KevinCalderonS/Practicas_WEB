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
exports.DonationTypeController = void 0;
const data_source_1 = require("../models/data-source");
const donation_type_entity_1 = require("../models/donation-type.entity");
const donationTypeRepository = data_source_1.AppDataSource.getRepository(donation_type_entity_1.DonationType);
class DonationTypeController {
    // Obtener todos los tipos de donación
    static getAll(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const donationTypes = yield donationTypeRepository.find({
                    where: { isActive: true },
                    relations: ["donations"],
                });
                return res.status(200).json(donationTypes);
            }
            catch (error) {
                console.error(error);
                return res.status(500).json({ message: "Error al obtener tipos de donación" });
            }
        });
    }
    // Obtener un tipo de donación por ID
    static getById(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const id = Number.parseInt(req.params.id);
                const donationType = yield donationTypeRepository.findOne({
                    where: { id, isActive: true },
                    relations: ["donations"],
                });
                if (!donationType) {
                    return res.status(404).json({ message: "Tipo de donación no encontrado" });
                }
                return res.status(200).json(donationType);
            }
            catch (error) {
                console.error(error);
                return res.status(500).json({ message: "Error al obtener tipo de donación" });
            }
        });
    }
    // Crear un nuevo tipo de donación
    static create(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { name, description } = req.body;
                const donationType = new donation_type_entity_1.DonationType();
                donationType.name = name;
                donationType.description = description;
                yield donationTypeRepository.save(donationType);
                return res.status(201).json(donationType);
            }
            catch (error) {
                console.error(error);
                return res.status(500).json({ message: "Error al crear tipo de donación" });
            }
        });
    }
    // Actualizar un tipo de donación
    static update(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const id = Number.parseInt(req.params.id);
                const { name, description } = req.body;
                const donationType = yield donationTypeRepository.findOneBy({ id });
                if (!donationType) {
                    return res.status(404).json({ message: "Tipo de donación no encontrado" });
                }
                donationType.name = name || donationType.name;
                donationType.description = description || donationType.description;
                yield donationTypeRepository.save(donationType);
                return res.status(200).json(donationType);
            }
            catch (error) {
                console.error(error);
                return res.status(500).json({ message: "Error al actualizar tipo de donación" });
            }
        });
    }
    // Eliminar un tipo de donación (soft delete)
    static delete(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const id = Number.parseInt(req.params.id);
                const donationType = yield donationTypeRepository.findOneBy({ id });
                if (!donationType) {
                    return res.status(404).json({ message: "Tipo de donación no encontrado" });
                }
                donationType.isActive = false;
                yield donationTypeRepository.save(donationType);
                return res.status(200).json({ message: "Tipo de donación eliminado correctamente" });
            }
            catch (error) {
                console.error(error);
                return res.status(500).json({ message: "Error al eliminar tipo de donación" });
            }
        });
    }
}
exports.DonationTypeController = DonationTypeController;
