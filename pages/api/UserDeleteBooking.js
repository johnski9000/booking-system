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

export default async function handler(req, res) {
try {
     
} catch (error) {
    res.status(404).send(error)
}
}