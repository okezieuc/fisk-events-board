import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { fetchEventsData } from "../services/firebase";
import FirestoreImage from "../components/FirestoreImage";
import type { Event } from "../services/firebase";

const Dashboard = () => {
  const [loading, setLoading] = useState(true);
  const [events, setEvents] = useState<Event[]>([]);
  const [error, setError] = useState<Error | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const getEventsData = async () => {
      setLoading(true);

      try {
        const _events = await fetchEventsData();
        setEvents(_events);
      } catch (err) {
        if (err instanceof Error) {
          setError(err);
        }
      } finally {
        setLoading(false);
      }
    };

    getEventsData();
  }, []);

  const handleEdit = (id: string) => {
    navigate(`/edit-event/${id}`);
  };

  return (
    <div style={{ maxWidth: "800px", margin: "0 auto", display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: "15px" }}>
      <h1 style={{ marginBottom: "20px", textAlign: "center", gridColumn: "1 / -1" }}>School Events Dashboard</h1>
      {loading ? (
        "Loading..."
      ) : error ? (
        <div>{error.message}</div>
      ) : (
        <>
          {events.map((event) => (
            <div key={event.id} style={{ padding: "10px", border: "1px solid #ccc", borderRadius: "10px" }}>
              {event.flyerStorageURL && <FirestoreImage src={event.flyerStorageURL.toString()} />}
              <div style={{ marginBottom: "5px", fontSize: "1.2em", fontWeight: "bold" }}>{event.name}</div>
              <div>{event.description}</div>
              <div>
                <button onClick={() => handleEdit(event.id)} style={{ marginTop: "10px", padding: "5px 10px" }}>
                  Edit
                </button>
              </div>
            </div>
          ))}
        </>
      )}
    </div>
  );
};

export default Dashboard;
