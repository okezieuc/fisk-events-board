import { useEffect, useState } from "react";
import { getFirestore, collection, getDocs } from "firebase/firestore";
import app from "../utils/firebase";

const db = getFirestore(app);

export default function Index() {
  const [loading, setLoading] = useState(true);
  const [events, setEvents] = useState([]);

  useEffect(() => {
    async function getEventsData() {
      const querySnapshot = await getDocs(collection(db, "events"));
      const accumulator = [];
      querySnapshot.forEach((doc) => {
        // doc.data() is never undefined for query doc snapshots
        accumulator.push(doc.data());
      });
      setEvents(accumulator);
      setLoading(false);
    }

    getEventsData();
  }, []);

  return (
    <>
      <h1>Fisk events board</h1>
      {loading ? (
        "loading"
      ) : (
        <>
          {events.map((event) => (
            <div>
              <div>{event.eventName}</div>
              <div>{event.eventDescription}</div>
            </div>
          ))}
        </>
      )}
    </>
  );
}
