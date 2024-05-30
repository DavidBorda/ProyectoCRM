import { Model, Schema, model } from "mongoose";

const InteractionSchema = new Schema({
    descripcion: {
        type: String,
        required: true,
    },
    createAt: {
        type: Date,
        defatult: Date.now(),
    },
    usuario: {type: Schema.Types.ObjectId, ref: "usuario", require: true},
    cliente: {type: Schema.Types.ObjectId, ref: "usuario", require: false},
});

export const InteraccionModel: Model<any> = model(
    "interaccion", 
    InteractionSchema
);