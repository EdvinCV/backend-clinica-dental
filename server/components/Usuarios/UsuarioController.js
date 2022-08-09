// Models
const db = require('../../config/dbconnection');
const Usuario = db.usuarios;
// Express validator
const {validationResult} = require('express-validator');
// Bcryptjs
const bcrypt = require('bcryptjs');
// JWT
const jwt = require('jsonwebtoken');

// Obtener informacion del usuario logueado.
exports.getMeController = async (req, res) => {
    try {
        const usuario = await Usuario.findOne({
            where: {
                id: req.body.id,
                status: true
            }
        });
        if(usuario){
            res.status(200).json({
                ok: true,
                usuario
            });
        } else {
            res.status(200).json({
                ok: false,
                message: "Usuario no encontrado."
            });
        }
    } catch(error){
        console.log(error);
    }
}

// Obtener listado de todos los usuarios activos.
exports.getUsersController = async (req, res) => {
    try {
        const usuarios = await Usuario.findAll({
            where: {
                status: true
            }
        });
        res.status(200).json({
            ok: true,
            usuarios
        });
    } catch(error){
        console.log(error);
    }
}

// Controlador para registrar usuarios.
exports.createUserController = async (req, res) => {
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({
            ok: false,
            errors: errors.array()
        });
    }
    
    let {name, username, password, rol} = req.body;

    // Verificar que no exista un usuario con el mismo username
    const usernameFound = await Usuario.findOne({where: {username}});
    if(usernameFound){
        return res.status(400).json({
            ok: false,
            msg: "Este usuario ya existe."
        });
    }

        // Hash the password
    var salt = await bcrypt.genSalt(10);
    password = await bcrypt.hashSync(password, salt);
    // Create the user
    Usuario.create({name, username, password, rol})
        .then((data) => {
            const access_token = jwt.sign({user: username, name: name}, "CHAT", {});
            res.status(200).json({
                ok: true,
                msg: 'Usuario creado correctamente.',
                data: {
                    data,
                    access_token
                }
            });
        })
        .catch((err) => {
            console.log(err);
            return res.status(400).json({
                ok: false,
                message: "Ha ocurrido un error."
            });
        })
}

// Controlador para login.
exports.loginUserController = async (req, res) => {
    // If there are errors are returned
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({
            ok: false,
            errors: errors.array()
        });
    }

    const {username, password} = req.body;
    try {
        const user = await Usuario.findOne({ where: {username, status: true} });
        // If the user doesn't exists
        if(!user){
            return res.status(400).json({
                ok: true,
                msg: "Usuario o contrasena incorrectas."
            });
        }
        // Verify if the passwords match
        const valid = bcrypt.compareSync(password, user.password);
        if(!valid){
            return res.status(400).json({
                ok: true,
                msg: "Usuario o contrasena incorrectas."
            });
        }
        // Generate a new access_token
        const access_token = jwt.sign({user: user.username, id: user.id}, "CHAT", {});

        res.status(200).json({
            ok: true,
            msg: "Login realizado correctamente.",
            access_token,
            user
        });
    } catch (error) {
        console.log(error);
        return res.status(400).json({
            ok: false,
            msg: "There was an error"
        });
    }
}

// Actualizar el usuario
exports.putUserController = async (req, res) => {
    // If there are errors are returned
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({
            ok: false,
            errors: errors.array()
        });
    }
    try {
        if(req.body.password === null){
            console.log("CONTRASEÑA NO CAMBIO");
            usuario = {
                id: req.body.id,
                name: req.body.name,
                rol: req.body.rol
            }
        }else{
            // Hash the password
            var salt = await bcrypt.genSalt(10);
            password = await bcrypt.hashSync(req.body.password, salt);
            usuario = {
                id: req.body.id,
                name: req.body.name,
                password,
                rol: req.body.rol
            }
        }
        // Buscar el producto
        const usuarioEditado = await Usuario.update(usuario, {
            where: {
                id: usuario.id
            }
        });
        if(usuarioEditado[0] == 1){
            res.status(200).json({
                ok: true,
                message: "Usuario editado correctamente.",
                data: usuarioEditado[0]
            });
        } else {
            res.status(200).json({
                ok: true,
                message: "Usuario no encontrado.",
                data: usuarioEditado[0]
            });
        }
    } catch(error){
        console.log(error);
        res.status(400).json({
            ok: false,
            message: "Ha ocurrido un error, vuelva a intentar mas tarde.",
            error
        });
    }
}

// Eliminar al usuario, únicamente cambia de estado
exports.deleteUserController = async (req, res) => {
    // If there are errors are returned
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({
            ok: false,
            errors: errors.array()
        });
    }
    try {
        const usuario = {
            id: req.body.id,
            status: false
        }
        // Buscar el producto
        const usuarioEditado = await Usuario.update(usuario, {
            where: {
                id: usuario.id
            }
        });
        if(usuarioEditado[0] == 1){
            res.status(200).json({
                ok: true,
                message: "Usuario editado correctamente.",
                data: usuarioEditado[0]
            });
        } else {
            res.status(200).json({
                ok: true,
                message: "Usuario no encontrado.",
                data: usuarioEditado[0]
            });
        }
    } catch(error){
        console.log(error);
        res.status(400).json({
            ok: false,
            message: "Ha ocurrido un error, vuelva a intentar mas tarde.",
            error
        });
    }
}