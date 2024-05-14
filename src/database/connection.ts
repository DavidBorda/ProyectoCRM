import mongoose from "mongoose";
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

export const dbConnection = async()=>{
    try {
        const dbUrl = process.env.DB_CONNECTION;
        if(!dbUrl){
            throw new Error("Error en la conexion de la base de datos no existe url");
        }
        await mongoose.connect(dbUrl);
        console.log("DB Online");
    } catch (error) {
        console.log(error);
        console.log("Error en la conexion de la base de datos");        
    }

}