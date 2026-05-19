import { NextResponse } from 'next/server';
import { db } from '@/app/lib/firebase-admin';

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');

    if (!id) {
      return NextResponse.json({ error: 'User ID is required' }, { status: 400 });
    }

    const doc = await db.collection('clients').doc(id).get();

    if (!doc.exists) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }

    return NextResponse.json({ user: { id: doc.id, ...doc.data() } });
  } catch (error) {
    console.error('Error fetching portal user:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
