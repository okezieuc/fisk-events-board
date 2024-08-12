import React from "react";
import FirestoreImage from "./FirestoreImage";

type TodayViewEventFlyerProps = {
  src: string;
};

export default function TodayViewEventFlyer(props: TodayViewEventFlyerProps) {
  return (
    <div className="grow">
      <FirestoreImage src={props.src} classExtension="rounded-3xl shadow-2xl" />
    </div>
  );
}
