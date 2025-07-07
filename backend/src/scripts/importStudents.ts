import fs from "fs";
import path from "path";
import { pool } from "../db";
import crypto from "crypto";
import readline from "readline";
import bcrypt from "bcryptjs";

const hashIndex = (indexNumber: string) =>
  crypto.createHash("sha256").update(indexNumber.trim()).digest("hex");

async function importStudents() {
  const filePath = path.join(__dirname, "../data/students.csv");

  const rl = readline.createInterface({
    input: fs.createReadStream(filePath),
    crlfDelay: Infinity,
  });

  let isHeader = true;
  for await (const line of rl) {
    if (isHeader) {
      isHeader = false;
      continue; // skip the header line
    }

    const indexNumber = line.trim();
    if (!indexNumber) continue;

    const hash = hashIndex(indexNumber);
    // The default password is the index number itself. We'll hash it.
    const salt = await bcrypt.genSalt(10);
    const passwordHash = await bcrypt.hash(indexNumber.trim(), salt);

    try {
      await pool.query(
        "INSERT INTO students (index_hash, password_hash) VALUES ($1, $2) ON CONFLICT (index_hash) DO NOTHING",
        [hash, passwordHash]
      );
      console.log(`✅ Inserted: ${indexNumber}`);
    } catch (err: any) { // Type the error as 'any' to access message property
      console.error(`❌ Error inserting ${indexNumber}:`, err.message);
    }
  }

  await pool.end();
  console.log("🎉 Done importing students.");
}

importStudents().catch(console.error);
