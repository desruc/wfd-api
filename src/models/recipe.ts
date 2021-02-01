import { Document, model, Schema } from 'mongoose';

export interface RecipeBase {
  title: string;
  description: string;
  image?: string;
  author: string;
  public: boolean;
  tags: string[];
  ingredients: string[];
  instructions: string[];
  time: string;
}

export interface RecipeDocument extends RecipeBase, Document {
  id: string;
}

const recipe: Schema<RecipeDocument> = new Schema(
  {
    title: { type: String, required: true },
    description: { type: String, required: true },
    image: { type: String, default: null },
    author: { type: String, default: null },
    public: { type: Boolean, default: true },
    tags: { type: [String], default: [] },
    ingredients: { type: [String], default: [] },
    instructions: { type: [String], default: [] },
    time: { type: String, required: true }
  },
  { toObject: { virtuals: true }, toJSON: { virtuals: true }, timestamps: true }
);

export default model<RecipeDocument>('Recipe', recipe);
