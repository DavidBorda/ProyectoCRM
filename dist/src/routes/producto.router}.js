"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const producto_controller_1 = require("../controllers/producto.controller");
//path  /api/v1/producto
const router = (0, express_1.Router)();
router.post("/", producto_controller_1.crearProducto);
router.get("/", producto_controller_1.getProductos);
router.get("/:id", producto_controller_1.getUnProducto);
router.put("/:id", producto_controller_1.actualizarProducto);
router.delete("/:id", producto_controller_1.eliminarProducto);
exports.default = router;
//# sourceMappingURL=producto.router%7D.js.map