import { getAuth } from "firebase/auth";
import firebase_app from "./firebase.config";


export default async function checkLogin() {
    const auth = getAuth(firebase_app);

    if (auth.currentUser) {
        return true
    } else {
        return false
    }
}