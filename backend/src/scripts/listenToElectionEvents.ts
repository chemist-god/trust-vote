import { electionFactory } from '../utils/blockchain';
import { pool } from '../db';
import dotenv from 'dotenv';

dotenv.config();

const listenToElectionEvents = async () => {
  console.log('Listening for ElectionCreated events...');

  electionFactory.on(
    'ElectionCreated',
    async (
      id,
      name,
      description,
      startDate,
      endDate,
      bannerUrl,
      createdBy
    ) => {
      console.log(`🆕 New Election Event → ID: ${id}, Name: ${name}`);

      try {
        await pool.query(
          `INSERT INTO elections (election_id, name, description, start_date, end_date, banner_url, creator_address)
           VALUES ($1, $2, $3, to_timestamp($4), to_timestamp($5), $6, $7)
           ON CONFLICT (election_id) DO NOTHING`,
          [id, name, description, startDate, endDate, bannerUrl, createdBy]
        );

        console.log(`Synced "${name}" to DB 🎉`);
      } catch (err) {
        console.error('❌ Error saving election to DB:', err);
      }
    }
  );
};

listenToElectionEvents();
