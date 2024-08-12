import React from "react";
import type { Event } from "../services/firebase";

type TodayViewEventDescriptionProps = {
  event: Event;
};

// TODO: Replace xpm with a time formatted like 5:30pm, 6am, etc.
// TODO: Replace the placeholders for the location of the event
export default function TodayViewEventDescription(
  props: TodayViewEventDescriptionProps
) {
  return (
    <div>
      <h2 className="font-bold">{props.event.name}</h2>
      <div className="text-zinc-600 text-sm">
        <p>Organizer</p>
        <p>xpm @ The Groove</p>
        <p className="line-clamp-2 mt-4">{props.event.description}</p>
      </div>
    </div>
  );
}
