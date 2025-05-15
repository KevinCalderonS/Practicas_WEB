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
const express_1 = require("express");
const donor_controller_1 = require("../controllers/donor.controller");
const router = (0, express_1.Router)();
// Rutas para donantes
router.get("/", (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield donor_controller_1.DonorController.getAll(req, res);
    }
    catch (err) {
        next(err);
    }
}));
router.get("/:id", (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield donor_controller_1.DonorController.getById(req, res);
    }
    catch (err) {
        next(err);
    }
}));
router.post("/", (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield donor_controller_1.DonorController.create(req, res);
    }
    catch (err) {
        next(err);
    }
}));
router.put("/:id", (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield donor_controller_1.DonorController.update(req, res);
    }
    catch (err) {
        next(err);
    }
}));
router.delete("/:id", (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield donor_controller_1.DonorController.delete(req, res);
    }
    catch (err) {
        next(err);
    }
}));
exports.default = router;
