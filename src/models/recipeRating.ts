import { Document, model, Schema } from 'mongoose';

const {
  Types: { ObjectId }
} = Schema;

export interface RecipeRatingBase {
  user: string;
  recipe: string;
  score: number;
}

export interface RecipeRatingDocument extends RecipeRatingBase, Document {
  id: string;
}

const RecipeRating: Schema<RecipeRatingDocument> = new Schema(
  {
    user: { type: ObjectId, ref: 'User', required: true },
    recipe: { type: ObjectId, ref: 'Recipe', required: true },
    score: { type: Number, required: true }
  },
  { toObject: { virtuals: true }, toJSON: { virtuals: true }, timestamps: true }
);

export default model<RecipeRatingDocument>('RecipeRating', RecipeRating);
