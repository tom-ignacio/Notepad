import express from "express";
import morgan from "morgan";
import cors from "cors";
import authRoutes from "./routes/auth.routes";
import passportMid from "./middlewares/passport";
import passport from "passport";
import specialRoutes from "./routes/special.routes";

const app = express();

app.set("port", process.env.port || 3000);

app.use(morgan("dev"));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cors());
app.use(passport.initialize());
passport.use(passportMid);

app.get("/", (_req, res) => {
  res.send('API running on: http://localhost:${app.get("port")}');
});

app.use(authRoutes);
app.use(specialRoutes);

export default app;
