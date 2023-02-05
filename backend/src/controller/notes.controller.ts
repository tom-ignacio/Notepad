import { Request, Response } from "express";
import notes from "../models/notes";

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

export const getNote = async (req: Request, res: Response) => {
  const notess = await notes.find();
  return res.json(notess);
};

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