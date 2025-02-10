import { initializeApp, applicationDefault } from "firebase-admin/app";
import { getFirestore } from "firebase-admin/firestore";
import { getAuth } from "firebase-admin/auth";
import admin from "firebase-admin";

if (!admin.apps.length) {
  if (
    (!process.env.NODE_ENV || process.env.NODE_ENV === "development") &&
    process.env.FIREBASE_USING_EMULATOR === "true"
  ) {
    initializeApp({
      credential: applicationDefault(),
      projectId: process.env.FIREBASE_PROJECT_ID,
    });

    const db = getFirestore();
    db.settings({
      ignoreUndefinedProperties: true,
    });

  } else {
    initializeApp({
      credential: admin.credential.cert({
        projectId: process.env.FIREBASE_PROJECT_ID,
        clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
        privateKey: process.env.FIREBASE_PRIVATE_KEY?.replace(/\\n/g, "\n"),
      }),
    });
    const db = getFirestore();

    db.settings({
      ignoreUndefinedProperties: true,
    });
  }
}

const db = getFirestore();

export { db };

export const auth = getAuth();
