import { Donante, TipoDonacion, HistorialDonacion } from './interfaces';

export const donante1: Donante = {
  nombre: "María González",
  contacto: "0991234567",
  direccion: "Calle 123, Ciudad"
};

export const tipoDonacion1: TipoDonacion = {
  tipo: "Dinero",
  descripcion: "Transferencia mensual"
};

export const historial1: HistorialDonacion = {
  donante: donante1,
  tipo: tipoDonacion1,
  fecha: "2025-04-30",
  monto: 100
};

export const donantes: Donante[] = [donante1];
export const tipos: TipoDonacion[] = [tipoDonacion1];
export const historiales: HistorialDonacion[] = [historial1];
