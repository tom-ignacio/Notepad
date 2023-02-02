export default {
  jwtSecret: process.env.JWT_SECRET || "somesecrettoken",

  DB: {
    URI: process.env.MONGODB_URI || "mongodb://0.0.0.0:27017/notepadDB",
    USER: process.env.MONGODB_USER || "",
    PASSWORD: process.env.MONGODB_PASSWORD || "",
    NAME: process.env.MONGODB_NAME || "",
    LAST_NAME: process.env.MONGODB_NAME || "",
  },
};
