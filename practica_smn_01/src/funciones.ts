import { Donante, HistorialDonacion, TipoDonacion } from './interfaces';

export function registrarDonante(nombre: string, contacto: string, direccion: string): Donante {
  return { nombre, contacto, direccion };
}

export function mostrarDonacion(historial: HistorialDonacion): void {
  console.log(`${historial.donante.nombre} donó ${historial.tipo.tipo} el ${historial.fecha}`);
}

export function registrarMultiplesDonaciones(...donaciones: HistorialDonacion[]) {
  donaciones.forEach(d => mostrarDonacion(d));
}

export function procesarDonacion(donacion: HistorialDonacion, callback: (d: HistorialDonacion) => void): void {
  callback(donacion);
}

export function guardarDonacion(donacion: HistorialDonacion): Promise<string> {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve(`Donación registrada de ${donacion.donante.nombre}`);
    }, 1000);
  });
}
