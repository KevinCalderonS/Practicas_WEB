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
const donation_controller_1 = require("../controllers/donation.controller");
const router = (0, express_1.Router)();
// Rutas para donaciones
router.get("/", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield donation_controller_1.DonationController.getAll(req, res);
    }
    catch (error) {
        res.status(500).json({ error: "Internal server error" });
    }
}));
router.get("/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield donation_controller_1.DonationController.getById(req, res);
    }
    catch (error) {
        res.status(500).json({ error: "Internal server error" });
    }
}));
router.post("/", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield donation_controller_1.DonationController.create(req, res);
    }
    catch (error) {
        res.status(500).json({ error: "Internal server error" });
    }
}));
router.put("/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield donation_controller_1.DonationController.update(req, res);
    }
    catch (error) {
        res.status(500).json({ error: "Internal server error" });
    }
}));
router.delete("/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield donation_controller_1.DonationController.delete(req, res);
    }
    catch (error) {
        res.status(500).json({ error: "Internal server error" });
    }
}));
exports.default = router;
