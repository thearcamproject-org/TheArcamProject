import { NextResponse } from 'next/server';
import { db } from '@/app/lib/firebase-admin';

export async function GET(request) {
  try {
    const clientsRef = db.collection('clients');
    const snapshot = await clientsRef.get();

    const users = snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }));

    return NextResponse.json({ users });
  } catch (error) {
    console.error('Error fetching users:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
