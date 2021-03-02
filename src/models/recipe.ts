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
  ingredients: string[];
  instructions: string[];
  prepTime?: number;
  cookingTime: number;
}

export interface RecipeDocument extends RecipeBase, Document {
  id: string;
}

const Recipe: Schema<RecipeDocument> = new Schema(
  {
    title: { type: String, required: true },
    description: { type: String, required: true },
    image: { type: String, default: null },
    author: { type: ObjectId, ref: 'User', required: true },
    public: { type: Boolean, default: true },
    tags: { type: [String], default: [] },
    ingredients: { type: [String], default: [] },
    instructions: { type: [String], default: [] },
    prepTime: { type: Number, default: null },
    cookingTime: { type: Number, required: true }
  },
  { toObject: { virtuals: true }, toJSON: { virtuals: true }, timestamps: true }
);

Recipe.pre(/find/, function populateAuthor(this: RecipeDocument, next) {
  this.populate('author', 'firstName lastName id');
  next();
});

export default model<RecipeDocument>('Recipe', Recipe);
