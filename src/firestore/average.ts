import admin from "firebase-admin";
import { db } from ".";

const apr1ds = [
  {
    id: "1",
    apr1d: 2,
  },
  {
    id: "2",
    apr1d: 3,
  },
  {
    id: "3",
    apr1d: 4,
  },
  {
    id: "4",
    apr1d: 5,
  },
];

const AVERAGE_DAYS = 30;

export const createOrUpdate = async () => {
  for (const item of apr1ds) {
    const docRef = db.collection("averageAprPools30d").doc(item.id);

    const docSnapshot = await docRef.get();

    if (docSnapshot.exists) {
      const data = docSnapshot.data() as admin.firestore.DocumentData;
      const currentApr1d = data.apr1d || [];
      const updatedApr1d = [...currentApr1d, item.apr1d];
      const trimmedApr1d = updatedApr1d.slice(-AVERAGE_DAYS);
      await docRef.update({
        apr1d: trimmedApr1d,
      });
    } else {
      await docRef.set({
        apr1d: [item.apr1d],
        createdAt: admin.firestore.FieldValue.serverTimestamp(),
      });
    }
  }
};

export const updateElementByIndex = async (index: string | number) => {
  const batch = db.batch();

  for (const item of apr1ds) {
    const docRef = db
      .collection("averageAprPools30d")
      .doc(item.id);

    const docSnapshot = await docRef.get();

    if (docSnapshot.exists) {
      const data = docSnapshot.data() as admin.firestore.DocumentData;
      const currentApr1d = data.apr1d || [];

      if (currentApr1d.length > 0) {
        // Update the last element
        if (index === "lastIndex") {
          currentApr1d[currentApr1d.length - 1] = item.apr1d;
        }
        // Update by index
        else {
          const numericIndex = Number(index);
          if (numericIndex >= 0 && numericIndex < currentApr1d.length) {
            currentApr1d[numericIndex] = item.apr1d;
          } else {
            continue;
          }
        }
        batch.update(docRef, { apr1d: currentApr1d });
      }
    }
  }

  await batch.commit();
};


export const getAverageAprPools30d = async () => {
    const snapshot = await db
      .collection("averageAprPools30d")
      .get();
  
    if (snapshot.empty) {
      console.log("No documents found.");
      return [];
    }

 
    const tokens:any = [];
    snapshot.forEach((doc) => {
      tokens.push(doc.data());
    });
  
    return tokens;
  };