import { useEffect, useState } from "react";
import FirestoreImage from "../components/FirestoreImage";
import { fetchEventsData } from "../services/firebase.ts";

export default function Home() {
  const [loading, setLoading] = useState(true);
  const [events, setEvents] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const getEventsData  = async () => {
      // ensures is loading
      setLoading(true);
      
      try {
        // gets the events and stores them
        const _events = await fetchEventsData();
        setEvents(_events);
      } catch (err) {
        // error could come in handy later
        setError(err);
      } finally {
        // ensures is not loading
        setLoading(false);
      }
    }

    getEventsData();
  }, []);

  return (
    <div style={{ maxWidth: '800px', margin: '0 auto', display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '15px' }}>
      <h1 style={{ marginBottom: '20px', textAlign: 'center', gridColumn: '1 / -1' }}>Fisk events board</h1>
      {loading ? (
        "Loading..."
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
