import * as functions from 'firebase-functions/v1';
import * as admin from 'firebase-admin';

admin.initializeApp();

interface RoleData {
  uid: string;
  role: string;
}

export const setUserRole = functions.https.onCall(
  async (data: RoleData, context: functions.https.CallableContext) => {
    if (!context.auth || context.auth.token.role !== 'admin') {
      throw new functions.https.HttpsError(
        'permission-denied',
        'Must be an admin to assign roles.'
      );
    }

    await admin.auth().setCustomUserClaims(data.uid, { role: data.role });
    return { message: `Role ${data.role} set for user ${data.uid}` };
  }
);
