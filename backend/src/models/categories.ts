import mongoose, { model, Schema, Document } from "mongoose";

export interface categories_User extends Document {
  category: string;
  owner: string;
}

const notesSchema = new Schema({
  category: {
    type: String,
    require: true,
  },

  owner: {
    type: String,
    require: true,
  }
});
notesSchema.pre<categories_User>("save", async function (next) {});

export default model<categories_User>("Categories", notesSchema);
