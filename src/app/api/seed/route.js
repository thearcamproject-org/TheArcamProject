import { NextResponse } from 'next/server';
import { db } from '@/app/lib/firebase-admin';
import { MOCK_USERS } from '@/app/lib/mock-data';

export async function GET(request) {
  try {
    const clientsRef = db.collection('clients');
    
    // Write each mock user to Firestore
    const batch = db.batch();
    
    MOCK_USERS.forEach(user => {
      // Remove id since it will be the document key
      const { id, ...userData } = user;
      const docRef = clientsRef.doc(id);
      batch.set(docRef, userData);
    });

    await batch.commit();

    return NextResponse.json({ success: true, message: 'Database seeded successfully' });
  } catch (error) {
    console.error('Error seeding database:', error);
    return NextResponse.json({ error: 'Internal server error', details: error.message }, { status: 500 });
  }
}
