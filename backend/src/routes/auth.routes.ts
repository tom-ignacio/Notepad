import { Router } from "express";
import {
  signIn,
  signUp,
  getUsers,
  getUserByUsername,
  getUsersById,
  updateUserById,
  updateUserByUsername,
  deleteUserById,
  deleteUserByUsername,
} from "../controller/user.controller";
import {
  notePad,
  getNotes,
  getNotesById,
  updateNoteById,
  deleteNoteById,
  getNotesByTitle,
  getNoteByOwner,
  getNotesByOwnerAndCategory,
  getNotesByOwnerAndFavorite
} from "../controller/notes.controller";
import {
  createCategory,
  getCategories,
  getCategoryByOwner,
  deleteCategoryById
} from "../controller/categories.controller";

const router = Router();

router.post("/signup", signUp);

router.get("/user", getUsers);
router.get("/user/:username", getUserByUsername);
router.put("/user/:userId", updateUserById);
router.put("/userU/:username", updateUserByUsername);
router.delete("/user/:userId", deleteUserById);
router.delete("/userU/:username", deleteUserByUsername);

router.post("/signin", signIn);

router.post("/notepad", notePad);
router.get("/notepad", getNotes);
router.get("/notepad/:owner", getNoteByOwner);
router.get("/notepadI/:noteId", getNotesById);
router.get("/notepadT/:title", getNotesByTitle);
router.get("/notepadC/:owner/:category", getNotesByOwnerAndCategory);
router.get("/notepadF/:owner", getNotesByOwnerAndFavorite);
router.put("/notepad/:noteId", updateNoteById);
router.delete("/notepad/:noteId", deleteNoteById);

router.post("/category", createCategory);
router.get("/category", getCategories);
router.get("/category/:owner", getCategoryByOwner);
router.delete("/category/:categoryId", deleteCategoryById);

export default router;
