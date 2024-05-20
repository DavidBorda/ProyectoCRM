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
exports.eliminarProducto = exports.actualizarProducto = exports.getUnProducto = exports.getProductos = exports.crearProducto = void 0;
const producto_model_1 = __importDefault(require("../models/producto.model"));
/**
 * @api {post} /productos Crear Producto
 * @apiName CrearProducto
 * @apiGroup Productos
 *
 * @apiDescription Crea un nuevo producto en el inventario.
 *
 * @apiParam {Object} body Objeto que contiene los datos del producto.
 * @apiParam {String} body.numero_lote Número de lote del producto.
 * @apiParam {String} body.nombre Nombre del producto.
 * @apiParam {Number} body.precio Precio del producto.
 * @apiParam {Number} body.cantidad_disponible Cantidad disponible del producto.
 * @apiParam {String} body.fecha_ingreso Fecha de ingreso del producto.
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
 *             "numero_lote": "1234",
 *             "nombre": "Producto de ejemplo",
 *             "precio": 20,
 *             "cantidad_disponible": 100,
 *             "fecha_ingreso": "2024-05-14T09:00:00.000Z"
 *         }
 *     }
 *
 * @apiError {Boolean} ok Indica si la solicitud fue exitosa.
 * @apiError {String} msg Mensaje de error.
 *
 * @apiErrorExample {json} Respuesta de error:
 *     HTTP/1.1 400 Bad Request
 *     {
 *         "ok": false,
 *         "msg": "Error al crear el producto, comuniquese con el administrador"
 *     }
 */
const crearProducto = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { body } = req;
    try {
        const newProducto = new producto_model_1.default(Object.assign({}, body));
        const productoCreado = yield newProducto.save();
        res.status(200).json({
            ok: true,
            msg: "Producto creado exitosamente",
            producto: productoCreado,
        });
    }
    catch (error) {
        console.error(error);
        res.status(400).json({
            ok: false,
            error,
            msg: "Error al crear el producto, comuniquese con el administrador",
        });
    }
});
exports.crearProducto = crearProducto;
const getProductos = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const productos = yield producto_model_1.default.find();
        res.json({
            ok: true,
            productos,
        });
    }
    catch (error) {
        res.status(400).json({
            ok: false,
            msg: "Error al consultar los usuarios",
        });
    }
});
exports.getProductos = getProductos;
const getUnProducto = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = req.params.id;
        const producto = yield producto_model_1.default.findById({ _id: id });
        res.json({
            ok: true,
            producto,
        });
    }
    catch (error) {
        res.status(400).json({
            ok: false,
            msg: "Error al consultar los productos",
        });
    }
});
exports.getUnProducto = getUnProducto;
const actualizarProducto = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = req.params.id;
        const { body } = req;
        const productoActualizado = yield producto_model_1.default.findByIdAndUpdate(id, body);
        res.json({
            ok: true,
            productoActualizado,
            msg: "Producto Actualizado",
        });
    }
    catch (error) {
        console.error(error);
        res.status(400).json({
            ok: false,
            msg: "Error al actualizar el producto",
        });
    }
});
exports.actualizarProducto = actualizarProducto;
const eliminarProducto = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = req.params.id;
        const productoEliminado = yield producto_model_1.default.findByIdAndDelete({ _id: id });
        res.json({
            ok: true,
            msg: "Producto Eliminado",
            producto: productoEliminado,
        });
    }
    catch (error) {
        console.error(error);
        res.status(400).json({
            ok: false,
            msg: "Error al eliminar el producto",
        });
    }
});
exports.eliminarProducto = eliminarProducto;
//# sourceMappingURL=producto.controller.js.map