import mongoose, { Schema, Document, model, models, Model } from "mongoose";

export interface ISupportTicket extends Document {
  identity?: string;
  userId?: string;
  fullName?: string;
  email?: string;
  purpose?: string;
  previous_ticket_reff?: string;
  image?: string;
  question?: string;
  answer?: string;
  date?: string;
  time?: string;
  isResponse?: boolean;
  createdAt: Date;
  updatedAt: Date;
}

const supportTicketSchema = new Schema<ISupportTicket>(
  {
    identity: { type: String },
    userId: { type: String },
    fullName: { type: String },
    email: { type: String },
    purpose: { type: String },
    previous_ticket_reff: { type: String },
    image: { type: String },
    question: { type: String },
    answer: { type: String },
    date: { type: String },
    time: { type: String },
    isResponse: { type: Boolean, default: false },
  },
  { timestamps: true }
);

// Prevent model overwrite during hot reload
const SupportTicket: Model<ISupportTicket> =
  models.SupportTicket ||
  model<ISupportTicket>("SupportTicket", supportTicketSchema);

export default SupportTicket;
