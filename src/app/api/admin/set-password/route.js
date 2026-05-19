import { NextResponse } from 'next/server';
import { db } from '@/app/lib/firebase-admin';

export async function POST(request) {
  try {
    const { userId, password } = await request.json();

    if (!userId || !password || password.trim().length < 4) {
      return NextResponse.json({ error: 'User ID and a password of at least 4 characters are required.' }, { status: 400 });
    }

    const clientRef = db.collection('clients').doc(userId);
    const doc = await clientRef.get();

    if (!doc.exists) {
      return NextResponse.json({ error: 'Client not found.' }, { status: 404 });
    }

    // Store plain password. In production, hash with bcrypt before saving.
    await clientRef.update({ portalPassword: password.trim() });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error setting portal password:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
