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
} from "../controller/notes.controller";
const router = Router();

router.post("/signup", signUp);
router.get("/signup", getUsers);
router.get("/signup/:userId", getUsersById);
router.put("/signup/:userId", updateUserById);
router.delete("/signup/:userId", deleteUserById);

router.post("/signin", signIn);

router.post("/notepad", notePad);
router.get("/notepad", getNotes);
router.get("/notepadT/:title", getNotesByTitle);
router.put("/notepad/:noteId", updateNoteById);
router.delete("/notepad/:noteId", deleteNoteById);

export default router;
