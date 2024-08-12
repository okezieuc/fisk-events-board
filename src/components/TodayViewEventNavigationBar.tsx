import React from "react";

type TodayViewEventNavigationBarProps = {
  setCurrentEventIndex: React.Dispatch<React.SetStateAction<number>>;
  eventCount: number;
};

// TODO: Replace the text here with actual icons.
// TODO: Create a custom shadow option for the buttons or explore alternatives.
export default function TodayViewEventNavigationBar(
  props: TodayViewEventNavigationBarProps
) {
  return (
    <div className="flex">
      <button
        className="text-white bg-black p-2 rounded text-xs"
        onClick={() =>
          props.setCurrentEventIndex(
            (index) => (index + props.eventCount - 1) % props.eventCount
          )
        }
      >
        Left
      </button>
      <div className="grow"></div>
      <button
        className="text-white bg-black p-2 rounded text-xs"
        onClick={() =>
          props.setCurrentEventIndex((index) => (index + 1) % props.eventCount)
        }
      >
        Right
      </button>
    </div>
  );
}
