import { NextResponse } from 'next/server';
import { db } from '@/app/lib/firebase-admin';
import bcrypt from 'bcryptjs';

export async function POST(request) {
  try {
    const { projectKey, password } = await request.json();

    if (!projectKey) {
      return NextResponse.json({ error: 'Project key is required' }, { status: 400 });
    }

    const clientsRef = db.collection('clients');
    const snapshot = await clientsRef.where('projectKey', '==', projectKey).limit(1).get();

    if (snapshot.empty) {
      return NextResponse.json({ error: 'Invalid Project Key.' }, { status: 404 });
    }

    const doc = snapshot.docs[0];
    const userData = doc.data();

    // If admin has set a password, verify it using bcrypt (with legacy plain-text fallback)
    if (userData.portalPassword) {
      const cleanPassword = (password || '').trim();
      let isMatch = false;
      try {
        isMatch = await bcrypt.compare(cleanPassword, userData.portalPassword);
      } catch (err) {
        isMatch = false;
      }
      
      // Fallback for plain-text legacy passwords
      if (!isMatch && cleanPassword === userData.portalPassword) {
        isMatch = true;
      }

      if (!isMatch) {
        return NextResponse.json({ error: 'Incorrect password.' }, { status: 401 });
      }
    }

    return NextResponse.json({ user: { id: doc.id, ...userData } });
  } catch (error) {
    console.error('Error authenticating project key:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
