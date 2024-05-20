"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
/**
 * @api {object} ProductoModel Modelo de Producto
 * @apiName ProductoModel
 * @apiGroup Modelos
 *
 * @apiDescription Modelo de Mongoose para representar un producto en el inventario.
 *
 * @apiParam {String} numeroLote Número de lote del producto.
 * @apiParam {String} nombreProducto Nombre del producto.
 * @apiParam {Number} Precio Precio del producto.
 * @apiParam {Number} CantidadDisponible Cantidad disponible del producto.
 * @apiParam {Date} [fechaIngreso=Date.now()] Fecha de ingreso del producto (valor por defecto: fecha actual).
 */
const ProductoSchema = new mongoose_1.Schema({
    numeroLote: {
        type: String,
        required: true,
    },
    nombreProducto: {
        type: String,
        required: true,
    },
    Precio: {
        type: Number,
        required: true,
    },
    CantidadDisponible: {
        type: Number,
        required: true,
    },
    fechaIngreso: {
        type: Date,
        default: Date.now(),
    },
});
const ProductoModel = (0, mongoose_1.model)("productos", ProductoSchema);
exports.default = ProductoModel;
//# sourceMappingURL=producto.model.js.map