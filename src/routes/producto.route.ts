import { Router } from "express";
import { actualizarProducto, crearProducto, eliminarProducto, getProductos, getUnProducto } from "../controllers/producto.controller";
import { check } from "express-validator";
import { validateFields } from "../middlewares/validate-fields";

/**
 * @api {post} /api/v1/producto Crear Producto
 * @apiName CrearProducto
 * @apiGroup Productos
 *
 * @apiDescription Ruta para crear un nuevo producto en el inventario.
 *
 * @apiParam {String} numeroLote Número de lote del producto.
 * @apiParam {String} nombreProducto Nombre del producto.
 * @apiParam {Number} Precio Precio del producto.
 * @apiParam {Number} CantidadDisponible Cantidad disponible del producto.
 *
 * @apiSuccess {Boolean} ok Indica si la solicitud fue exitosa.
 * @apiSuccess {String} msg Mensaje de éxito.
 * @apiSuccess {Object} producto Objeto que representa al producto creado.
 *
 * @apiSuccessExample {json} Respuesta exitosa:
 *     HTTP/1.1 200 OK
 *     {
 *         "ok": true,
 *         "msg": "Producto creado exitosamente",
 *         "producto": {
 *             "_id": "6128c7a378a4b525e4e56d28",
 *             "numeroLote": "123456",
 *             "nombreProducto": "Ejemplo",
 *             "Precio": 10,
 *             "CantidadDisponible": 100
 *         }
 *     }
 *
 * @apiError {Boolean} ok Indica si la solicitud fue exitosa.
 * @apiError {String} msg Mensaje de error que indica que un campo obligatorio no fue proporcionado.
 *
 * @apiErrorExample {json} Respuesta de error:
 *     HTTP/1.1 400 Bad Request
 *     {
 *         "ok": false,
 *         "msg": "El nombre del producto es obligatorio"
 *     }
 */

/**
 * @api {get} /api/v1/producto Obtener Productos
 * @apiName ObtenerProductos
 * @apiGroup Productos
 *
 * @apiDescription Ruta para obtener todos los productos del inventario.
 *
 * @apiSuccess {Boolean} ok Indica si la solicitud fue exitosa.
 * @apiSuccess {Object[]} productos Arreglo de objetos que representan los productos en el inventario.
 *
 * @apiSuccessExample {json} Respuesta exitosa:
 *     HTTP/1.1 200 OK
 *     {
 *         "ok": true,
 *         "productos": [
 *             {
 *                 "_id": "6128c7a378a4b525e4e56d28",
 *                 "numeroLote": "123456",
 *                 "nombreProducto": "Ejemplo",
 *                 "Precio": 10,
 *                 "CantidadDisponible": 100
 *             },
 *             {
 *                 "_id": "6128c7a378a4b525e4e56d29",
 *                 "numeroLote": "789012",
 *                 "nombreProducto": "Otro Ejemplo",
 *                 "Precio": 20,
 *                 "CantidadDisponible": 50
 *             }
 *         ]
 *     }
 */

/**
 * @api {get} /api/v1/producto/:id Obtener Producto por ID
 * @apiName ObtenerProductoPorID
 * @apiGroup Productos
 *
 * @apiDescription Ruta para obtener un producto específico del inventario por su ID.
 *
 * @apiParam {String} id ID único del producto.
 *
 * @apiSuccess {Boolean} ok Indica si la solicitud fue exitosa.
 * @apiSuccess {Object} producto Objeto que representa al producto solicitado.
 *
 * @apiSuccessExample {json} Respuesta exitosa:
 *     HTTP/1.1 200 OK
 *     {
 *         "ok": true,
 *         "producto": {
 *             "_id": "6128c7a378a4b525e4e56d28",
 *             "numeroLote": "123456",
 *             "nombreProducto": "Ejemplo",
 *             "Precio": 10,
 *             "CantidadDisponible": 100
 *         }
 *     }
 *
 * @apiError {Boolean} ok Indica si la solicitud fue exitosa.
 * @apiError {String} msg Mensaje de error que indica que el producto no fue encontrado.
 *
 * @apiErrorExample {json} Respuesta de error:
 *     HTTP/1.1 404 Not Found
 *     {
 *         "ok": false,
 *         "msg": "Producto no encontrado"
 *     }
 */

/**
 * @api {put} /api/v1/producto/:id Actualizar Producto
 * @apiName ActualizarProducto
 * @apiGroup Productos
 *
 * @apiDescription Ruta para actualizar un producto específico del inventario por su ID.
 *
 * @apiParam {String} id ID único del producto.
 *
 * @apiSuccess {Boolean} ok Indica si la solicitud fue exitosa.
 * @apiSuccess {Object} producto Objeto que representa al producto actualizado.
 *
 * @apiSuccessExample {json} Respuesta exitosa:
 *     HTTP/1.1 200 OK
 *     {
 *         "ok": true,
 *         "producto": {
 *             "_id": "6128c7a378a4b525e4e56d28",
 *             "numeroLote": "123456",
 *             "nombreProducto": "Ejemplo Actualizado",
 *             "Precio": 15,
 *             "CantidadDisponible": 75
 *         }
 *     }
 *
 * @apiError {Boolean} ok Indica si la solicitud fue exitosa.
 * @apiError {String} msg Mensaje de error que indica que el producto no fue encontrado.
 *
 * @apiErrorExample {json} Respuesta de error:
 *     HTTP/1.1 404 Not Found
 *     {
 *         "ok": false,
 *         "msg": "Producto no encontrado"
 *     }
 */

/**
 * @api {delete} /api/v1/producto/:id Eliminar Producto
 * @apiName EliminarProducto
 * @apiGroup Productos
 *
 * @apiDescription Ruta para eliminar un producto específico del inventario por su ID.
 *
 * @apiParam {String} id ID único del producto.
 *
 * @apiSuccess {Boolean} ok Indica si la solicitud fue exitosa.
 * @apiSuccess {String} msg Mensaje de éxito.
 * @apiSuccess {Object} producto Objeto que representa al producto eliminado.
 *
 * @apiSuccessExample {json} Respuesta exitosa:
 *     HTTP/1.1 200 OK
 *     {
 *         "ok": true,
 *         "msg": "Producto eliminado exitosamente",
 *         "producto": {
 *             "_id": "6128c7a378a4b525e4e56d28",
 *             "numeroLote": "123456",
 *             "nombreProducto": "Ejemplo",
 *             "Precio": 10,
 *             "CantidadDisponible": 100
 *         }
 *     }
 *
 * @apiError {Boolean} ok Indica si la solicitud fue exitosa.
 * @apiError {String} msg Mensaje de error que indica que el producto no fue encontrado.
 *
 * @apiErrorExample {json} Respuesta de error:
 *     HTTP/1.1 404 Not Found
 *     {
 *         "ok": false,
 *         "msg": "Producto no encontrado"
 *     }
 */


//path  /api/v1/producto
const router = Router();
router.post("/", [check("numeroLote", "El numero de lote es obligatorio").not().isEmpty(),
check("nombreProducto", "El nombre del producto es obligatorio").not().isEmpty(),
check("Precio", "El precio del producto es obligatorio").not().isEmpty(),
check("CantidadDisponible", "La Cantidad del producto es obligatorio").not().isEmpty(),
validateFields],crearProducto);
router.get("/", getProductos);
router.get("/:id", getUnProducto);
router.put("/:id", actualizarProducto);
router.delete("/:id", eliminarProducto);
export default router;