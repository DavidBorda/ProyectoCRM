"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
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