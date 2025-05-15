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
exports.DonorController = void 0;
const data_source_1 = require("../models/data-source");
const donor_entity_1 = require("../models/donor.entity");
const donorRepository = data_source_1.AppDataSource.getRepository(donor_entity_1.Donor);
class DonorController {
    // Obtener todos los donantes
    static getAll(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const donors = yield donorRepository.find({
                    where: { isActive: true },
                    relations: ["donations", "recognitions"],
                });
                return res.status(200).json(donors);
            }
            catch (error) {
                console.error(error);
                return res.status(500).json({ message: "Error al obtener donantes" });
            }
        });
    }
    // Obtener un donante por ID
    static getById(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const id = Number.parseInt(req.params.id);
                const donor = yield donorRepository.findOne({
                    where: { id, isActive: true },
                    relations: ["donations", "recognitions"],
                });
                if (!donor) {
                    return res.status(404).json({ message: "Donante no encontrado" });
                }
                return res.status(200).json(donor);
            }
            catch (error) {
                console.error(error);
                return res.status(500).json({ message: "Error al obtener donante" });
            }
        });
    }
    // Crear un nuevo donante
    static create(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { name, email, phone, address, city, state, zipCode } = req.body;
                const donor = new donor_entity_1.Donor();
                donor.name = name;
                donor.email = email;
                donor.phone = phone;
                donor.address = address;
                donor.city = city;
                donor.state = state;
                donor.zipCode = zipCode;
                yield donorRepository.save(donor);
                return res.status(201).json(donor);
            }
            catch (error) {
                console.error(error);
                return res.status(500).json({ message: "Error al crear donante" });
            }
        });
    }
    // Actualizar un donante
    static update(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const id = Number.parseInt(req.params.id);
                const { name, email, phone, address, city, state, zipCode } = req.body;
                const donor = yield donorRepository.findOneBy({ id });
                if (!donor) {
                    return res.status(404).json({ message: "Donante no encontrado" });
                }
                donor.name = name || donor.name;
                donor.email = email || donor.email;
                donor.phone = phone || donor.phone;
                donor.address = address || donor.address;
                donor.city = city || donor.city;
                donor.state = state || donor.state;
                donor.zipCode = zipCode || donor.zipCode;
                yield donorRepository.save(donor);
                return res.status(200).json(donor);
            }
            catch (error) {
                console.error(error);
                return res.status(500).json({ message: "Error al actualizar donante" });
            }
        });
    }
    // Eliminar un donante (soft delete)
    static delete(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const id = Number.parseInt(req.params.id);
                const donor = yield donorRepository.findOneBy({ id });
                if (!donor) {
                    return res.status(404).json({ message: "Donante no encontrado" });
                }
                donor.isActive = false;
                yield donorRepository.save(donor);
                return res.status(200).json({ message: "Donante eliminado correctamente" });
            }
            catch (error) {
                console.error(error);
                return res.status(500).json({ message: "Error al eliminar donante" });
            }
        });
    }
}
exports.DonorController = DonorController;
