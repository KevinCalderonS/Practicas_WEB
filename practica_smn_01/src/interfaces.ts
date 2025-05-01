export interface Donante {
    nombre: string;
    contacto: string;
    direccion: string;
  }
  
  export interface TipoDonacion {
    tipo: "Dinero" | "Alimentos" | "Suministros";
    descripcion: string;
  }
  
  export interface HistorialDonacion {
    donante: Donante;
    tipo: TipoDonacion;
    fecha: string;
    monto?: number; // solo si es dinero
  }
  