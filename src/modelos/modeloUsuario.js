import { Schema, model } from "mongoose";

const esquemaUsuario = new Schema(
    {
        username: { type: String, required: true},
        password: {type: String, required: true},
        nombre: {type: String, required: true},
                
    },
    { versionKey: false, timestamps: true }
);

export default model('Usuario', esquemaUsuario);