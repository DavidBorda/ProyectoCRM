"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const express_validator_1 = require("express-validator");
const auth_controller_1 = require("../controllers/auth.controller");
const validate_fields_1 = require("../middlewares/validate-fields");
//path  /api/v1/login
const router = (0, express_1.Router)();
router.post("/", [
    (0, express_validator_1.check)("email", "El email es obligatorio").isEmail(),
    (0, express_validator_1.check)("password", "El password es obligatorio").not().isEmpty(),
    validate_fields_1.validateFields
], auth_controller_1.login);
exports.default = router;
//# sourceMappingURL=auth.route.js.map