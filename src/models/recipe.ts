import { Document, model, Schema } from 'mongoose';

export interface RecipeBase {
  uuid: string;
  title: string;
  description: string;
  image?: string;
  author: string;
  public: boolean;
  tags: string[];
  ingredients: string[];
  instructions: string[];
  time: string;
  rating: {
    1: number;
    2: number;
    3: number;
    4: number;
    5: number;
  };
}

interface RecipeDocument extends RecipeBase, Document {
  id: string;
}

const recipe: Schema<RecipeDocument> = new Schema({
  uuid: { type: String, required: true },
  title: { type: String, required: true },
  description: { type: String, required: true },
  image: { type: String, default: null },
  author: { type: String, default: null },
  public: { type: Boolean, default: true },
  tags: { type: [String], default: [] },
  ingredients: { type: [String], default: [] },
  instructions: { type: [String], default: [] },
  time: { type: String, required: true },
  rating: {
    1: { type: Number, default: 0 },
    2: { type: Number, default: 0 },
    3: { type: Number, default: 0 },
    4: { type: Number, default: 0 },
    5: { type: Number, default: 0 }
  }
});

export default model<RecipeDocument>('Recipe', recipe);
