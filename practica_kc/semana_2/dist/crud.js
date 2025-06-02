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
exports.insertarUser = void 0;
const user_1 = require("./models/user");
const data_source_1 = require("./data-source");
const insertarUser = (nombre, correo) => __awaiter(void 0, void 0, void 0, function* () {
    const user1 = new user_1.user();
    user1.correo = correo;
    user1.nombre = nombre;
    return yield data_source_1.AppDataSource.manager.save((user1));
});
exports.insertarUser = insertarUser;
