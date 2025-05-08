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

export default Cliente;