"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const express_validator_1 = require("express-validator");
const auth_controller_1 = require("../controllers/auth.controller");
const validate_fields_1 = require("../middlewares/validate-fields");
const validate_jwt_1 = require("../middlewares/validate-jwt");
/**
 * @api {post} /api/v1/login Iniciar Sesión
 * @apiName IniciarSesion
 * @apiGroup Autenticación
 *
 * @apiDescription Ruta para iniciar sesión en el sistema.
 *
 * @apiParam {String} email Email del usuario.
 * @apiParam {String} password Contraseña del usuario.
 *
 * @apiSuccess {Boolean} ok Indica si la solicitud fue exitosa.
 * @apiSuccess {Object} usuario Objeto que representa al usuario autenticado.
 * @apiSuccess {String} token Token de autenticación JWT generado.
 *
 * @apiSuccessExample {json} Respuesta exitosa:
 *     HTTP/1.1 200 OK
 *     {
 *         "ok": true,
 *         "usuario": {
 *             "_id": "6128c7a378a4b525e4e56d28",
 *             "email": "usuario@example.com",
 *             "nombre": "Usuario Ejemplo"
 *         },
 *         "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjEyMzQ1Njc4OTAiLCJlbWFpbCI6InVzZXJAZXhhbXBsZS5jb20iLCJpYXQiOjE2MTg5MjI0NzQsImV4cCI6MTYxODkyMjQ4NX0.9kViI5bS7D2VoPDo7I2q8D67PE3bH8Vv-6J7dWrDDYc"
 *     }
 *
 * @apiError {Boolean} ok Indica si la solicitud fue exitosa.
 * @apiError {String} msg Mensaje de error que indica que el email es obligatorio.
 * @apiError {String} msg Mensaje de error que indica que el password es obligatorio.
 *
 * @apiErrorExample {json} Respuesta de error:
 *     HTTP/1.1 400 Bad Request
 *     {
 *         "ok": false,
 *         "errores": {
 *             "email": {
 *                 "msg": "El email es obligatorio"
 *             },
 *             "password": {
 *                 "msg": "El password es obligatorio"
 *             }
 *         }
 *     }
 */
const router = (0, express_1.Router)();
router.post("/", [
    (0, express_validator_1.check)("email", "El email es obligatorio").isEmail(),
    (0, express_validator_1.check)("password", "El password es obligatorio").not().isEmpty(),
    validate_fields_1.validateFields
], auth_controller_1.login);
router.post("/olvidocontrasena", [
    (0, express_validator_1.check)("email", "El email es obligatorio").not().isEmpty().isEmail(),
    (0, express_validator_1.check)("numeroDocumento", "El password es obligatorio").not().isEmpty(),
    validate_fields_1.validateFields,
], auth_controller_1.olvidoContrasena);
router.put("/cambiocontrasena", validate_jwt_1.validateJWTPass, [
    (0, express_validator_1.check)("password", "El password es obligatorio").not().isEmpty(),
], auth_controller_1.cambioContrasena);
exports.default = router;
//path  /api/v1/login
//# sourceMappingURL=auth.route.js.map