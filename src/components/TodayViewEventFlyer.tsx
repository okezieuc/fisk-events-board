import React from "react";
import FirestoreImage from "./FirestoreImage";

type TodayViewEventFlyerProps = {
  src: string;
};

// TODO: Have the image expand to occupy all space available to it
// TODO: Load the two next images after the current, so that image loads are instant
export default function TodayViewEventFlyer(props: TodayViewEventFlyerProps) {
  return (
    <div className="grow">
      <FirestoreImage src={props.src} classExtension="rounded-3xl shadow-2xl" />
    </div>
  );
}
