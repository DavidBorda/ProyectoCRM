
//Solicitar datos email y contraseña
//Desencriptar la contraseña
//Generar el token
//Login exitoso
import bcrypt from 'bcryptjs';
import { Request, Response, response } from "express";
import UsuarioModel from "../models/usuario.model";
import generateJWT from '../helpers/jwt';
import { CustomRequest } from '../middlewares/validate-jwt';
/**
 * @api {post} /login Iniciar sesión
 * @apiName IniciarSesion
 * @apiGroup Autenticación
 *
 * @apiDescription Inicia sesión de un usuario utilizando su email y contraseña.
 *
 * @apiParam {String} email Email del usuario.
 * @apiParam {String} password Contraseña del usuario.
 *
 * @apiSuccess {Boolean} ok Indica si la solicitud fue exitosa.
 * @apiSuccess {Object} usuario Objeto que representa al usuario.
 * @apiSuccess {String} usuario._id ID del usuario.
 * @apiSuccess {String} usuario.email Email del usuario.
 * @apiSuccess {String} token Token de autenticación generado.
 *
 * @apiSuccessExample {json} Respuesta exitosa:
 *     HTTP/1.1 200 OK
 *     {
 *         "ok": true,
 *         "usuario": {
 *             "_id": "1234567890",
 *             "email": "usuario@example.com"
 *         },
 *         "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE2MTg5MjI0NzQsImV4cCI6MTYxODkyMjQ4NX0.v3M3SqPZ6odaxMfGOXq3-4-Y3g8ed02Qc"
 *     }
 *
 * @apiError {Boolean} ok Indica si la solicitud fue exitosa.
 * @apiError {String} msg Mensaje de error.
 *
 * @apiErrorExample {json} Respuesta de error:
 *     HTTP/1.1 401 Unauthorized
 *     {
 *         "ok": false,
 *         "msg": "Las credenciales no son válidas"
 *     }
 */

export const login = async(req: Request, res: Response)=>{
    const {email, password} = req.body;
    try {
        //verificar email
        const usuario = await UsuarioModel.findOne({email: email});
        if(!usuario){
            return res.status(401).json({
                ok:false,
                msg: "Las credenciales no son validas",
            })
        }

        //verificar password

        const validarPassword = bcrypt.compareSync(password, usuario.password);
        if(!validarPassword){
            return res.status(401).json({
                ok:false,
                msg: "Las credenciales no son validas",
            })
        }
        //generar token
        const token = await generateJWT(usuario._id, usuario.email);

        res.status(200).json({
            ok:true,
            usuario,
            token,
        });
    } catch (error) {
        res.status(400).json({
            ok:false,
            error,
            msg: "contactese con el administrador",
        });
        
    }
}
// para recuperar se necesitan dos valores el email y el documento
export const olvidoContrasena  = async (req: Request, res: Response)=> {
    const {email, numeroDocumento} = req.body;
    try {
        const existeUsuario = await UsuarioModel.findOne({
            email, 
            numeroDocumento,        
        });
        if(!existeUsuario){
            res.status(400).json({
                ok:false,
                msg: "Los datos no coinciden",   
            });
        }
        const id = existeUsuario?._id;
        if(id){
            //Generar token
            const token = await generateJWT(
                id,
                email,
                "1h", 
                process.env.JWT_SECRET_PASS
            );
            res.status(300).json({
                ok:true,
                msg: "Proceso Exitoso",
                usuario: existeUsuario,
                token
            });
        }
        
    } catch (error) {
        console.error(error);
        res.status(400).json({
            ok: false,
            msg: "No se logro validar los datos",
        });
        
    }
};
export const cambioContrasena = async (req: CustomRequest, res: Response)=>{
    const id  = req._id
    const{password} = req.body;
    try {
        if(!password){
            res.status(400).json({
                ok:false,
                msg: "Por favir digite una contraseña valida",
            });
        }
        const newPassword = bcrypt.hashSync(password, 10);
        const actualizarPassword = await UsuarioModel.findByIdAndUpdate({
            _id : id,
            password: newPassword,
        });
        if(!actualizarPassword){
            res.status(400).json({
                ok: false,
                msg: "Error al actualizar la contraseña",
            });
        }
        res.status(200).json({
            ok:true,
            msg: "Contraseña Actualizada",
        })
        
    } catch (error) {
        console.error(error);
        res.status(400).json({
            ok:false,
            msg: "Erroa al actualizar la contraseña, contacte un administrador",
        });

    }
}
