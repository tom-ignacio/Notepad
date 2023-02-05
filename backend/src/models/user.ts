import mongoose, { model, Schema, Document } from "mongoose";

import bcrypt from "bcrypt";

export interface I_User extends Document {
  username: string;
  name: string;
  lastName: string;
  password: string;
  noteList: string;
  comparePassword: (password: string) => Promise<boolean>;
}

const userSchema = new Schema({
  username: {
    type: String,
    unique: true,
    required: true,
    lowercase: true,
    trim: true,
  },

  name: {
    type: String,
    require: true,
  },
  lastName: {
    type: String,
    require: true,
  },

  password: {
    type: String,
    require: true,
  },

  noteList: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: "notes"
  }]
});

userSchema.pre<I_User>("save", async function (next) {
  const user = this;

  if (!user.isModified("password")) return next();

  const salt = await bcrypt.genSalt(10);
  const contraseñaCifrada = await bcrypt.hash(user.password, salt);
  user.password = contraseñaCifrada;
  next();
});

userSchema.methods.comparePassword = async function (
  password: string
): Promise<boolean> {
  return await bcrypt.compare(password, this.password);
};

export default model<I_User>("User", userSchema);
