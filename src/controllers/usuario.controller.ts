import { Request, Response } from "express";
import UsuarioModel from "../models/usuario.model";
import bcrypt from "bcryptjs";
/**
 * @api {post} /usuarios Crear Usuario
 * @apiName CrearUsuario
 * @apiGroup Usuarios
 *
 * @apiDescription Crea un nuevo usuario en el sistema.
 *
 * @apiParam {Object} body Objeto que contiene los datos del usuario.
 * @apiParam {String} body.email Email del usuario.
 * @apiParam {String} body.password Contraseña del usuario.
 *
 * @apiSuccess {Boolean} ok Indica si la solicitud fue exitosa.
 * @apiSuccess {String} msg Mensaje de éxito.
 * @apiSuccess {Object} usuario Objeto que representa al usuario creado.
 *
 * @apiSuccessExample {json} Respuesta exitosa:
 *     HTTP/1.1 200 OK
 *     {
 *         "ok": true,
 *         "msg": "Usuario creado exitosamente",
 *         "usuario": {
 *             "_id": "6128c7a378a4b525e4e56d28",
 *             "email": "usuario@example.com"
 *         }
 *     }
 *
 * @apiError {Boolean} ok Indica si la solicitud fue exitosa.
 * @apiError {String} msg Mensaje de error.
 *
 * @apiErrorExample {json} Respuesta de error:
 *     HTTP/1.1 400 Bad Request
 *     {
 *         "ok": false,
 *         "msg": "Error al crear el usuario, comuniquese con el administrador"
 *     }
 */

export const crearUsuario = async(req: Request, res: Response)=>{
    const {body} = req;
    const {email, password} = body;
    try {
        const existeEmail = await UsuarioModel.findOne({email: email});
        if(existeEmail){
            return res.status(409).json({
                ok:false,
                msg: `Ya existe este email: ${email}`,
            })
        }

        const newUsuario = new UsuarioModel({
            ...body,
        });
        //Encriptar contraseña
        const salt = bcrypt.genSaltSync(10);
        newUsuario.password = bcrypt.hashSync(password, salt);
        const usuarioCreado = await newUsuario.save();
        res.status(200).json({
            ok:true,
            msg:"Usuario creado exitosamente",
            usuario: usuarioCreado,
        })        
    } catch (error) {
        console.error(error);
        res.status(400).json({
            ok:false,
            error,
            msg: "Error al crear el usario, comuniquese con el administrador",
        });
        
    }
};
export const getUsuario = async(req: Request, res: Response)=>{
    try {
        const usuarios = await UsuarioModel.find();
        res.json({
            ok:true,
            usuarios,
        })
    } catch (error) {
        res.status(400).json({
            ok: false,
            msg: "Error al consultar los usuarios",
        })
        
    }
};

export const getUnUsuario = async(req: Request, res: Response)=>{
    try {
        const id = req.params.id;
        const usuarios = await UsuarioModel.findById({_id: id});
        res.json({
            ok:true,
            usuarios,
        });
    } catch (error) {
        res.status(400).json({
            ok: false,
            msg: "Error al consultar los usuarios",
        });
        
    }
};
export const actualizarUsuario = async(req: Request, res: Response)=>{
    try {
        const id = req.params.id;
        const {body} = req;
        const usuarioActualizado = await UsuarioModel.findByIdAndUpdate(id, body);
        res.json({
            ok:true,
            usuario: usuarioActualizado,
            msg: "Usuario Actualizado",
        });
    } catch (error) {
        console.error(error);
        res.status(400).json({
            ok: false,
            msg: "Error al actualizar el usuario",
        });
        
    }
};

export const eliminarUsuario = async(req: Request, res: Response)=>{
    try {
        const id = req.params.id;
        const usuarioEliminado = await UsuarioModel.findByIdAndDelete({_id: id});
        res.json({
            ok:true,
            msg: "Usuario Eliminado",
            usuario: usuarioEliminado,
        });
    } catch (error) {
        console.error(error);
        res.status(400).json({
            ok: false,
            msg: "Error al eliminar el usuario",
        });
        
    }
};

