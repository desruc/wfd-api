import { Document, model, Schema } from 'mongoose';

export interface IRecipeRating extends Document {
  userUuid: string;
  ratings: {
    recipeUuid: string;
    score: number;
  }[];
}

const recipeRatingModel: Schema = new Schema({
  userUuid: { type: String, required: true },
  ratings: [
    {
      recipeUuid: { type: String, required: true },
      score: { type: Number, required: true }
    }
  ]
});

export default model<IRecipeRating>('Recipe', recipeRatingModel);
