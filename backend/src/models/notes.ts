import { model, Schema, Document } from "mongoose";

export interface bloc_User extends Document {
  title: string;
  description: string;
  favorite: boolean;
  createDate: Date;
}

const notesSchema = new Schema({
  title: {
    type: String,
    require: true,
  },

  description: {
    type: String,
    require: true,
  },

  favorite: {
    type: Boolean,
    default: false,
  },

  createDate: {
    type: Date,
    default: Date.now()
  }
});
notesSchema.pre<bloc_User>("save", async function (next) {});

export default model<bloc_User>("notes", notesSchema);
