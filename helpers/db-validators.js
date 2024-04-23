
const Role = require('../models/role');
const Usuario = require('../models/usuario');

const roleValido = async (rol = '') => {
    const existeRol = await Role.findOne({ rol });
    if (!existeRol) {
        throw new Error(`El rol ${rol} no está registrado en la BD`)
    }
}


const correoValido = async (correo = '') => {
    // verificar si el correo existe
    const existeEmail = await Usuario.findOne({ correo });
    if (existeEmail) {
        throw new Error(`El correo ${correo} ya está registrado en la BD`)
    }
}

const existeUsuarioPorId = async (id) => {
    // verificar si el correo existe
    const existeUsuario = await Usuario.findById(id);
    if (!existeUsuario) {
        throw new Error(`El id ${correo} no existe`)
    }
}


module.exports = {
    roleValido,
    correoValido,
    existeUsuarioPorId
};  