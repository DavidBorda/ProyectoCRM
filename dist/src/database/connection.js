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
exports.dbConnection = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
/**
 * @api {function} dbConnection() Conexión a la Base de Datos
 * @apiName dbConnection
 * @apiGroup Base de Datos
 *
 * @apiDescription Establece la conexión a la base de datos utilizando la URL de conexión proporcionada en la variable de entorno `DB_CONNECTION`.
 *
 * @apiSuccess {String} message Mensaje de éxito que indica que la base de datos está en línea.
 *
 * @apiSuccessExample {String} Mensaje de éxito:
 *     DB Online
 *
 * @apiError {String} message Mensaje de error que indica que hubo un problema al conectar a la base de datos.
 *
 * @apiErrorExample {String} Mensaje de error:
 *     Error en la conexion de la base de datos
 */
const dbConnection = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const dbUrl = process.env.DB_CONNECTION;
        if (!dbUrl) {
            throw new Error("Error en la conexion de la base de datos no existe url");
        }
        yield mongoose_1.default.connect(dbUrl);
        console.log("DB Online");
    }
    catch (error) {
        console.log(error);
        console.log("Error en la conexion de la base de datos");
    }
});
exports.dbConnection = dbConnection;
//# sourceMappingURL=connection.js.map