// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import firebase_app from "../firebase/firebase.config";
import { getFirestore, doc, setDoc } from "firebase/firestore";

const db = getFirestore(firebase_app);

async function seedData(userId, name, email) {

// Reference to the "dates" collection
const datesCollectionRef = db.collection("dates");

// Query the collection, sort by a timestamp field in descending order, and limit to 1 document
datesCollectionRef
  .orderBy("timestampField", "desc") // Replace "timestampField" with the actual field you want to sort by
  .limit(1)
  .get()
  .then((querySnapshot) => {
    if (!querySnapshot.empty) {
      // Get the last document in the sorted query
      const lastDocument = querySnapshot.docs[0];

      // Extract the name (document ID) of the last document
      const lastDocumentId = lastDocument.id;

      console.log("Name of the last document:", lastDocumentId);
    } else {
      console.log("The 'dates' collection is empty.");
    }
  })
  .catch((error) => {
    console.error("Error getting documents:", error);
  });

  const docRef = db.collection("dates").doc("alovelace");

  await docRef.set({
    first: "Ada",
    last: "Lovelace",
    born: 1815,
  });
}

export default function handler(req, res) {
  try {
    // const res = await seedData()
    const docRef = db.collection("dates").doc("alovelace");

    const res = await docRef.set({
    first: "Ada",
    last: "Lovelace",
    born: 1815,
  });
    console.log(res)
    res.status(200).json(res)
  } catch (error) {
    res.status(404).json(error)
  }
}
