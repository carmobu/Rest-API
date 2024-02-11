import { Schema, model } from 'mongoose';

const esquemaRegalo = new Schema(
  {
    id: { type: String, required: true },
    peso: { type: String, required: true },
    nota: { type: String, required: true },
  },
  { versionKey: false, timestamps: true }
);

export default model('Regalo', esquemaRegalo);