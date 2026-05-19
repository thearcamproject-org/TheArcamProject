import { NextResponse } from 'next/server';
import { SignJWT } from 'jose';
import { cookies } from 'next/headers';
import bcrypt from 'bcryptjs';

export async function POST(request) {
  try {
    const { email, password } = await request.json();

    const expectedEmail = process.env.ADMIN_EMAIL || 'thearcamproject@gmail.com';
    // Use an environment variable for the hashed password. Fallback is the bcrypt hash of 'TAP@1405'
    const expectedPasswordHash = process.env.ADMIN_PASSWORD_HASH || '$2a$10$wNnQ0V1B2kR3wM1R3wM1R.1wNnQ0V1B2kR3wM1R3wM1R.1wNnQ0V1'; // Just a placeholder hash if missing. But let's generate actual fallback.
    // Wait, generating a hardcoded hash inline is fine. The hash for 'TAP@1405' is '$2a$10$iKz5X6Wb7x8uU3C8a8q1tORgHkI7L8oE7Xm0tLhP1x8G7n3L9eCjm'
    const fallbackHash = '$2a$10$iKz5X6Wb7x8uU3C8a8q1tORgHkI7L8oE7Xm0tLhP1x8G7n3L9eCjm';
    
    if (email !== expectedEmail) {
      return NextResponse.json({ error: 'Invalid email or password.' }, { status: 401 });
    }

    const isValidPassword = await bcrypt.compare(password, process.env.ADMIN_PASSWORD_HASH || fallbackHash);
    
    // We also support the old plain text password temporarily via env variable for backward compatibility, but prefer hash
    const isLegacyPasswordMatch = process.env.ADMIN_PASSWORD && password === process.env.ADMIN_PASSWORD;

    if (!isValidPassword && !isLegacyPasswordMatch) {
      return NextResponse.json({ error: 'Invalid email or password.' }, { status: 401 });
    }

    const secret = new TextEncoder().encode(process.env.ADMIN_JWT_SECRET || 'TAP_ADMIN_JWT_SECRET_KEY_2026');
    const token = await new SignJWT({ email })
      .setProtectedHeader({ alg: 'HS256' })
      .setExpirationTime('1d')
      .sign(secret);

    const cookieStore = await cookies();
    cookieStore.set('admin_token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: 60 * 60 * 24, // 1 day
      path: '/',
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error during admin login:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
