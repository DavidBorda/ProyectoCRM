import { Model, Schema, Types, model } from "mongoose";

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

interface Distribuidor {
    nit : string;
    razonSociak: string;
    telefono: number;
    direccion : string;
}
 
interface Opiniones{
    comentarios: string;
    calificacion: number;
    fecha?: Date;
}
interface ProductoInterface{
    numeroLote: string;
    nombreProducto: string;
    Precio: number;
    CantidadDisponible: number;
    distribuidor: Distribuidor;
    opiniones: Opiniones;
    usuario: Types.ObjectId;
    fechaIngreso: Date;
}



const ProductoSchema = new Schema<ProductoInterface>({
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
    distribuidor: {type: Object, require: true},
    opiniones: {type: Object},
    CantidadDisponible: {
        type: Number,
        required: true,
    },
    usuario: {type: Schema.Types.ObjectId, ref: "usuario", require: true},
    fechaIngreso: {
        type: Date,
        default: Date.now(),
    },

});
const ProductoModel: Model<ProductoInterface> = model<ProductoInterface>("productos", ProductoSchema);
export default ProductoModel;