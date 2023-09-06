import firebase_app from "../../firebase/firebase.config";
import {
  collection,
  addDoc,
  docRef,
  getDocs,
  getFirestore,
  getDoc,
} from "firebase/firestore";

const db = getFirestore(firebase_app);

export default async function handler(req, res) {
  try {
    console.log(req.body)
    const { ref, time, date, id } = JSON.parse(req.body);
    const bookingCollection = collection(db, "bookings");
    const bookingDB = await getDocs(bookingCollection);



    const find_date = bookingDB.docs.find(
        (element) => element.data().date === date
      );
    if (find_date) {
      console.log(find_date.data().booking_times[time]).find(item => item.user_id === id)
    } else {
      res.status(404).send({message: "Item not found"})
    }
    res.status(200).send(find_ref);
  } catch (error) {
    res.status(404).send(error);
  }
}
