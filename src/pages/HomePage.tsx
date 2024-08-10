import React, { useEffect, useState } from "react";
import FirestoreImage from "../components/FirestoreImage";

import { fetchEventsData } from "../services/firebase";
import type { Event } from "../services/firebase";

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
    }

    getEventsData();
  }, []);

  return (
    <div className="max-w-2xl mx-auto grid grid-cols-2 gap-4">
      <h1 className="mb-5 text-center col-span-2">Fisk events board</h1>
      {loading ? (
        "Loading..."
      ) : error ? (
        <>{error}</>
      ) : (
        <>
          {events.map((event) => (
            <EventCard key={event.id} event={event} />
          ))}
        </>
      )}
    </div>
  );
}

const EventCard = ({ event }: { event: Event }) => {
  return (
    <div className="p-4 border border-gray-200 rounded-lg shadow-md">
      {event.flyerStorageURL && (
        <FirestoreImage src={event.flyerStorageURL.toString()} imageStyle="max-h-72"/>
      )}
      <div className="mb-1.5 text-lg font-bold">
        {event.name}
      </div>
      <div>{event.description}</div>
    </div>
  )
};