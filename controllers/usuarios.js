const { response, request, query } = require('express');
const bcryptjs = require('bcryptjs');
const Usuario = require('../models/usuario');



const usuariosGet = async (req = request, res = response) => {

    // const { q, nombre = 'No name', apikey, page = 1, limit } = req.query;
    const { limite = 5, desde = 0 } = req.query;
    const query = { estado: true }

    // const usuarios = await Usuario.find(query)
    // .skip(Number(desde))
    // .limit(Number(limite));

    // const total= await Usuario.countDocuments(query);

    const [total, usuarios] = await Promise.all([
        Usuario.countDocuments(query),
        Usuario.find(query)
            .skip(Number(desde))
            .limit(Number(limite))

    ]);

    res.json({
        total,
        usuarios

    });
}

const usuariosPost = async (req, res = response) => {
    // const { nombre, edad } = req.body;
    const { nombre, correo, password, rol } = req.body;
    const usuario = new Usuario({ nombre, correo, password, rol });

    // verificar si el correo existe
    // const existeEmail = await Usuario.findOne({correo});
    // if(existeEmail){
    //     return res.status(400).json({
    //         msg:'Ese correo ya está registrado'
    //     });
    // }

    // Encriptar contraseña 
    const salt = bcryptjs.genSaltSync();
    usuario.password = bcryptjs.hashSync(password, salt);

    // Guardar en bd
    await usuario.save();
    res.json({
        msg: 'post API - usuariosPost',
        usuario
        // nombre, 
        // edad
    });
}

const usuariosPut = async (req, res = response) => {
    const { id } = req.params;
    const { _id, password, google, ...resto } = req.body;

    try {
        // Validar datos (puedes agregar tu lógica de validación aquí)

        // Actualizar contraseña si se proporciona
        if (password) {
            const salt = bcryptjs.genSaltSync();
            resto.password = bcryptjs.hashSync(password, salt);
        }

        // Actualizar usuario en la base de datos
        const usuario = await Usuario.findByIdAndUpdate(id, resto, { new: true });

        if (!usuario) {
            return res.status(404).json({ msg: 'Usuario no encontrado' });
        }

        // Usuario actualizado correctamente
        res.json({
            msg: 'Usuario actualizado correctamente',
            usuario
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ msg: 'Error al actualizar usuario' });
    }
};


const usuariosPatch = (req, res = response) => {
    res.json({
        msg: 'patch API - usuariosPatch'
    });
}

const usuariosDelete = async (req, res = response) => {

    const { id } = req.params;
    // Borrar fisicamente 
    // const usuario = await Usuario.findByIdAndDelete(id);

    const usuario = await Usuario.findByIdAndUpdate(id, { estado: false });

    res.json(usuario);
}


module.exports = {
    usuariosGet,
    usuariosPost,
    usuariosPut,
    usuariosPatch,
    usuariosDelete,
}