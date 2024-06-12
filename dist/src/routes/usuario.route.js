"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const validate_jwt_1 = require("./../middlewares/validate-jwt");
const express_1 = require("express");
const usuario_controller_1 = require("../controllers/usuario.controller");
const express_validator_1 = require("express-validator");
const validate_fields_1 = require("../middlewares/validate-fields");
/**
 * @api {post} /api/v1/usuario Crear Usuario
 * @apiName CrearUsuario
 * @apiGroup Usuarios
 *
 * @apiDescription Ruta para crear un nuevo usuario en el sistema.
 *
 * @apiParam {String} nombre Nombre del usuario.
 * @apiParam {String} numeroDocumento Número de documento del usuario.
 * @apiParam {String} email Correo electrónico del usuario.
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
 *             "nombre": "Usuario Ejemplo",
 *             "numeroDocumento": "123456789",
 *             "email": "usuario@example.com",
 *             "rol": "User",
 *             "createAt": "2022-05-14T12:00:00.000Z"
 *         }
 *     }
 *
 * @apiError {Boolean} ok Indica si la solicitud fue exitosa.
 * @apiError {String} msg Mensaje de error que indica que un campo obligatorio no fue proporcionado o el correo electrónico no es válido.
 *
 * @apiErrorExample {json} Respuesta de error:
 *     HTTP/1.1 400 Bad Request
 *     {
 *         "ok": false,
 *         "msg": "El correo electronico es obligatorio"
 *     }
 */
/**
 * @api {get} /api/v1/usuario Obtener Usuarios
 * @apiName ObtenerUsuarios
 * @apiGroup Usuarios
 *
 * @apiDescription Ruta para obtener todos los usuarios del sistema.
 *
 * @apiSuccess {Boolean} ok Indica si la solicitud fue exitosa.
 * @apiSuccess {Object[]} usuarios Arreglo de objetos que representan los usuarios en el sistema.
 *
 * @apiSuccessExample {json} Respuesta exitosa:
 *     HTTP/1.1 200 OK
 *     {
 *         "ok": true,
 *         "usuarios": [
 *             {
 *                 "_id": "6128c7a378a4b525e4e56d28",
 *                 "nombre": "Usuario Ejemplo",
 *                 "numeroDocumento": "123456789",
 *                 "email": "usuario@example.com",
 *                 "rol": "User",
 *                 "createAt": "2022-05-14T12:00:00.000Z"
 *             },
 *             {
 *                 "_id": "6128c7a378a4b525e4e56d29",
 *                 "nombre": "Otro Usuario",
 *                 "numeroDocumento": "987654321",
 *                 "email": "otro@example.com",
 *                 "rol": "User",
 *                 "createAt": "2022-05-14T12:00:00.000Z"
 *             }
 *         ]
 *     }
 */
/**
 * @api {get} /api/v1/usuario/:id Obtener Usuario por ID
 * @apiName ObtenerUsuarioPorID
 * @apiGroup Usuarios
 *
 * @apiDescription Ruta para obtener un usuario específico del sistema por su ID.
 *
 * @apiParam {String} id ID único del usuario.
 *
 * @apiSuccess {Boolean} ok Indica si la solicitud fue exitosa.
 * @apiSuccess {Object} usuario Objeto que representa al usuario solicitado.
 *
 * @apiSuccessExample {json} Respuesta exitosa:
 *     HTTP/1.1 200 OK
 *     {
 *         "ok": true,
 *         "usuario": {
 *             "_id": "6128c7a378a4b525e4e56d28",
 *             "nombre": "Usuario Ejemplo",
 *             "numeroDocumento": "123456789",
 *             "email": "usuario@example.com",
 *             "rol": "User",
 *             "createAt": "2022-05-14T12:00:00.000Z"
 *         }
 *     }
 *
 * @apiError {Boolean} ok Indica si la solicitud fue exitosa.
 * @apiError {String} msg Mensaje de error que indica que el usuario no fue encontrado.
 *
 * @apiErrorExample {json} Respuesta de error:
 *     HTTP/1.1 404 Not Found
 *     {
 *         "ok": false,
 *         "msg": "Usuario no encontrado"
 *     }
 */
/**
 * @api {put} /api/v1/usuario/:id Actualizar Usuario
 * @apiName ActualizarUsuario
 * @apiGroup Usuarios
 *
 * @apiDescription Ruta para actualizar un usuario específico del sistema por su ID.
 *
 * @apiParam {String} id ID único del usuario.
 *
 * @apiSuccess {Boolean} ok Indica si la solicitud fue exitosa.
 * @apiSuccess {Object} usuario Objeto que representa al usuario actualizado.
 *
 * @apiSuccessExample {json} Respuesta exitosa:
 *     HTTP/1.1 200 OK
 *     {
 *         "ok": true,
 *         "usuario": {
 *             "_id": "6128c7a378a4b525e4e56d28",
 *             "nombre": "Usuario Actualizado",
 *             "numeroDocumento": "123456789",
 *             "email": "usuario@example.com",
 *             "rol": "User",
 *             "createAt": "2022-05-14T12:00:00.000Z"
 *         }
 *     }
 *
 * @apiError {Boolean} ok Indica si la solicitud fue exitosa.
 * @apiError {String} msg Mensaje de error que indica que el usuario no fue encontrado.
 *
 * @apiErrorExample {json} Respuesta de error:
 *     HTTP/1.1 404 Not Found
 *     {
 *         "ok": false,
 *         "msg": "Usuario no encontrado"
 *     }
 */
/**
 * @api {delete} /api/v1/usuario/:id Eliminar Usuario
 * @apiName EliminarUsuario
 * @apiGroup Usuarios
 *
 * @apiDescription Ruta para eliminar un usuario específico del sistema por su ID.
 *
 * @apiParam {String} id ID único del usuario.
 *
 * @apiSuccess {Boolean} ok Indica si la solicitud fue exitosa.
 * @apiSuccess {String} msg Mensaje de éxito.
 * @apiSuccess {Object} usuario Objeto que representa al usuario eliminado.
 *
 * @apiSuccessExample {json} Respuesta exitosa:
 *     HTTP/1.1 200 OK
 *     {
 *         "ok": true,
 *         "msg": "Usuario eliminado exitosamente",
 *         "usuario": {
 *             "_id": "6128c7a378a4b525e4e56d28",
 *             "nombre": "Usuario Ejemplo",
 *             "numeroDocumento": "123456789",
 *             "email": "usuario@example.com",
 *             "rol": "User",
 *             "createAt": "2022-05-14T12:00:00.000Z"
 *         }
 *     }
 *
 * @apiError {Boolean} ok Indica si la solicitud fue exitosa.
 * @apiError {String} msg Mensaje de error que indica que el usuario no fue encontrado.
 *
 * @apiErrorExample {json} Respuesta de error:
 *     HTTP/1.1 404 Not Found
 *     {
 *         "ok": false,
 *         "msg": "Usuario no encontrado"
 *     }
 */
//path  /api/v1/usuario
const router = (0, express_1.Router)();
router.post("/", [
    (0, express_validator_1.check)("nombre", "El nombre es obligatorio").not().isEmpty(),
    (0, express_validator_1.check)("numeroDocumento", "El numero de documento es obligatorio")
        .not()
        .isEmpty(),
    (0, express_validator_1.check)("email", "El correo electronico es obligatorio")
        .not()
        .isEmpty()
        .isEmail(),
    validate_fields_1.validateFields,
], usuario_controller_1.crearUsuario);
router.get("/", usuario_controller_1.getUsuario);
router.get("/:id", validate_jwt_1.validateJWT, usuario_controller_1.getUnUsuario);
router.put("/:id", validate_jwt_1.validateJWT, usuario_controller_1.actualizarUsuario);
router.delete("/:id", validate_jwt_1.validateJWT, usuario_controller_1.eliminarUsuario);
exports.default = router;
//# sourceMappingURL=usuario.route.js.map