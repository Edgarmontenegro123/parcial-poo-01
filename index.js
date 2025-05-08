import Agencia from './clases/Agencia.js';
import Auto from './clases/Auto.js';
import Moto from './clases/Moto.js';
import Camioneta from './clases/Camioneta.js';
import Cliente from './clases/Cliente.js';


const agencia = new Agencia();
const auto1 = new Auto('ABC123', 'Audi', 'TT');
const moto1 = new Moto('XYZ987', 'Yamaha', 'FZ');
const camioneta1 = new Camioneta('JKL456', 'Ford', 'Ranger');

agencia.registrarVehiculo(auto1);
agencia.registrarVehiculo(moto1);
agencia.registrarVehiculo(camioneta1);

const cliente1 = new Cliente('Viviana', 'Valera', '94443654');

agencia.realizarAlquiler(cliente1, 'ABC123', '2025-05-10', '2025-05-31');

console.log(`🔑 Alquileres realizados:`);
console.log(JSON.stringify(agencia.listarAlquileres(), null, 2));
console.log(`🚗 Vehículos registrados:`);
agencia.listarVehiculos().forEach((v) => {
    console.log(`${v.descripcion()} - Disponible: ${v.estaDisponible() ? 'Sí' : 'No'}`);
});