import { initializeApp, getApps, cert } from "firebase-admin/app";

const firebaseAdminConfig = {
  credential: cert({
    projectId: "chat-app-test-6b379",
    clientEmail:
      "firebase-adminsdk-ekguu@chat-app-test-6b379.iam.gserviceaccount.com",
    privateKey: process.env.FIREBASE_ADMIN_PRIVATE_KEY,
  }),
};

export function customInitApp() {
  if (getApps().length <= 0) {
    initializeApp(firebaseAdminConfig);
  }
}