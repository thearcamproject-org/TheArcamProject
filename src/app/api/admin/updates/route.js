import { NextResponse } from 'next/server';
import { db } from '@/app/lib/firebase-admin';

export async function POST(request) {
  try {
    const body = await request.json();
    const { userId, type, payload } = body;

    if (!userId || !type || !payload) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    const clientRef = db.collection('clients').doc(userId);
    const clientDoc = await clientRef.get();

    if (!clientDoc.exists) {
      return NextResponse.json({ error: 'Client not found' }, { status: 404 });
    }

    const currentUpdates = clientDoc.data().updates || [];

    if (type === 'ADD_UPDATE') {
      const newUpdate = {
        id: Date.now(),
        date: new Date().toISOString().split('T')[0],
        message: payload.message,
        sender: 'Admin'
      };
      await clientRef.update({ updates: [...currentUpdates, newUpdate] });
      return NextResponse.json({ success: true, update: newUpdate });
    }

    if (type === 'UPDATE_STATUS') {
      await clientRef.update({ 'projectDetails.status': payload.status });
      return NextResponse.json({ success: true });
    }

    if (type === 'EDIT_UPDATE') {
      const updatedUpdates = currentUpdates.map(u =>
        u.id === payload.id
          ? { ...u, message: payload.message, editedAt: new Date().toISOString() }
          : u
      );
      await clientRef.update({ updates: updatedUpdates });
      return NextResponse.json({ success: true });
    }

    if (type === 'DELETE_UPDATE') {
      const filteredUpdates = currentUpdates.filter(u => u.id !== payload.id);
      await clientRef.update({ updates: filteredUpdates });
      return NextResponse.json({ success: true });
    }

    return NextResponse.json({ error: 'Invalid action type' }, { status: 400 });

  } catch (error) {
    console.error('Error handling admin update:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
