import { Document, model, Schema } from 'mongoose';

const {
  Types: { ObjectId }
} = Schema;

export interface RecipeBase {
  title: string;
  description: string;
  image?: string;
  author: {
    id: string;
    firstName?: string;
    lastName?: string;
    fullName?: string;
  };
  public: boolean;
  tags: string[];
  ingredients: {
    qty: string;
    name: string;
  }[];
  instructions: string;
  prepTime?: number;
  cookingTime: number;
  ratings?: {
    score: number;
  }[];
  rating?: number;
  originalUrl?: string;
}

export interface RecipeDocument extends RecipeBase, Document {
  id: string;
}

const Recipe: Schema<RecipeDocument> = new Schema(
  {
    title: { type: String, required: true },
    description: { type: String, required: true },
    image: { type: String, default: '/images/recipe-placeholder.png' },
    author: { type: ObjectId, ref: 'User', required: true },
    public: { type: Boolean, default: true },
    tags: { type: [String], default: [] },
    ingredients: [
      {
        qty: { type: String, default: '1' },
        name: { type: String, required: true }
      }
    ],
    instructions: { type: String, default: '' },
    prepTime: { type: Number, default: null },
    cookingTime: { type: Number, required: true },
    originalUrl: { type: String, default: null }
  },
  { toObject: { virtuals: true }, toJSON: { virtuals: true }, timestamps: true }
);

Recipe.virtual('ratings', {
  ref: 'RecipeRating',
  localField: '_id',
  foreignField: 'recipe'
});

Recipe.virtual('currentRating').get(function getCurrentRating(
  this: RecipeDocument
) {
  if (this.ratings) {
    const currentRating =
      this.ratings.reduce((p, { score }) => p + score, 0) / this.ratings.length;

    return currentRating;
  }
});

Recipe.pre(/find/, function populateAuthor(this: RecipeDocument, next) {
  this.populate({ path: 'ratings', options: { select: { score: 1 } } });
  this.populate({
    path: 'author',
    options: { select: { firstName: 1, lastName: 1, id: 1 } }
  });
  next();
});

export default model<RecipeDocument>('Recipe', Recipe);
