import { Document, model, Schema } from 'mongoose';

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

const recipeRating: Schema<RecipeRatingDocument> = new Schema({
  userUuid: { type: String, required: true },
  ratings: [
    {
      recipeUuid: { type: String, required: true },
      score: { type: Number, required: true }
    }
  ]
});

export default model<RecipeRatingDocument>('Recipe', recipeRating);
