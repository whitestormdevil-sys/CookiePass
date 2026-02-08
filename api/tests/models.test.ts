import mongoose from 'mongoose';
import { MongoMemoryServer } from 'mongodb-memory-server';
import { User } from '../src/db/models/User';
import { Share } from '../src/db/models/Share';
import { Import } from '../src/db/models/Import';
import { RevocationGuide } from '../src/db/models/RevocationGuide';
import { Team } from '../src/db/models/Team';
import { TeamMember } from '../src/db/models/TeamMember';

let mongoServer: MongoMemoryServer;

beforeAll(async () => {
  mongoServer = await MongoMemoryServer.create();
  await mongoose.connect(mongoServer.getUri());
});

afterAll(async () => {
  await mongoose.disconnect();
  await mongoServer.stop();
});

afterEach(async () => {
  await Promise.all([
    User.deleteMany({}),
    Share.deleteMany({}),
    Import.deleteMany({}),
    RevocationGuide.deleteMany({}),
    Team.deleteMany({}),
    TeamMember.deleteMany({}),
  ]);
});

// ─── User Model Tests ────────────────────────────────────────────────────────

describe('User Model', () => {
  it('should create a user with defaults', async () => {
    const user = await User.create({
      email: 'test@example.com',
      password_hash: 'hashed_password',
    });

    expect(user.email).toBe('test@example.com');
    expect(user.subscription_tier).toBe('free');
    expect(user.shares_this_month).toBe(0);
    expect(user.settings).toEqual({});
    expect(user.created_at).toBeDefined();
    expect(user.updated_at).toBeDefined();
  });

  it('should enforce unique email', async () => {
    await User.create({ email: 'dup@example.com', password_hash: 'hash1' });
    await expect(
      User.create({ email: 'dup@example.com', password_hash: 'hash2' })
    ).rejects.toThrow();
  });

  it('should lowercase email', async () => {
    const user = await User.create({
      email: 'TEST@EXAMPLE.COM',
      password_hash: 'hash',
    });
    expect(user.email).toBe('test@example.com');
  });

  it('should serialize to JSON with id field', async () => {
    const user = await User.create({
      email: 'json@example.com',
      password_hash: 'hash',
    });
    const json = user.toJSON();
    expect(json.id).toBeDefined();
    expect((json as any)._id).toBeUndefined();
    expect((json as any).__v).toBeUndefined();
  });
});

// ─── Share Model Tests ───────────────────────────────────────────────────────

describe('Share Model', () => {
  it('should create a share with custom shortId', async () => {
    const user = await User.create({
      email: 'share@example.com',
      password_hash: 'hash',
    });

    const share = await Share.create({
      id: 'AbCd1234',
      user_id: user._id,
      domain: 'netflix.com',
      encrypted_data: 'encrypted...',
      expires_at: new Date(Date.now() + 86400000),
    });

    expect(share.id).toBe('AbCd1234');
    expect(share.domain).toBe('netflix.com');
    expect(share.is_revoked).toBe(false);
    expect(share.used_count).toBe(0);
    expect(share.max_uses).toBe(1);
  });

  it('should enforce unique shortId', async () => {
    const user = await User.create({
      email: 'share2@example.com',
      password_hash: 'hash',
    });

    await Share.create({
      id: 'UniqueId1',
      user_id: user._id,
      domain: 'netflix.com',
      encrypted_data: 'data',
      expires_at: new Date(Date.now() + 86400000),
    });

    await expect(
      Share.create({
        id: 'UniqueId1',
        user_id: user._id,
        domain: 'spotify.com',
        encrypted_data: 'data2',
        expires_at: new Date(Date.now() + 86400000),
      })
    ).rejects.toThrow();
  });

  it('should find by shortId', async () => {
    const user = await User.create({
      email: 'find@example.com',
      password_hash: 'hash',
    });

    await Share.create({
      id: 'FindMe01',
      user_id: user._id,
      domain: 'netflix.com',
      encrypted_data: 'data',
      expires_at: new Date(Date.now() + 86400000),
    });

    const found = await Share.findOne({ id: 'FindMe01' });
    expect(found).not.toBeNull();
    expect(found!.domain).toBe('netflix.com');
  });
});

// ─── Import Model Tests ─────────────────────────────────────────────────────

describe('Import Model', () => {
  it('should create an import record', async () => {
    const imp = await Import.create({
      share_id: 'TestShr1',
      success: true,
      ip_hash: 'hash123',
      user_agent: 'Mozilla/5.0',
    });

    expect(imp.share_id).toBe('TestShr1');
    expect(imp.success).toBe(true);
    expect(imp.imported_at).toBeDefined();
  });
});

// ─── RevocationGuide Model Tests ────────────────────────────────────────────

describe('RevocationGuide Model', () => {
  it('should create a guide', async () => {
    const guide = await RevocationGuide.create({
      domain_pattern: 'netflix.com',
      service_name: 'Netflix',
      instructions: ['Step 1', 'Step 2'],
      settings_url: 'https://netflix.com/settings',
    });

    expect(guide.domain_pattern).toBe('netflix.com');
    expect(guide.instructions).toHaveLength(2);
    expect(guide.is_active).toBe(true);
  });

  it('should enforce unique domain_pattern', async () => {
    await RevocationGuide.create({
      domain_pattern: 'unique.com',
      service_name: 'Test',
      instructions: ['Step 1'],
    });

    await expect(
      RevocationGuide.create({
        domain_pattern: 'unique.com',
        service_name: 'Test 2',
        instructions: ['Step 1'],
      })
    ).rejects.toThrow();
  });
});

// ─── Team & TeamMember Model Tests ──────────────────────────────────────────

describe('Team Model', () => {
  it('should create a team', async () => {
    const user = await User.create({
      email: 'team@example.com',
      password_hash: 'hash',
    });

    const team = await Team.create({
      name: 'My Team',
      owner_id: user._id,
    });

    expect(team.name).toBe('My Team');
    expect(team.created_at).toBeDefined();
  });
});

describe('TeamMember Model', () => {
  it('should enforce unique team_id + user_id', async () => {
    const user = await User.create({
      email: 'member@example.com',
      password_hash: 'hash',
    });

    const team = await Team.create({
      name: 'Test Team',
      owner_id: user._id,
    });

    await TeamMember.create({
      team_id: team._id,
      user_id: user._id,
      role: 'owner',
    });

    await expect(
      TeamMember.create({
        team_id: team._id,
        user_id: user._id,
        role: 'member',
      })
    ).rejects.toThrow();
  });
});
