"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.registrarDonante = registrarDonante;
exports.mostrarDonacion = mostrarDonacion;
exports.registrarMultiplesDonaciones = registrarMultiplesDonaciones;
exports.procesarDonacion = procesarDonacion;
exports.guardarDonacion = guardarDonacion;
function registrarDonante(nombre, contacto, direccion) {
    return { nombre, contacto, direccion };
}
function mostrarDonacion(historial) {
    console.log(`${historial.donante.nombre} donó ${historial.tipo.tipo} el ${historial.fecha}`);
}
function registrarMultiplesDonaciones(...donaciones) {
    donaciones.forEach(d => mostrarDonacion(d));
}
function procesarDonacion(donacion, callback) {
    callback(donacion);
}
function guardarDonacion(donacion) {
    return new Promise(resolve => {
        setTimeout(() => {
            resolve(`Donación registrada de ${donacion.donante.nombre}`);
        }, 1000);
    });
}
