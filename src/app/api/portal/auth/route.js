import { NextResponse } from 'next/server';
import { db } from '@/app/lib/firebase-admin';

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

    // If admin has set a password, verify it
    if (userData.portalPassword) {
      if (!password || password.trim() !== userData.portalPassword) {
        return NextResponse.json({ error: 'Incorrect password.' }, { status: 401 });
      }
    }

    return NextResponse.json({ user: { id: doc.id, ...userData } });
  } catch (error) {
    console.error('Error authenticating project key:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
