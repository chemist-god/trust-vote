import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { pool } from "./db/index";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

app.get("/", async (_req, res) => {
  const result = await pool.query("SELECT NOW()");
  res.send(`TrustVote API working! ⏰ Server Time: ${result.rows[0].now}`);
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});
