import { useEffect, useState } from "react";
import { getFirestore, collection, getDocs } from "firebase/firestore";
import { app } from "../services/firebase";
import FirestoreImage from "../components/FirestoreImage";

const db = getFirestore(app);

export default function Home() {
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
    <div style={{ maxWidth: '800px', margin: '0 auto', display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '15px' }}>
      <h1 style={{ marginBottom: '20px', textAlign: 'center', gridColumn: '1 / -1' }}>Fisk events board</h1>
      {loading ? (
        "loading"
      ) : (
        <>
          {events.map((event) => (
            <div key={event.eventId} style={{ padding: '10px', border: '1px solid #ccc', borderRadius: '10px' }}>
              <FirestoreImage src={event.eventFlyerLocation} />
              <div style={{ marginBottom: '5px', fontSize: '1.2em', fontWeight: 'bold' }}>{event.eventName}</div>
              <div>{event.eventDescription}</div>
            </div>
          ))}
        </>
      )}
    </div>
  );
}
