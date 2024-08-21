import React from "react";
import type { Event } from "../services/firebase";
import TodayViewEventDescription from "./TodayViewEventDescription";
import TodayViewEventFlyer from "./TodayViewEventFlyer";

type TodayViewEventProps = {
  event: Event | null;
};

// TODO: Consider creating a custom max width that is much smaller than 640px
// TODO: Choose to keep bg-stone-50 or use a different, custom color for the background.
// TODO: The check for whether props.event is not null was done to make it easier to add
// new code in bits. Do we want to always make this check, or do we want to have the
// component assume it is guaranteed that an event is passed?
export default function TodayViewEvent(props: TodayViewEventProps) {
  return props.event ? (
    <>
      <TodayViewEventFlyer src={props.event.flyerStorageURL.toString()} />
      <TodayViewEventDescription event={props.event} />
    </>
  ) : (
    <>???</>
  );
}
