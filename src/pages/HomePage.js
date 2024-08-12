import { useEffect, useState } from "react";
import FirestoreImage from "../components/FirestoreImage";
import { fetchEventsData } from "../services/firebase";

export default function Home() {
  const [loading, setLoading] = useState(true);
  const [events, setEvents] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const getEventsData = async () => {
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
    };

    getEventsData();
  }, []);

  return <Container>
    <HomePageEvent schoolEvent={events ? events[0] : null} />
  </Container>;
}

// TODO: Choose to keep bg-stone-50 or use a different, custom color for the background.
function Container({ children }) {
  return (
    <div className="flex flex-col max-w-screen-sm bg-stone-50 mx-auto h-screen py-16 px-12 gap-6">
      {children}
    </div>
  );
}

// TODO: Display some loading indicator like thing instead of this

function HomePageEvent({schoolEvent}) {
  return schoolEvent ?
    ( <>
    {
      JSON.stringify(schoolEvent)
    }
      <Header />
      <FlyerContainer />
      <Description />
      <NavigationBar />
    </>
  ) : null;
}

function Header() {
  return (
    <div className="flex items-center">
      <div className="grow">
        <h1 className="text-4xl font-bold">Today</h1>
        <div className="text-zinc-600 text-sm mt-2">
          Click to view weekly wrap
        </div>
      </div>
      <div className="text-zinc-600 text-sm">5 events</div>
    </div>
  );
}

// TODO: Consider reducing the font weight of event description text
function Description() {
  return (
    <div>
      <h2 className="font-bold">Spring Showcase: Open Mic Night</h2>
      <div className="text-zinc-600 text-sm">
        <p>Go Poetry</p>
        <p>5pm @ The Groove</p>
        <p className="line-clamp-2 mt-4">
          Kick off National Poetry Month with Go! at our Spring Showcase 8! As
          part of the Spring Arts Festival, Go! Poetry is hosting an open mic
          night on Cravath Grove, April 1st @ 5PM. Let your creativity bloom on
          stage and join us for a night of music, poetry, and vibes!!
        </p>
      </div>
    </div>
  );
}

function FlyerContainer() {
  return <div className="bg-red-200 grow shadow-2xl rounded-3xl"></div>;
}

// TODO: Replace the text here with actual icons.
// TODO: Create a custom shadow option for the buttons or explore alternatives.
function NavigationBar() {
  return (
    <div className="flex">
      <div className="text-white bg-black p-2 rounded text-xs">Left</div>
      <div className="grow"></div>
      <div className="text-white bg-black p-2 rounded text-xs">Right</div>
    </div>
  );
}
