import React from "react";
import type { Event } from "../services/firebase";

// TODO: Consider creating a custom max width that is much smaller than 640px
// TODO: Choose to keep bg-stone-50 or use a different, custom color for the background.
export default function TodayPageEvent(props: { event: Event }) {
  return <div>{props.event.name}</div>;
}
