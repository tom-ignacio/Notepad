import { Router } from "express";
import {
  signIn,
  signUp,
  getUsers,
  getUsersById,
  updateUserById,
  deleteUserById,
} from "../controller/user.controller";
import {
  notePad,
  getNotes,
  getNotesById,
  updateNoteById,
  deleteNoteById,
  getNotesByTitle,
  getNote
} from "../controller/notes.controller";
const router = Router();

router.post("/signup", signUp);

router.get("/user", getUsers);
router.get("/user/:userId", getUsersById);
router.put("/user/:userId", updateUserById);
router.delete("/user/:userId", deleteUserById);

router.post("/signin", signIn);

router.post("/notepad", notePad);
router.get("/notepad", getNotes);
router.get("/notepad/:owner", getNote);
router.get("/notepadT/:title", getNotesByTitle);
router.put("/notepad/:noteId", updateNoteById);
router.delete("/notepad/:noteId", deleteNoteById);

export default router;
