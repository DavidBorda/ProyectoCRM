"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.eliminarUsuario = exports.actualizarUsuario = exports.getUnUsuario = exports.getUsuario = exports.crearUsuario = void 0;
const usuario_model_1 = __importDefault(require("../models/usuario.model"));
const bcryptjs_1 = __importDefault(require("bcryptjs"));
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
const crearUsuario = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { body } = req;
    const { email, password } = body;
    try {
        const existeEmail = yield usuario_model_1.default.findOne({ email: email });
        if (existeEmail) {
            return res.status(409).json({
                ok: false,
                msg: `Ya existe este email: ${email}`,
            });
        }
        const newUsuario = new usuario_model_1.default(Object.assign({}, body));
        //Encriptar contraseña
        const salt = bcryptjs_1.default.genSaltSync(10);
        newUsuario.password = bcryptjs_1.default.hashSync(password, salt);
        const usuarioCreado = yield newUsuario.save();
        res.status(200).json({
            ok: true,
            msg: "Usuario creado exitosamente",
            usuario: usuarioCreado,
        });
    }
    catch (error) {
        console.error(error);
        res.status(400).json({
            ok: false,
            error,
            msg: "Error al crear el usario, comuniquese con el administrador",
        });
    }
});
exports.crearUsuario = crearUsuario;
const getUsuario = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const usuarios = yield usuario_model_1.default.find();
        res.json({
            ok: true,
            usuarios,
        });
    }
    catch (error) {
        res.status(400).json({
            ok: false,
            msg: "Error al consultar los usuarios",
        });
    }
});
exports.getUsuario = getUsuario;
const getUnUsuario = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = req.params.id;
        const usuarios = yield usuario_model_1.default.findById({ _id: id });
        res.json({
            ok: true,
            usuarios,
        });
    }
    catch (error) {
        res.status(400).json({
            ok: false,
            msg: "Error al consultar los usuarios",
        });
    }
});
exports.getUnUsuario = getUnUsuario;
const actualizarUsuario = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = req.params.id;
        const { body } = req;
        const usuarioActualizado = yield usuario_model_1.default.findByIdAndUpdate(id, body);
        res.json({
            ok: true,
            usuario: usuarioActualizado,
            msg: "Usuario Actualizado",
        });
    }
    catch (error) {
        console.error(error);
        res.status(400).json({
            ok: false,
            msg: "Error al actualizar el usuario",
        });
    }
});
exports.actualizarUsuario = actualizarUsuario;
const eliminarUsuario = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = req.params.id;
        const usuarioEliminado = yield usuario_model_1.default.findByIdAndDelete({ _id: id });
        res.json({
            ok: true,
            msg: "Usuario Eliminado",
            usuario: usuarioEliminado,
        });
    }
    catch (error) {
        console.error(error);
        res.status(400).json({
            ok: false,
            msg: "Error al eliminar el usuario",
        });
    }
});
exports.eliminarUsuario = eliminarUsuario;
//# sourceMappingURL=usuario.controller.js.map