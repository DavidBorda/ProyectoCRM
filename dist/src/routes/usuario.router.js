"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const usuario_controller_1 = require("../controllers/usuario.controller");
//path  /api/v1/usuario
const router = (0, express_1.Router)();
router.post("/", usuario_controller_1.crearUsuario);
router.get("/", usuario_controller_1.getUsuario);
router.get("/:id", usuario_controller_1.getUnUsuario);
router.put("/:id", usuario_controller_1.actualizarUsuario);
router.delete("/:id", usuario_controller_1.eliminarUsuario);
exports.default = router;
//# sourceMappingURL=usuario.router.js.map