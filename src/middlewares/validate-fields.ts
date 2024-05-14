import { NextFunction, Request, Response } from "express";
import { validationResult } from "express-validator";
/**
 * @api {function} validateFields() Validar Campos
 * @apiName validateFields
 * @apiGroup Middlewares
 *
 * @apiDescription Middleware que valida los campos de una solicitud utilizando express-validator. Si hay errores de validación, devuelve una respuesta de error con un código de estado 400 y una lista de errores.
 *
 * @apiParam {Object} req Objeto de solicitud de Express.
 * @apiParam {Object} res Objeto de respuesta de Express.
 * @apiParam {Function} next Función de middleware para pasar el control al siguiente middleware.
 *
 * @apiError {Boolean} ok Indica si la solicitud fue exitosa.
 * @apiError {Object} errores Objeto que contiene los errores de validación mapeados por campo.
 *
 * @apiErrorExample {json} Respuesta de error:
 *     HTTP/1.1 400 Bad Request
 *     {
 *         "ok": false,
 *         "errores": {
 *             "email": {
 *                 "value": "correo@example.com",
 *                 "msg": "El email debe ser válido",
 *                 "param": "email",
 *                 "location": "body"
 *             },
 *             "password": {
 *                 "value": "12345",
 *                 "msg": "La contraseña debe tener al menos 6 caracteres",
 *                 "param": "password",
 *                 "location": "body"
 *             }
 *         }
 *     }
 */

export const validateFields = (req: Request, res: Response, next: NextFunction)=>{
    const errores = validationResult(req);
    if(!errores.isEmpty()){
        return res.status(400).json({
            ok: false,
            errores: errores.mapped(),
        });
    }
    next();
}