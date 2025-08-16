import mongoose, { Schema, Document, Model } from "mongoose";

export interface IContact extends Document {
    firstName: String,
    lastName: String,
    email: String,
    subject: String,
    message: String
    createdAt: Date
}

const ContactSchema: Schema<IContact> = new Schema(
    {
        firstName:{
            type: String,
            required: true
        },
        lastName:{
            type: String,
            required: true
        },
        email:{
            type: String,
            required: true
        },
        subject:{
            type: String,
            required: true
        },
        message:{
            type: String,
            required: true
        }
    },
    { timestamps: true }
);

export const Contact: Model<IContact> =
    mongoose.models.Contact || mongoose.model<IContact>("Contact", ContactSchema);