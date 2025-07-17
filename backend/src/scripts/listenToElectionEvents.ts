import { electionFactory, provider } from '../utils/blockchain';
import { pool } from '../db';
import dotenv from 'dotenv';
import { EventLog } from 'ethers'; // Import the correct type

dotenv.config();

const listenToElectionEvents = async () => {
  console.log('📡 Starting ElectionCreated event listener...');

  // 1. Verify blockchain connection
  try {
    const block = await provider.getBlockNumber();
    console.log(`✅ Connected to chain (Current block: ${block})`);
    console.log(`📭 Contract address: ${electionFactory.address}`);
  } catch (err) {
    console.error('🔴 Blockchain connection failed:', err);
    process.exit(1);
  }

  // 2. First sync - get past events
  try {
    const filter = electionFactory.filters.ElectionCreated();
    const pastEvents = await electionFactory.queryFilter(filter);
    console.log(`⏳ Found ${pastEvents.length} historical events`);
    
    for (const event of pastEvents) {
      if (!isEventLog(event)) continue; // Type guard check
      await handleElectionCreated(event.args);
    }
  } catch (err) {
    console.error('❌ Error processing past events:', err);
  }

  // 3. Live event listener
  electionFactory.on('ElectionCreated', async (...args: any[]) => {
    try {
      await handleElectionCreated(args);
    } catch (err) {
      console.error('❌ Error processing live event:', err);
    }
  });

  console.log('👂 Active listener running...');
};

// Type guard for EventLog
function isEventLog(value: any): value is EventLog {
  return value && value.args !== undefined;
}

// Unified event handler
async function handleElectionCreated(args: any[] | unknown) {
  // Handle both array arguments and decoded event objects
  const params = Array.isArray(args) ? args : (args as any).args || [];

  const [
    id,
    name,
    description,
    startDate,
    endDate,
    bannerUrl,
    createdBy,
    createdAt
  ] = params;

  console.log(`\n🆕 New Election Detected → ID: ${id}, Name: ${name}`);

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
      $1, $2, $3, 
      to_timestamp($4::numeric), 
      to_timestamp($5::numeric), 
      $6, $7, 
      to_timestamp($8::numeric)
    ) ON CONFLICT (election_id) DO NOTHING`,
    [
      id.toString(),
      name,
      description,
      Number(startDate),
      Number(endDate),
      bannerUrl,
      createdBy,
      Number(createdAt)
    ]
  );

  console.log(`💾 Saved election "${name}" to database`);
}

// Start listener with error handling
listenToElectionEvents().catch(err => {
  console.error('🔥 Fatal listener error:', err);
  process.exit(1);
});