import firebase_app from "../../firebase/firebase.config";
import {
  collection,
  addDoc,
  docRef,
  getDocs,
  getFirestore,
  getDoc,
  updateDoc,
} from "firebase/firestore";

const db = getFirestore(firebase_app);

export default async function handler(req, res) {
  try {
    console.log(req.body);
    const { ref, time, email } = JSON.parse(req.body);
    const bookingCollection = collection(db, "bookings");
    const bookingDB = await getDocs(bookingCollection);
    const userCollection = collection(db, "users");
    const usersDB = await getDocs(userCollection);

    const find_date = bookingDB.docs.find((element) => element.id === ref);
    if (find_date) {
      // delete in bookings db
        const new_array = find_date
          .data()
          .booking_times[time].filter((obj) => obj.email !== email);
        const newItem = {
          ...find_date.data(),
          booking_times: {
            ...find_date.data().booking_times,
            [time]: new_array,
          },
        };

        await updateDoc(find_date.ref, newItem);
        // Delete in user db now
        const user = usersDB.docs.find((element) => element.data().email === email)
        console.log(user.data())

        const users_updated_bookings = user
        .data()
        .bookings.filter((obj) => obj.booking_ref !== find_date.id);

        const new_user_object = {
          ...user.data(),
          bookings : users_updated_bookings
        }
        await updateDoc(user.ref, new_user_object);
      // Send the updated booking data as the response
      res.status(200).send({message: 'done'});
    } else {
      res.status(404).send({ message: "Item not found" });
    }
  } catch (error) {
    res.status(500).send(error);
  }
}
