import { Document, model, Schema } from 'mongoose';

const {
  Types: { ObjectId }
} = Schema;

export interface RecipeRatingBase {
  userUuid: string;
  ratings: {
    recipeUuid: string;
    score: number;
  }[];
}

export interface RecipeRatingDocument extends RecipeRatingBase, Document {
  id: string;
}

const recipeRating: Schema<RecipeRatingDocument> = new Schema(
  {
    user: { type: ObjectId, ref: 'User', required: true },
    ratings: [
      {
        recipe: { type: ObjectId, ref: 'Recipe', required: true },
        score: { type: Number, required: true }
      }
    ]
  },
  { toObject: { virtuals: true }, toJSON: { virtuals: true }, timestamps: true }
);

export default model<RecipeRatingDocument>('RecipeRating', recipeRating);
