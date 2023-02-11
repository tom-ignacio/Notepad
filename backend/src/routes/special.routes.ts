// NO SE UTILIZA PERO NO BORRAR POR SI SE LLEGA A NECESITAR

import { Router } from "express";
import passport from "passport";
import User, { I_User } from "../models/user";

const router = Router();

router.get(
  "/special",
  passport.authenticate("jwt", { session: false }),
  async (req, res) => {
    const Users = await User.find();
    res.json(Users);
  }
);

export default router;