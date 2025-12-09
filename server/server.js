import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./src/config/db.js";
import seedDefaults from "./src/seed/defaultData.js";
import router from "./src/routes/index.js";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

app.use("/api", router);

app.use((err, _req, res, _next) => {
  const status = err.status || 500;
  res.status(status).json({ message: err.message || "Server error" });
});

const uri = process.env.MONGO_URI || "mongodb://127.0.0.1:27017/landing_portal";
const port = process.env.PORT || 5000;

async function start() {
  await connectDB(uri);
  await seedDefaults();
  app.listen(port, () => {
    console.log(`Server running on port ${port}`);
  });
}

start().catch((err) => {
  console.error("Startup error", err);
  process.exit(1);
});

