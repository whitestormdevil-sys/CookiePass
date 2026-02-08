// ============================================================================
// CookiePass Crypto Module — AES-256-GCM with PBKDF2
// ============================================================================
// All encryption/decryption happens client-side.
// The server never sees plaintext cookie data.
// ============================================================================

import type { EncryptedPayload, DecryptedPayload, CookieData } from '@/types';

const PBKDF2_ITERATIONS = 100_000;
const SALT_LENGTH = 16; // bytes
const IV_LENGTH = 12; // bytes
const KEY_LENGTH = 256; // bits

/**
 * Derives an AES-256 key from a password using PBKDF2.
 */
async function deriveKey(password: string, salt: Uint8Array): Promise<CryptoKey> {
  const encoder = new TextEncoder();
  const keyMaterial = await crypto.subtle.importKey(
    'raw',
    encoder.encode(password),
    'PBKDF2',
    false,
    ['deriveKey']
  );

  return crypto.subtle.deriveKey(
    {
      name: 'PBKDF2',
      salt: salt.buffer as ArrayBuffer,
      iterations: PBKDF2_ITERATIONS,
      hash: 'SHA-256',
    },
    keyMaterial,
    {
      name: 'AES-GCM',
      length: KEY_LENGTH,
    },
    false,
    ['encrypt', 'decrypt']
  );
}

/**
 * Converts a Uint8Array to a base64 string.
 */
function uint8ToBase64(bytes: Uint8Array): string {
  let binary = '';
  for (let i = 0; i < bytes.byteLength; i++) {
    binary += String.fromCharCode(bytes[i]);
  }
  return btoa(binary);
}

/**
 * Converts a base64 string to a Uint8Array.
 */
function base64ToUint8(base64: string): Uint8Array {
  const binary = atob(base64);
  const bytes = new Uint8Array(binary.length);
  for (let i = 0; i < binary.length; i++) {
    bytes[i] = binary.charCodeAt(i);
  }
  return bytes;
}

/**
 * Encrypts cookie data with AES-256-GCM.
 *
 * @param payload - The data to encrypt (cookies + metadata)
 * @param password - The encryption password
 * @returns EncryptedPayload with ciphertext, salt, and IV (all base64)
 */
export async function encrypt(
  payload: DecryptedPayload,
  password: string
): Promise<EncryptedPayload> {
  const salt = crypto.getRandomValues(new Uint8Array(SALT_LENGTH));
  const iv = crypto.getRandomValues(new Uint8Array(IV_LENGTH));
  const key = await deriveKey(password, salt);

  const encoder = new TextEncoder();
  const plaintext = encoder.encode(JSON.stringify(payload));

  const ciphertext = await crypto.subtle.encrypt(
    { name: 'AES-GCM', iv: iv.buffer as ArrayBuffer },
    key,
    plaintext
  );

  return {
    ciphertext: uint8ToBase64(new Uint8Array(ciphertext)),
    salt: uint8ToBase64(salt),
    iv: uint8ToBase64(iv),
  };
}

/**
 * Decrypts an encrypted payload with AES-256-GCM.
 *
 * @param encrypted - The encrypted payload (ciphertext, salt, IV — all base64)
 * @param password - The decryption password
 * @returns DecryptedPayload with cookies and metadata
 * @throws Error if decryption fails (wrong password, tampered data, etc.)
 */
export async function decrypt(
  encrypted: EncryptedPayload,
  password: string
): Promise<DecryptedPayload> {
  const salt = base64ToUint8(encrypted.salt);
  const iv = base64ToUint8(encrypted.iv);
  const ciphertext = base64ToUint8(encrypted.ciphertext);
  const key = await deriveKey(password, salt);

  try {
    const plaintext = await crypto.subtle.decrypt(
      { name: 'AES-GCM', iv: iv.buffer as ArrayBuffer },
      key,
      ciphertext.buffer as ArrayBuffer
    );

    const decoder = new TextDecoder();
    const json = decoder.decode(plaintext);
    return JSON.parse(json) as DecryptedPayload;
  } catch {
    throw new Error('Decryption failed. Please check your password and try again.');
  }
}

/**
 * Creates a DecryptedPayload ready for encryption.
 */
export function createPayload(
  cookies: CookieData[],
  domain: string,
  localStorage?: Record<string, string>,
  sessionStorage?: Record<string, string>
): DecryptedPayload {
  return {
    cookies,
    domain,
    localStorage,
    sessionStorage,
    metadata: {
      exportedAt: new Date().toISOString(),
      version: '1.0.0',
    },
  };
}
