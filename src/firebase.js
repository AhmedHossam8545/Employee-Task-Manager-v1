import admin from 'firebase-admin';
import serviceAccount from './employeetaskmanager-9a2bc-firebase-adminsdk-fbsvc-c870111249.json';

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

const db = admin.firestore();
export default db;