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
class Server {
    constructor() {
        this.apiPaths = {
            usuario: "/api/v1/usuario",
            producto: "/api/v1/producto",
            login: "/api/v1/login",
        };
        this.app = (0, express_1.default)();
        this.port = process.env.PORT || "3000";
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
    middlewares() {
        this.app.use((0, cors_1.default)());
        //Lectura del Body
        this.app.use(express_1.default.json());
        this.miPrimerAPI();
    }
    routes() {
        this.app.use(this.apiPaths.usuario, usuario_route_1.default);
        this.app.use(this.apiPaths.producto, producto_route_1.default);
        this.app.use(this.apiPaths.login, auth_route_1.default);
    }
    listen() {
        this.app.listen(this.port, () => {
            console.log("servidor corriendo por el puerto", this.port);
        });
    }
}
exports.default = Server;
//# sourceMappingURL=server.js.map