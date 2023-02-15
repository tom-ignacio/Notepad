import { Request, Response } from "express";
import notes from "../models/notes";
import User from "../models/user";

export const notePad = async (
  req: Request,
  res: Response
): Promise<Response> => {
  if (!req.body.description || !req.body.title) {
    return res
      .status(400)
      .json({ msg: "Some fields are invalid." });
  }

  const newNote = new notes(req.body);
  await newNote.save();
  return res.status(201).json(newNote);
};

export const getNotes = async (req: Request, res: Response) => {
  const Notes = await notes.find();
  res.json(Notes);
};

export const getNotesById = async (req: Request, res: Response) => {
  const { noteId } = req.params;

  const note = await notes.findById(noteId);
  res.status(200).json(note);
};

export const getNotesByTitle = async (req: Request, res: Response) => {
  const note = await notes.findOne({ title: req.params.title });
  res.status(200).json(note);
};
//////////////////////////////////////////////////////////////////////////
export const getNoteByOwner = async (req: Request, res: Response) => {
  const note = await notes.find({owner: req.params.owner});
  return res.json(note);
};
//////////////////////////////////////////////////////////////////////////
export const updateNoteById = async (req: Request, res: Response) => {
  const updatedNote = await notes.findByIdAndUpdate(
    req.params.noteId,
    req.body,
    {
      new: true,
    }
  );
  res.status(200).json(updatedNote);
};

export const deleteNoteById = async (req: Request, res: Response) => {
  const { noteId } = req.params;

  await notes.findByIdAndDelete(noteId);

  res.status(200).json();
};

export const getNotesByOwnerAndCategory = async (req: Request, res: Response) => {
  const Notes = await notes.find({owner: req.params.owner, category: req.params.category});
  return res.json(Notes);
};

export const getNotesByOwnerAndFavorite = async (req: Request, res: Response) => {
  const Notes = await notes.find({owner: req.params.owner, favorite: true});
  return res.json(Notes);
};