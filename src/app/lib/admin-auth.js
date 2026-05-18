import { jwtVerify } from 'jose';
import { cookies } from 'next/headers';

export async function verifyAdmin() {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get('admin_token')?.value;

    if (!token) return false;

    const secret = new TextEncoder().encode(process.env.ADMIN_JWT_SECRET || 'TAP_ADMIN_JWT_SECRET_KEY_2026');
    const { payload } = await jwtVerify(token, secret);
    
    return payload && payload.email === process.env.ADMIN_EMAIL;
  } catch (error) {
    console.error('JWT verification failed:', error);
    return false;
  }
}
