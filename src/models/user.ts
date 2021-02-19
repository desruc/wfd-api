import { Document, model, Schema } from 'mongoose';

export interface UserBase {
  auth0Id: string;
}

export interface UserDocument extends UserBase, Document {
  id: string;
}

const User: Schema<UserDocument> = new Schema(
  {
    auth0Id: { type: String, required: true }
  },
  { toObject: { virtuals: true }, toJSON: { virtuals: true }, timestamps: true }
);

export default model<UserDocument>('User', User);
