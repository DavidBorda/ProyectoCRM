
import {Response} from "express";
import { CustomRequest } from "../middlewares/validate-jwt";
import { InteraccionModel } from "../models/interaction.model";

export const crearInteraccion = async (req: CustomRequest, res: Response)=>{
    const id = req._id;
    const body = req.body;

    const {descripcion, cliente} = req.body;
    try {
        const interaction = new InteraccionModel({
            usuario: id,
            ...body,
        });

        const newInteraction = await interaction.save();
        
        res.status(200).json({
            ok:true,
            msg:"Interaccion creada",
            interaction: newInteraction,
        });       
    } catch (error) {
        console.error(error);
        res.status(400).json({
            ok:false,
            error,
            msg: "Error al crear la inteaccion, comuniquese con el administrador",
        });
        
    }



};