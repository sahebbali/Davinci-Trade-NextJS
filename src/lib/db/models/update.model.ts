import { Schema, Document, model, models, Model } from "mongoose";

export interface IUpdate extends Document {
  title?: string;
  description?: string;
  date?: string;
}

const updateSchema = new Schema<IUpdate>(
  {
    title: { type: String },
    description: { type: String },
    date: { type: String },
  },
  { timestamps: true }
);

// Prevent model overwrite during hot reload
const Update: Model<IUpdate> =
  models.Update || model<IUpdate>("Update", updateSchema);

export default Update;
