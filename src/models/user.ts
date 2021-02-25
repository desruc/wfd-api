import { Document, model, Schema } from 'mongoose';

export interface UserBase {
  auth0Id: string;
  firstName?: string;
  lastName?: string;
}

export interface UserDocument extends UserBase, Document {
  id: string;
  fullName?: string;
}

const User: Schema<UserDocument> = new Schema(
  {
    auth0Id: { type: String, required: true },
    firstName: { type: String, default: null },
    lastName: { type: String, default: null }
  },
  { toObject: { virtuals: true }, toJSON: { virtuals: true }, timestamps: true }
);

User.virtual('fullName').get(function getFormattedName(this: UserDocument) {
  if (this.firstName && this.lastName)
    return `${this.firstName} ${this.lastName}`;
  return 'a phantom chef';
});

export default model<UserDocument>('User', User);
