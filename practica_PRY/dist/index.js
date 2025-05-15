"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
const data_source_1 = require("./models/data-source");
const app_1 = __importDefault(require("./app"));
const PORT = process.env.PORT || 3000;
// Inicializar la base de datos y el servidor
data_source_1.AppDataSource.initialize()
    .then(() => {
    console.log("Base de datos inicializada correctamente");
    app_1.default.listen(PORT, () => {
        console.log(`Servidor corriendo en el puerto ${PORT}`);
    });
})
    .catch((error) => {
    console.error("Error al inicializar la base de datos:", error);
});
