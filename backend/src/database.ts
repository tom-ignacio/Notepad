import mongoose, { ConnectOptions } from "mongoose";
import config from "./config/config";

mongoose.set("strictQuery", true);
mongoose.connect(config.DB.URI);

const connection = mongoose.connection;

connection.once("open", () => {
  console.log("MongoDB connected");
});

connection.on("error", (err) => {
  console.log(err);
  process.exit(0);
});
