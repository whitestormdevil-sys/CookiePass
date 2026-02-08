import dotenv from 'dotenv';
dotenv.config();

import { connectDB, disconnectDB } from './connection';
import { RevocationGuide } from './models/RevocationGuide';

const SEED_GUIDES = [
  {
    domain_pattern: 'netflix.com',
    service_name: 'Netflix',
    instructions: [
      'Go to Account > Manage Access and Devices',
      'Click "Sign Out" next to the device you shared with',
      'Optionally, change your password to invalidate all sessions',
    ],
    settings_url: 'https://www.netflix.com/ManageAccountAccess',
  },
  {
    domain_pattern: 'spotify.com',
    service_name: 'Spotify',
    instructions: [
      'Go to Account > Sign Out Everywhere',
      'Change your password for extra security',
      'Review your connected apps',
    ],
    settings_url: 'https://www.spotify.com/account/overview/',
  },
  {
    domain_pattern: 'disney.com',
    service_name: 'Disney+',
    instructions: [
      'Go to Account > Log Out of All Devices',
      'Change your password',
      'Check your active sessions',
    ],
    settings_url: 'https://www.disneyplus.com/account',
  },
  {
    domain_pattern: 'hulu.com',
    service_name: 'Hulu',
    instructions: [
      'Go to Account > Manage Devices',
      'Remove devices you no longer want authorized',
      'Change your password',
    ],
    settings_url: 'https://secure.hulu.com/account',
  },
  {
    domain_pattern: 'amazon.com',
    service_name: 'Amazon Prime',
    instructions: [
      'Go to Account > Digital Content and Devices',
      'Deregister the device',
      'Change your password',
    ],
    settings_url: 'https://www.amazon.com/hz/mycd/digital-console/devicelist',
  },
];

async function seed() {
  console.log('🌱 Seeding revocation guides...');

  await connectDB();

  for (const guide of SEED_GUIDES) {
    await RevocationGuide.updateOne(
      { domain_pattern: guide.domain_pattern },
      { $setOnInsert: guide },
      { upsert: true }
    );
    console.log(`   ✅ ${guide.service_name} (${guide.domain_pattern})`);
  }

  console.log(`\n🌱 Seeded ${SEED_GUIDES.length} revocation guides.`);

  await disconnectDB();
}

seed().catch((err) => {
  console.error('Seed failed:', err);
  process.exit(1);
});
