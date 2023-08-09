import firebase_app from "../firebase/firebase.config";
import {
  collection,
  addDoc,
  docRef,
  getDocs,
  getFirestore,
  getDoc,
} from "firebase/firestore";

const db = getFirestore(firebase_app);

// Initialize Cloud Firestore and get a reference to the service

export default async function handler(req, res) {
  try {
    const data = JSON.parse(req.body);
    const { date } = data;
    const querySnapshot = await getDocs(collection(db, "bookings"));
    const find_date = querySnapshot.docs.find(
      (element) => element.data().date === date
    );

    if (find_date) {
      const responseData = {
        message: "already in the system",
        data: find_date.data(),
        id: find_date.id,
      };
      res.setHeader("Content-Type", "application/json");
      res.status(200).send(responseData);
    } else {
      const docRef = await addDoc(collection(db, "bookings"), {
        date: date,
        booking_times: {
          "2:30": [],
          "4:30": [],
          "6:30": [],
        },
        tables: 5,
        seats_per_table: 4,
      });
      const newDocSnapshot = await getDoc(docRef);
      const responseData = {
        message: "date created",
        data: newDocSnapshot.data(),
        id: docRef.id,
      };
      res.setHeader("Content-Type", "application/json");
      res.status(200).send(JSON.stringify(responseData));
    }
  } catch (e) {
    res.status(400).send(e);
  }
}
