"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const donor_routes_1 = __importDefault(require("./donor.routes"));
const donation_type_routes_1 = __importDefault(require("./donation-type.routes"));
const donation_routes_1 = __importDefault(require("./donation.routes"));
const router = (0, express_1.Router)();
// Configurar rutas
router.use("/donors", donor_routes_1.default);
router.use("/donation-types", donation_type_routes_1.default);
router.use("/donations", donation_routes_1.default);
exports.default = router;
