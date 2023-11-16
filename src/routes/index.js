import { useEffect, useState } from "react";
import { getFirestore, collection, getDocs } from "firebase/firestore";
import app from "../utils/firebase";

const db = getFirestore(app);

export default function Index() {
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    async function getEventsData() {
      const querySnapshot = await getDocs(collection(db, "events"));
      querySnapshot.forEach((doc) => {
        // doc.data() is never undefined for query doc snapshots
        console.log(doc.id, " => ", doc.data());
      });
    }
    getEventsData();
  }, []);

  return (
    <>
      <h1>Fisk events board</h1>
      {loading ? "loading" : <h2>Events</h2>}
    </>
  );
}
