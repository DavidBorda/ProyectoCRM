"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const connection_1 = require("./database/connection");
const cors_1 = __importDefault(require("cors"));
const usuario_route_1 = __importDefault(require("./routes/usuario.route"));
const producto_route_1 = __importDefault(require("./routes/producto.route"));
const auth_route_1 = __importDefault(require("./routes/auth.route"));
/**
 * Clase que representa el servidor de la aplicación.
 * @class
 */
class Server {
    /**
    * Crea una instancia del servidor.
    * @constructor
    */
    constructor() {
        // Inicializa la aplicación Express
        this.apiPaths = {
            usuario: "/api/v1/usuario",
            producto: "/api/v1/producto",
            login: "/api/v1/login",
        };
        this.app = (0, express_1.default)();
        // Define el puerto del servidor
        this.port = process.env.PORT || "3000";
        // Establece la conexión a la base de datos
        // Base de datos
        (0, connection_1.dbConnection)();
        //Metodos iniciales
        this.middlewares();
        //rutas
        this.routes();
    }
    miPrimerAPI() {
        this.app.get("/", (req, res) => res.status(200).json({ msg: "Api funcionando" }));
    }
    /**
 * Configura los middlewares iniciales de la aplicación.
 * @private
 */
    middlewares() {
        // Habilita CORS para permitir solicitudes desde cualquier origen
        this.app.use((0, cors_1.default)());
        //Lectura del Body
        // Parsea el cuerpo de las solicitudes entrantes como JSON
        this.app.use(express_1.default.json());
        this.miPrimerAPI();
    }
    /**
        * Configura las rutas de la aplicación.
        * @private
        */
    routes() {
        // Asocia las rutas de usuarios a la ruta /api/v1/usuario
        this.app.use(this.apiPaths.usuario, usuario_route_1.default);
        // Asocia las rutas de productos a la ruta /api/v1/producto
        this.app.use(this.apiPaths.producto, producto_route_1.default);
        // Asocia las rutas de autenticación a la ruta /api/v1/login
        this.app.use(this.apiPaths.login, auth_route_1.default);
    }
    /**
       * Inicia el servidor y lo hace escuchar en el puerto especificado.
       * @public
       */
    listen() {
        this.app.listen(this.port, () => {
            console.log("servidor corriendo por el puerto", this.port);
        });
    }
}
/**
 * Módulo que exporta la clase Server.
 * @module Server
 */
exports.default = Server;
//# sourceMappingURL=server.js.map