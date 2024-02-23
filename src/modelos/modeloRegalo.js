import { Schema, model } from 'mongoose';

const esquemaRegalo = new Schema(
  {
    id: { type: String, required: true },
    peso: { type: String, required: true },
    nota: { type: String, required: true },
    biceps: { type: Number, required: false },
    cintura: { type: Number, required: false },
    muslos: { type: Number, required: false },
    cadera: { type: Number, required: false },
  },
  { versionKey: false, timestamps: true }
);

export default model('Regalo', esquemaRegalo);