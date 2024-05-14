import { Model, Schema, model } from "mongoose";

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


const ProductoSchema = new Schema({
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
const ProductoModel: Model<any> = model("productos", ProductoSchema);
export default ProductoModel;