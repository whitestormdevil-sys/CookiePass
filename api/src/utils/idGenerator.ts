// nanoid v3 (CommonJS-compatible)
import { nanoid } from 'nanoid';

const ALPHABET = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
const SHARE_ID_LENGTH = 8;

/**
 * Generate a URL-safe, short unique ID for shares.
 * Uses nanoid with a custom alphanumeric alphabet.
 */
export function generateShareId(): string {
  // nanoid v3 with custom alphabet
  const id: string[] = [];
  const bytes = nanoid(SHARE_ID_LENGTH);
  for (let i = 0; i < SHARE_ID_LENGTH; i++) {
    id.push(ALPHABET[bytes.charCodeAt(i) % ALPHABET.length]);
  }
  return id.join('');
}
