"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateJWTPass = exports.validateJWT = void 0;
/**
 * @api {function} validateJWT() Validar Token JWT
 * @apiName validateJWT
 * @apiGroup Middlewares
 *
 * @apiDescription Middleware que valida un token JSON Web Token (JWT) en la cabecera de la solicitud. Si el token es válido, agrega el ID de usuario decodificado a la solicitud (`req._id`) y pasa el control al siguiente middleware. Si el token es inválido o no está presente, devuelve una respuesta de error con un código de estado 401.
 *
 * @apiParam {Object} req Objeto de solicitud de Express.
 * @apiParam {Object} res Objeto de respuesta de Express.
 * @apiParam {Function} next Función de middleware para pasar el control al siguiente middleware.
 *
 * @apiError {Boolean} ok Indica si la solicitud fue exitosa.
 * @apiError {String} msg Mensaje de error que indica que no hay token en la petición o que el token es inválido.
 *
 * @apiErrorExample {json} Respuesta de error:
 *     HTTP/1.1 401 Unauthorized
 *     {
 *         "ok": false,
 *         "msg": "No hay token en la petición"
 *     }
 */
const jwt = require("jsonwebtoken");
const validateJWT = (req, res, next) => {
    const token = req.header("x-token");
    if (!token) {
        return res.status(401).json({
            ok: false,
            msg: "No hay token en la peticion"
        });
    }
    try {
        //firma
        const { _id } = jwt.verify(token, process.env.JWTSECRET);
        req._id = _id;
        next();
    }
    catch (error) {
        return res.status(401).json({
            ok: false,
            msg: "Token invalido"
        });
    }
};
exports.validateJWT = validateJWT;
const validateJWTPass = (req, res, next) => {
    const token = req.header("x-token-pass");
    if (!token) {
        return res.status(401).json({
            ok: false,
            msg: "No hay token en la petición",
        });
    }
    try {
        const { _id } = jwt.verify(token, process.env.JWT_SECRET_PASS);
        req._id = _id;
        next();
    }
    catch (error) {
        return res.status(401).json({
            ok: false,
            msg: "Token invalido",
        });
    }
};
exports.validateJWTPass = validateJWTPass;
//# sourceMappingURL=validate-jwt.js.map