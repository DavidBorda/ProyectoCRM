"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const producto_controller_1 = require("../controllers/producto.controller");
const express_validator_1 = require("express-validator");
const validate_fields_1 = require("../middlewares/validate-fields");
//path  /api/v1/producto
const router = (0, express_1.Router)();
router.post("/", [(0, express_validator_1.check)("numeroLote", "El numero de lote es obligatorio").not().isEmpty(),
    (0, express_validator_1.check)("nombreProducto", "El nombre del producto es obligatorio").not().isEmpty(),
    (0, express_validator_1.check)("Precio", "El precio del producto es obligatorio").not().isEmpty(),
    (0, express_validator_1.check)("CantidadDisponible", "La Cantidad del producto es obligatorio").not().isEmpty(),
    validate_fields_1.validateFields], producto_controller_1.crearProducto);
router.get("/", producto_controller_1.getProductos);
router.get("/:id", producto_controller_1.getUnProducto);
router.put("/:id", producto_controller_1.actualizarProducto);
router.delete("/:id", producto_controller_1.eliminarProducto);
exports.default = router;
//# sourceMappingURL=producto.route.js.map