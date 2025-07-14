import { electionFactory } from '../utils/blockchain';
import { pool } from '../db';
import dotenv from 'dotenv';

dotenv.config();

const listenToElectionEvents = async () => {
  console.log('📡 Listening for ElectionCreated events...');

  // Listen for new ElectionCreated events
  electionFactory.on(
    'ElectionCreated',
    async (
      id,
      name,
      description,
      startDate,
      endDate,
      bannerUrl,
      createdBy,
      createdAt
    ) => {
      console.log(`🆕 New Election Event → ID: ${id}, Name: ${name}`);

      try {
        // Save to PostgreSQL, convert timestamps from seconds to TIMESTAMP
        await pool.query(
          `INSERT INTO elections (
              election_id,
              name,
              description,
              start_date,
              end_date,
              banner_url,
              creator_address,
              created_at
          ) VALUES (
              $1, $2, $3, to_timestamp($4), to_timestamp($5), $6, $7, to_timestamp($8)
          )
          ON CONFLICT (election_id) DO NOTHING`,
          [
            id.toNumber(),             // election_id
            name,                      // name
            description,               // description
            startDate.toNumber(),      // start_date (UNIX to TIMESTAMP)
            endDate.toNumber(),        // end_date (UNIX to TIMESTAMP)
            bannerUrl,                 // banner_url
            createdBy,                 // creator_address
            createdAt.toNumber()       // created_at (from blockchain timestamp)
          ]
        );

        console.log(`✅ Synced "${name}" to DB 🎉`);
      } catch (err) {
        console.error('❌ Error saving election to DB:', err);
      }
    }
  );
};

listenToElectionEvents();
