// Parcial Programacion Orientada a Objetos
/*
    Una agencia requiere un sistema de alquiler de vehículos. Los vehículos a alquilar pueden ser autos, motos y camionetas.
    El sistema debe gestionar el alquiler de los vehículos administrados por la agencia.
    Los vehículos se registran con matrícula, marca, modelo, y control de disponibilidad.
    El alquiler se registra asociando un cliente, un vehículo y un rango de fechas.
    Métodos para verificar disponibilidad, realizar alquileres y listar vehículos y alquileres.

    Sugerencias:
    Clase Alquiler representa la asociación entre un cliente, un vehículo alquilado, y las fechas de inicio y fin.
    Clase Agencia con una colección de vehículos y alquileres.
*/

class Vehiculo {
    constructor(matricula, marca, modelo) {
        this.matricula = matricula;
        this.marca = marca;
        this.modelo = modelo;
        this.disponible = true;
    }

    estaDisponible() {
        return this.disponible;
    }

    marcarComoAlquilado() {
        this.disponible = false;
    }

    marcarComoDisponible() {
        this.disponible = true;
    }

    descripcion() {
        return `${this.constructor.name}: ${this.marca} ${this.modelo} - Matrícula: ${this.matricula}`;
    }
}

class Auto extends Vehiculo {}
class Moto extends Vehiculo {}
class Camioneta extends Vehiculo {}

class Cliente {
    constructor(nombre, apellido, documento) {
        if(!/^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/.test(nombre)) {
            throw new Error('El nombre solo debe contener letras.');
        }
        if(!/^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/.test(apellido)) {
            throw new Error('El apellido solo debe contener letras.');
        }
        if(!/^\d{7,8}$/.test(documento)) {
            throw new Error('El documento debe contener entre 7 y 8 dígitos numéricos.');
        }

        this.nombre = nombre;
        this.apellido = apellido;
        this.documento = documento;
    }
}

class Alquiler {
    constructor(cliente, vehiculo, rangoFechas) {
        this.cliente = cliente;
        this.vehiculo = vehiculo;
        this.rangoFechas = rangoFechas;
    }
}

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