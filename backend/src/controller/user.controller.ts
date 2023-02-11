import { Request, Response } from "express";
import User, { I_User } from "../models/user";
import jwt from "jsonwebtoken";
import config from "../config/config";
import passport from "passport";

function createToken(user: I_User) {
  return jwt.sign({ id: user.id, username: user.username }, config.jwtSecret, {
    expiresIn: 604800,
  });
}

export const signUp = async (
  req: Request,
  res: Response
): Promise<Response> => {
  if (
    !req.body.username ||
    !req.body.password ||
    !req.body.name ||
    !req.body.lastName
  ) {
    return res.status(400).json({ msg: "Some fields are invalid." });
  }

  const user = await User.findOne({ username: req.body.username });

  console.log(user);
  if (user) {
    return res.status(400).json({ msg: "This username is already in use." });
  }

  const newUser = new User(req.body);
  await newUser.save();
  return res.status(201).json(newUser);
};

export const getUsers = async (req: Request, res: Response) => {
  const Users = await User.find();
  res.json(Users);
};

export const getUsersById = async (req: Request, res: Response) => {
  const { userId } = req.params;

  const user = await User.findById(userId);
  res.status(200).json(user);
};

export const getUser = async (req: Request, res: Response) => {
  const user = await User.find();
  return res.json(user);
};

export const updateUserById = async (req: Request, res: Response) => {
  const updatedUser = await User.findByIdAndUpdate(
    req.params.userId,
    req.body,
    {
      new: true,
    }
  );
  res.status(200).json(updatedUser);
};

export const updateUserByUsername = async (req: Request, res: Response) => {
  const updatedUser = await User.findOneAndUpdate(
    req.body.username,
    req.body,
    {
      new: true,
    }
  );
  res.status(200).json(updatedUser);
};

export const deleteUserById = async (req: Request, res: Response) => {
  const { userId } = req.params;

  await User.findByIdAndDelete(userId);

  res.status(200).json();
};

export const deleteUserByUsername = async (req: Request, res: Response) => {
  const { userId } = req.params;
  await User.findOneAndDelete({ username: req.body.username });
  res.status(200).json();
};

export const signIn = async (req: Request, res: Response) => {
  if (!req.body.username || !req.body.password) {
    return res.status(400).json({ msg: "Invalid username or password." });
  }

  const user = await User.findOne({ username: req.body.username });

  if (!user) {
    return res.status(400).json({ msg: "Invalid username or password" });
  }

  const isMatch = await user.comparePassword(req.body.password);

  if (isMatch) {
    return res.status(200).json({ token: createToken(user) });
  }

  return res.status(400).json({
    msg: "Invalid username or password",
  });
};

