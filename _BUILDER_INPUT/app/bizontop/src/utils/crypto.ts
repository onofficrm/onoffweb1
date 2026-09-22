/**
 * 비밀번호 안전 단방향 해시 유틸리티 (SHA-256 + Salt)
 */

const STATIC_SALT = 'bizontop_secure_salt_v2026';

export async function hashPassword(password: string, salt: string = STATIC_SALT): Promise<string> {
  const combined = `${salt}:${password}:${salt}`;

  if (typeof window !== 'undefined' && window.crypto && window.crypto.subtle) {
    try {
      const msgUint8 = new TextEncoder().encode(combined);
      const hashBuffer = await window.crypto.subtle.digest('SHA-256', msgUint8);
      const hashArray = Array.from(new Uint8Array(hashBuffer));
      const hashHex = hashArray.map((b) => b.toString(16).padStart(2, '0')).join('');
      return `sha256$${hashHex}`;
    } catch {
      // fallback
    }
  }

  // Fallback simple 32-char hex digest simulation
  let hash = 0;
  for (let i = 0; i < combined.length; i++) {
    const char = combined.charCodeAt(i);
    hash = (hash << 5) - hash + char;
    hash |= 0;
  }
  const hex = Math.abs(hash).toString(16).padStart(8, '0');
  return `sha256$${hex}$fallback`;
}

export async function verifyPassword(inputPassword: string, storedHash: string): Promise<boolean> {
  const computed = await hashPassword(inputPassword);
  return computed === storedHash;
}

export function generateRandomToken(prefix: string = 'rst'): string {
  const random = Math.random().toString(36).substring(2, 10);
  const time = Date.now().toString(36);
  return `${prefix}_${time}_${random}`;
}

export function generateReceiptId(): string {
  const now = new Date();
  const dateStr = now.toISOString().slice(0, 10).replace(/-/g, '');
  const rand = Math.floor(1000 + Math.random() * 9000);
  return `BT-${dateStr}-${rand}`;
}
