import { Router } from "express";
import { validateJWT } from "../middlewares/validate-jwt";
import { crearInteraccion } from "../controllers/interaction.controller";
import { check } from "express-validator";

const router = Router();

router.post("/", 
validateJWT,
[check ("descripcion","La descipcion es obligatoria").not().isEmpty()],
crearInteraccion);
export default router;