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

export default Vehiculo;