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
const datos_1 = require("./datos");
const funciones_1 = require("./funciones");
(0, funciones_1.mostrarDonacion)(datos_1.historial1);
(0, funciones_1.procesarDonacion)(datos_1.historial1, funciones_1.mostrarDonacion);
function main() {
    return __awaiter(this, void 0, void 0, function* () {
        const mensaje = yield (0, funciones_1.guardarDonacion)(datos_1.historial1);
        console.log(mensaje);
    });
}
main();
