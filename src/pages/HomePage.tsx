import React, { useEffect, useState } from "react";
import FirestoreImage from "../components/FirestoreImage";
import AppContainer from "../components/AppContainer";
import { fetchEventsData } from "../services/firebase";
import type { Event } from "../services/firebase";
import AppHeader from "../components/AppHeader";

export default function Home() {
  const [loading, setLoading] = useState(true);
  const [events, setEvents] = useState<Event[]>([]);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const getEventsData = async () => {
      // ensures is loading
      setLoading(true);

      try {
        // gets the events and stores them
        const _events = await fetchEventsData();
        console.log(_events);
        setEvents(_events);
      } catch (err) {
        // error could come in handy later
        if (err instanceof Error) {
          console.log(err);
          setError(err);
        }
      } finally {
        // ensures is not loading
        setLoading(false);
      }
    };

    getEventsData();
  }, []);

  return (
    <AppContainer>
      <AppHeader
        title="Today"
        subtitle="Click to view weekly wrap"
        rightSideText="? events"
      />
      <div
        style={{
          maxWidth: "800px",
          margin: "0 auto",
          display: "grid",
          gridTemplateColumns: "repeat(2, 1fr)",
          gap: "15px",
        }}
      >
        {loading ? (
          "Loading..."
        ) : error ? (
          <>{error}</>
        ) : (
          <>
            {events.map((event) => (
              <div
                key={event.id}
                style={{
                  padding: "10px",
                  border: "1px solid #ccc",
                  borderRadius: "10px",
                }}
              >
                {event.flyerStorageURL && (
                  <FirestoreImage src={event.flyerStorageURL.toString()} />
                )}
                <div
                  style={{
                    marginBottom: "5px",
                    fontSize: "1.2em",
                    fontWeight: "bold",
                  }}
                >
                  {event.name}
                </div>
                <div>{event.description}</div>
              </div>
            ))}
          </>
        )}
      </div>
    </AppContainer>
  );
}
