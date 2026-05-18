import { NextResponse } from 'next/server';
import { db } from '@/app/lib/firebase-admin';
import { verifyAdmin } from '@/app/lib/admin-auth';

export async function POST(request) {
  try {
    if (!(await verifyAdmin())) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }
    const { userId, fields } = await request.json();

    if (!userId || !fields) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    const clientRef = db.collection('clients').doc(userId);
    const doc = await clientRef.get();

    if (!doc.exists) {
      return NextResponse.json({ error: 'Client not found' }, { status: 404 });
    }

    // Build a flat update map for only the fields provided
    const updateData = {};

    if (fields.clientName !== undefined) updateData['clientName'] = fields.clientName;
    if (fields.email !== undefined) updateData['email'] = fields.email;
    if (fields.projectKey !== undefined) updateData['projectKey'] = fields.projectKey;

    // projectDetails sub-fields
    const detailFields = ['name', 'tier', 'investment', 'startDate', 'addons', 'brief'];
    detailFields.forEach(f => {
      if (fields[f] !== undefined) {
        updateData[`projectDetails.${f}`] = fields[f];
      }
    });

    await clientRef.update(updateData);

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error updating project details:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
