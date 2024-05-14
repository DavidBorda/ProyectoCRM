import { Request, Response } from "express";
import ProductoModel from "../models/producto.model";

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

export const crearProducto = async(req: Request, res: Response)=>{
    const {body} = req;
    try {
        const newProducto = new ProductoModel({
            ...body,
        });
        const productoCreado = await newProducto.save();
        res.status(200).json({
            ok:true,
            msg:"Producto creado exitosamente",
            producto: productoCreado,
        })        
    } catch (error) {
        console.error(error);
        res.status(400).json({
            ok:false,
            error,
            msg: "Error al crear el producto, comuniquese con el administrador",
        });
        
    }
};
export const getProductos = async(req: Request, res: Response)=>{
    try {
        const productos = await ProductoModel.find();
        res.json({
            ok:true,
            productos,
        })
    } catch (error) {
        res.status(400).json({
            ok: false,
            msg: "Error al consultar los usuarios",
        })
        
    }
};

export const getUnProducto = async(req: Request, res: Response)=>{
    try {
        const id = req.params.id;
        const producto = await ProductoModel.findById({_id: id});
        res.json({
            ok:true,
             producto,
        });
    } catch (error) {
        res.status(400).json({
            ok: false,
            msg: "Error al consultar los productos",
        });
        
    }
};
export const actualizarProducto = async(req: Request, res: Response)=>{
    try {
        const id = req.params.id;
        const {body} = req;
        const productoActualizado = await ProductoModel.findByIdAndUpdate(id, body);
        res.json({
            ok:true,
            productoActualizado,
            msg: "Producto Actualizado",
        });
    } catch (error) {
        console.error(error);
        res.status(400).json({
            ok: false,
            msg: "Error al actualizar el producto",
        });
        
    }
};

export const eliminarProducto = async(req: Request, res: Response)=>{
    try {
        const id = req.params.id;
        const productoEliminado = await ProductoModel.findByIdAndDelete({_id: id});
        res.json({
            ok:true,
            msg: "Producto Eliminado",
            producto: productoEliminado,
        });
    } catch (error) {
        console.error(error);
        res.status(400).json({
            ok: false,
            msg: "Error al eliminar el producto",
        });
        
    }
};

