import express, {Application, Request, Response} from "express";
import { dbConnection } from "./database/connection";
import cors from "cors";
import usuarioRoutes from "./routes/usuario.route";
import productoRoutes from "./routes/producto.route";
import authRoutes from "./routes/auth.route";
import interactionRoute from "./routes/interaction.route";
/**
 * Clase que representa el servidor de la aplicación.
 * @class
 */
class Server {
    private app: Application;
    private port: String;
    private apiPaths = {
        usuario: "/api/v1/usuario",
        producto: "/api/v1/producto",
        login: "/api/v1/login",
        interaction: "/api/v1/interaction",
    };
     /**
     * Crea una instancia del servidor.
     * @constructor
     */
    constructor() {
                // Inicializa la aplicación Express

        this.app = express();
           // Define el puerto del servidor
        this.port = process.env.PORT || "3000";
          // Establece la conexión a la base de datos
        // Base de datos
        dbConnection();
        //Metodos iniciales
        this.middlewares();
        //rutas
        this.routes();
    }
    miPrimerAPI() {
        this.app.get("/", (req: Request ,res: Response) => 
            res.status(200).json({ msg: "Api funcionando" })
    );
    }
        /**
     * Configura los middlewares iniciales de la aplicación.
     * @private
     */
middlewares(){
      // Habilita CORS para permitir solicitudes desde cualquier origen
    this.app.use(cors());

    //Lectura del Body
       // Parsea el cuerpo de las solicitudes entrantes como JSON
    this.app.use(express.json());
    this.miPrimerAPI();
}
 /**
     * Configura las rutas de la aplicación.
     * @private
     */
routes(): void{
    // Asocia las rutas de usuarios a la ruta /api/v1/usuario
    this.app.use(this.apiPaths.usuario, usuarioRoutes);
      // Asocia las rutas de productos a la ruta /api/v1/producto
    this.app.use(this.apiPaths.producto, productoRoutes);
           // Asocia las rutas de autenticación a la ruta /api/v1/login
    this.app.use(this.apiPaths.login, authRoutes);
    this.app.use(this.apiPaths.interaction, interactionRoute);
}
  /**
     * Inicia el servidor y lo hace escuchar en el puerto especificado.
     * @public
     */

    listen(): void {
        this.app.listen(this.port, () => {
            console.log("servidor corriendo por el puerto", this.port);
        });
    }
}
/**
 * Módulo que exporta la clase Server.
 * @module Server
 */
       
export default Server;