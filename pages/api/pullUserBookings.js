import firebase_app from "../../firebase/firebase.config";
import {
  collection,
  addDoc,
  getFirestore,
  getDocs,
  getDoc,
  updateDoc,
} from "firebase/firestore";

const db = getFirestore(firebase_app);

export default async function handler (req, res) {
    try {
        const data = JSON.parse(req.body);
        console.log(data.email)
        const userCollection = collection(db, "users");
        const userDB = await getDocs(userCollection);
        const find_user = userDB.docs.find(
            (element) => element.data().email === data.email
          );
          console.log(find_user)
          res.status(200).send(find_user.data())
    } catch (error) {
        res.status(400).send(error)
    }
}