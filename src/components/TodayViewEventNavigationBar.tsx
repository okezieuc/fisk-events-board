import React from "react";

type TodayViewEventNavigationBarProps = {
  setCurrentEventIndex: React.Dispatch<React.SetStateAction<number>>;
  eventCount: number;
  currentSlide: number;
};

export default function TodayViewEventNavigationBar(
  props: TodayViewEventNavigationBarProps
) {
  return (
    <div className="flex">
      <button
        className={`flex items-center justify-center text-white bg-black p-2 rounded-lg text-xs cursor-pointer h-9 w-11 shadow-2xl ${
          props.currentSlide === 0 ? "opacity-50" : ""
        }`}
        onClick={
          props.currentSlide === 0
            ? undefined
            : () =>
                props.setCurrentEventIndex(
                  (index) => (index + props.eventCount - 1) % props.eventCount
                )
        }
      >
        <i data-feather="arrow-left" className="h-3 w-3"></i>
      </button>
      <div className="grow"></div>
      <button
        className={`flex items-center justify-center text-white bg-black p-2 rounded-lg text-xs cursor-pointer h-9 w-16 shadow-2xl ${
          props.currentSlide === props.eventCount - 1 ? "opacity-50" : ""
        }`}
        onClick={
          props.currentSlide === props.eventCount - 1
            ? undefined
            : () =>
                props.setCurrentEventIndex(
                  (index) => (index + 1) % props.eventCount
                )
        }
      >
        <div className="flex gap-2 items-center">
          <span className="font-semibold tracking-tight">Next</span>
          <i data-feather="arrow-right" className="h-3 w-3"></i>
        </div>
      </button>
    </div>
  );
}
