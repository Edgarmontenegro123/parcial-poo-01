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
}

class Auto extends Vehiculo {
    estaDisponible() {
        return this.disponible;
    }

    marcarComoAlquilado() {
        this.disponible = false;
    }

    marcarComoDisponible() {
        this.disponible = true;
    }
}

class Moto extends Vehiculo {

}

class Camioneta extends Vehiculo {

}

class Cliente {
    constructor(nombre, apellido, documento) {
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
            throw new Error(`El vehiculo ${vehiculo} tiene como status alquiler registrado`);
        }
    }

    listarVehiculos() {
        if(this.#vehiculos.length > 0){
            return this.#vehiculos;
        }
        else {
            throw new Error(`La lista de vehiculos se encuentra vacía`);
        }
    }

    verificarDisponibilidad(matricula) {
        const vehiculo = this.#vehiculos.find(v => v.matricula === matricula);
        if(!vehiculo) {
            throw new Error(`El vehículo con matrícula ${matricula} no se ha encontrado.`);
        }
        return vehiculo.estaDisponible();
    }

    realizarAlquiler() {

    }

    listarAlquileres() {

    }
}