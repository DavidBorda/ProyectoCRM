import { Model, Schema, model } from "mongoose";

/**
 * @api {object} UsuarioModel Modelo de Usuario
 * @apiName UsuarioModel
 * @apiGroup Modelos
 *
 * @apiDescription Modelo de Mongoose para representar un usuario en el sistema.
 *
 * @apiParam {String} nombre Nombre del usuario.
 * @apiParam {String} email Email del usuario (debe ser único).
 * @apiParam {String} tipoDocumento Tipo de documento del usuario.
 * @apiParam {String} numeroDocumento Número de documento del usuario (debe ser único).
 * @apiParam {Number} [numeroCelular] Número de celular del usuario (opcional).
 * @apiParam {String} [peso] Peso del usuario (opcional).
 * @apiParam {Date} [fechaNacimiento] Fecha de nacimiento del usuario (opcional).
 * @apiParam {String} password Contraseña del usuario.
 * @apiParam {String} [rol="User"] Rol del usuario (valor por defecto: "User").
 * @apiParam {Date} [createAt=Date.now()] Fecha de creación del usuario (valor por defecto: fecha actual).
 */

const UsuarioSchema = new Schema({
    nombre: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    tipoDocumento: {
        type: String,
        required: true,
    },
    numeroDocumento: {
        type: String,
        required: true,
        unique: true,
    },
    numeroCelular: {
        type: Number,
    },
    peso: {
        type: String,
    },
    fechaNacimiento: {
        type: Date,
    },
    password: { type: String },
    rol: { type: String, default: "User" },
    createAt: {
        type: Date,
        default: Date.now(),
    },

});
const UsuarioModel: Model<any> = model("usuario", UsuarioSchema);
export default UsuarioModel;