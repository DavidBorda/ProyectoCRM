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
Object.defineProperty(exports, "__esModule", { value: true });
exports.crearInteraccion = void 0;
const interaction_model_1 = require("../models/interaction.model");
const crearInteraccion = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req._id;
    const body = req.body;
    const { descripcion, cliente } = req.body;
    try {
        const interaction = new interaction_model_1.InteraccionModel(Object.assign({ usuario: id }, body));
        const newInteraction = yield interaction.save();
        res.status(200).json({
            ok: true,
            msg: "Interaccion creada",
            interaction: newInteraction,
        });
    }
    catch (error) {
        console.error(error);
        res.status(400).json({
            ok: false,
            error,
            msg: "Error al crear la inteaccion, comuniquese con el administrador",
        });
    }
});
exports.crearInteraccion = crearInteraccion;
//# sourceMappingURL=interaction.controller.js.map