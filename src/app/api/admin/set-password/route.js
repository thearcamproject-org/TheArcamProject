import { NextResponse } from 'next/server';
import { db } from '@/app/lib/firebase-admin';
import { verifyAdmin } from '@/app/lib/admin-auth';
import bcrypt from 'bcryptjs';

export async function POST(request) {
  try {
    if (!(await verifyAdmin())) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { userId, password } = await request.json();

    if (!userId || !password || password.trim().length < 4) {
      return NextResponse.json({ error: 'User ID and a password of at least 4 characters are required.' }, { status: 400 });
    }

    const clientRef = db.collection('clients').doc(userId);
    const doc = await clientRef.get();

    if (!doc.exists) {
      return NextResponse.json({ error: 'Client not found.' }, { status: 404 });
    }

    // Hash the password with bcrypt before saving to database
    const hashedPassword = await bcrypt.hash(password.trim(), 10);
    await clientRef.update({ portalPassword: hashedPassword });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error setting portal password:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
