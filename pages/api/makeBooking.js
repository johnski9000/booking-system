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
    const data = JSON.parse(req.body);
    const { booking_data } = data;
    //update booking function

    async function updateBooking(id, booking_data) {
        const bookingCollection = collection(db, "bookings");
        const bookingDB = await getDocs(bookingCollection);
        
        const find_booking = bookingDB.docs.find(
          (element) => element.id === booking_data.booking_id
        );
      
        if (find_booking) { 
            // Check if a booking was found
          let booking = find_booking.data();
            console.log(booking)
          booking.booking_times[booking_data.booking_time].push({
            name: booking_data.name,
            email: booking_data.email,
            contact_number: booking_data.contact_number,
            guests: booking_data.guest_number,
            user_id: id
          });
      
          const updateBooking = await updateDoc(find_booking.ref, booking);
          const getUpdatedBooking = await getDoc(find_booking.ref);
          console.log(getUpdatedBooking.data()); // Log the updated booking data
          return getUpdatedBooking.data();
        } else {
          return "Booking not found";
        }
      }
    const userCollection = collection(db, "users");
    const userDB = await getDocs(userCollection);
    // find user in users collection
    const find_user = userDB.docs.find(
      (element) => element.data().email === booking_data.email
    );

    if (find_user) {
        // check if booking already exists and respond with an error 
      if (
        find_user
          .data()
          .bookings.find((item) => item.booking_ref === booking_data.booking_id)
      ) {
        res.status(400).send({ error: "Booking already has been created" });
      } 
      // booking doesn't exist so we update the user object with the next booking
      else {
        const updated_user = find_user.data();
        updated_user.bookings.push({
          booking_ref: booking_data.booking_id,
          booking_date: booking_data.booking_date,
          booking_time: booking_data.booking_time,
          guests: booking_data.guest_number,
        });
        const updatedUserDoc = await updateDoc(find_user.ref, updated_user);
        const updated_reply = await getDoc(find_user.ref);
        const update_response = await updateBooking(find_user.id, booking_data)
        res.status(200).send(updated_reply.data(), update_response);
      }
    } else {
      const newUserDocRef = await addDoc(userCollection, {
        name: booking_data.name,
        contact_number: booking_data.contact_number,
        email: booking_data.email,
        bookings: [
          {
            booking_ref: booking_data.booking_id,
          booking_date: booking_data.booking_date,
          booking_time: booking_data.booking_time,
          guests: booking_data.guest_number
          },
        ],
      });
      const newUserDoc = await getDoc(newUserDocRef);
      const update_response = await updateBooking(newUserDoc.id, booking_data)
      console.log("New user added:", newUserDoc.data());
      res.status(200).send(newUserDoc.data(), update_response);

    }
  } catch (error) {
    console.error("Error:", error);
    res.status(400).send(error);
  }
}
