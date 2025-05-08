import Vehiculo from './Vehiculo.js';
import Alquiler from './Alquiler.js';

class Agencia {
    #vehiculos;
    #alquileres;
    constructor(vehiculos = [], alquileres = []) {
        this.#vehiculos = vehiculos;
        this.#alquileres = alquileres;
    }

    registrarVehiculo(vehiculo) {
        if(vehiculo instanceof Vehiculo) {
            this.#vehiculos.push(vehiculo);
        }
        else {
            throw new Error(`El vehiculo ${vehiculo} tiene como status alquiler registrado.`);
        }
    }

    listarVehiculos() {
        if(this.#vehiculos.length > 0){
            return this.#vehiculos;
        }
        else {
            throw new Error(`La lista de vehiculos se encuentra vacía.`);
        }
    }

    verificarDisponibilidad(matricula) {
        const vehiculo = this.#vehiculos.find(v => v.matricula === matricula);
        if(!vehiculo) {
            throw new Error(`El vehículo con matrícula ${matricula} no se ha encontrado.`);
        }
        return vehiculo.estaDisponible();
    }

    realizarAlquiler(cliente, matricula, fechaInicioStr, fechaFinStr) {
        const vehiculo = this.#vehiculos.find(v => v.matricula === matricula);

        if(!vehiculo) {
            throw new Error(`El vehículo con matrícula ${matricula} no se ha encontrado.`);
        }
        if(!vehiculo.estaDisponible()) {
            throw new Error(`El vehículo con matrícula ${matricula} no se encuentra disponible.`);
        }

        const fechaInicio = new Date(fechaInicioStr);
        const fechaFin = new Date(fechaFinStr);

        if(isNaN(fechaInicio.getTime()) || isNaN(fechaFin.getTime())){
            throw new Error(`Una o ambas fechas no se encuentran en un formato válido. YYYY-MM-DD.`);
        }

        if(fechaInicio >= fechaFin) {
            throw new Error(`La fecha de inicio debe de ser anterior a la fecha de finalización.`);
        }

        const rangoFechas = {
            inicio: fechaInicio,
            fin: fechaFin,
        }
        const nuevoAlquiler = new Alquiler(cliente, vehiculo, rangoFechas);

        vehiculo.marcarComoAlquilado();

        this.#alquileres.push(nuevoAlquiler);
    }

    listarAlquileres() {
        if(this.#alquileres.length === 0) {
            throw new Error(`La lista de alquileres se encuentra vacía.`);
        }

        return this.#alquileres.map((alquiler, index) => ({
            numero: index + 1,
            cliente: {
                nombre: alquiler.cliente.nombre,
                apellido: alquiler.cliente.apellido,
                documento: alquiler.cliente.documento,
            },
            vehiculo: {
                matricula: alquiler.vehiculo.matricula,
                marca: alquiler.vehiculo.marca,
                modelo: alquiler.vehiculo.modelo,
            },
            fechas: {
                inicio: alquiler.rangoFechas.inicio.toLocaleDateString('es-ES', {day: 'numeric', month: 'long', year: 'numeric'}),
                fin: alquiler.rangoFechas.fin.toLocaleDateString('es-ES', {day: 'numeric', month: 'long', year: 'numeric'}),
            }
        }));
    }

    devolverVehiculo(matricula) {
        const vehiculo = this.#vehiculos.find(v => v.matricula === matricula);
        if(!vehiculo) {
            throw new Error(`No se encontró el vehículo con matrícula ${matricula}`);
        }
        vehiculo.marcarComoDisponible()
    }
}

export default Agencia;