// NO SE UTILIZA PERO NO BORRAR POR SI SE LLEGA A NECESITAR

import { Router } from "express";
import passport from "passport";
import notes from "../models/notes";
import User, { I_User } from "../models/user";
import Categories from "../models/categories";
import { Request, Response } from "express";

const router = Router();

router.get(
  "/auth/notepad/:owner",
  passport.authenticate("jwt", { session: false }),
  async (req, res) => {
    const note = await notes.find({ owner: req.params.owner });
    return res.json(note);
  }
);

router.put(
  "/auth/user/:username",
  passport.authenticate("jwt", { session: false }),
  async (req, res) => {
    const updatedUser = await User.findOneAndUpdate(
      { username: req.params.username },
      req.body,
      { new: true }
    );
    res.status(200).json(updatedUser);
  }
);

router.delete(
  "/auth/user/:username",
  passport.authenticate("jwt", { session: false }),
  async (req, res) => {
    await User.findOneAndDelete({ username: req.params.username });
    res.status(200).json();
  }
);

router.put(
  "/auth/notepad/:noteId",
  passport.authenticate("jwt", { session: false }),
  async (req, res) => {
    const updatedNote = await notes.findByIdAndUpdate(
      req.params.noteId,
      req.body,
      {
        new: true,
      }
    );
    res.status(200).json(updatedNote);
  }
);

router.post(
  "/auth/notepad",
  passport.authenticate("jwt", { session: false }),
  async (req, res) => {
    if (!req.body.description || !req.body.title) {
      return res.status(400).json({ msg: "Some fields are invalid." });
    } else {
      const newNote = new notes(req.body);
      await newNote.save();
      return res.status(201).json(newNote);
    }
  }
);

router.delete(
  "/auth/notepad/:noteId",
  passport.authenticate("jwt", { session: false }),
  async (req, res) => {
    const { noteId } = req.params;

    await notes.findByIdAndDelete(noteId);

    res.status(200).json();
  }
);

router.post(
  "/auth/category",
  passport.authenticate("jwt", { session: false }),
  async (req, res) => {
      if (!req.body.category) {
        return res.status(400).json({ msg: "Some fields are invalid." });
      } else {
        const newCategory = new Categories(req.body);
        await newCategory.save();
        return res.status(201).json(newCategory);
      }
  }
);

router.get(
  "/auth/category/:owner",
  passport.authenticate("jwt", { session: false }),
  async (req, res) => {
    const categories = await Categories.find({ owner: req.params.owner });
    return res.json(categories);
  }
);

router.delete(
  "/auth/category/:categoryId",
  passport.authenticate("jwt", { session: false }),
  async (req, res) => {
    const { categoryId } = req.params;

    await Categories.findByIdAndDelete(categoryId);

    res.status(200).json();
  }
);

export default router;
