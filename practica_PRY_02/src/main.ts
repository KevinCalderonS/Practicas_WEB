import { historial1 } from './datos';
import { mostrarDonacion, procesarDonacion, guardarDonacion } from './funciones';

mostrarDonacion(historial1);

procesarDonacion(historial1, mostrarDonacion);

async function main() {
  const mensaje = await guardarDonacion(historial1);
  console.log(mensaje);
}

main();
