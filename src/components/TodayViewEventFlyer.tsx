import React from "react";
import FirestoreBackgroundImage from "./FirestoreBackgroundImage";

type TodayViewEventFlyerProps = {
  src: string;
};

// TODO: Have the image expand to occupy all space available to it
// TODO: Load the two next images after the current, so that image loads are instant
export default function TodayViewEventFlyer(props: TodayViewEventFlyerProps) {
  return (
    <div className="grow">
      <FirestoreBackgroundImage
        src={props.src}
        classExtension="rounded-3xl shadow-2xl h-full w-full bg-center bg-cover"
      />
    </div>
  );
}
