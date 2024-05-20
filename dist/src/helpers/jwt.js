"use strict";
/**
 * @api {function} generateJWT() Generar Token JWT
 * @apiName generateJWT
 * @apiGroup JWT
 *
 * @apiDescription Genera un token JSON Web Token (JWT) utilizando el ID de usuario y el email proporcionados, con una expiración opcional y un secreto JWT opcional.
 *
 * @apiParam {String} _id ID del usuario.
 * @apiParam {String} [email=""] Email del usuario.
 * @apiParam {String} [expiresIn="12H"] Caducidad del token en formato válido para `jsonwebtoken` (por ejemplo, "2h", "7d", "30d").
 * @apiParam {String} [jwtSecret=process.env.JWTSECRET] Secreto utilizado para firmar el token JWT. Se obtiene de la variable de entorno `JWTSECRET` de forma predeterminada.
 *
 * @apiSuccess {String} token Token JWT generado.
 *
 * @apiSuccessExample {String} Token generado:
 *     eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjEyMzQ1Njc4OTAiLCJlbWFpbCI6InVzZXJAZXhhbXBsZS5jb20iLCJpYXQiOjE2MTg5MjI0NzQsImV4cCI6MTYxODkyMjQ4NX0.9kViI5bS7D2VoPDo7I2q8D67PE3bH8Vv-6J7dWrDDYc
 *
 * @apiError {String} message Mensaje de error que indica que no se pudo generar el token.
 *
 * @apiErrorExample {String} Mensaje de error:
 *     No se puede generar el token
 */
Object.defineProperty(exports, "__esModule", { value: true });
const jwt = require("jsonwebtoken");
const generateJWT = (_id, email = "", expiresIn = "12H", jwtSecret = process.env.JWTSECRET) => {
    return new Promise((resolve, reject) => {
        const payload = {
            _id,
            email,
        };
        jwt.sign(payload, jwtSecret, {
            expiresIn: expiresIn,
        }, (error, token) => {
            if (error) {
                console.log(error);
                reject("No se puede generar el token");
            }
            else
                resolve(token);
        });
    });
};
exports.default = generateJWT;
//# sourceMappingURL=jwt.js.map