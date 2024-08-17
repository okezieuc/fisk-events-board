import React from "react";

type TodayViewEventNavigationBarProps = {
  setCurrentEventIndex: React.Dispatch<React.SetStateAction<number>>;
  eventCount: number;
  currentSlide: number;
};

// TODO: Replace the text here with actual icons.
// TODO: Create a custom shadow option for the buttons or explore alternatives.
// TODO: Replace the text here with actual icons.
// TODO: Create a custom shadow option for the buttons or explore alternatives.
// export default function TodayViewEventNavigationBar(
//   props: TodayViewEventNavigationBarProps
// ) {
//   return (
//     <div className="flex">
//       <button
//         className="text-white bg-black p-2 rounded text-xs"
//         onClick={() =>
//           props.setCurrentEventIndex(
//             (index) => (index + props.eventCount - 1) % props.eventCount
//           )
//         }
//       >
//         Left
//       </button>
//       <div className="grow"></div>
//       <button
//         className="text-white bg-black p-2 rounded text-xs"
//         onClick={() =>
//           props.setCurrentEventIndex((index) => (index + 1) % props.eventCount)
//         }
//       >
//         Right
//       </button>
//     </div>
//   );
// }

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
        className={`flex items-center justify-center text-white bg-black p-2 rounded-lg text-xs cursor-pointer h-9 w-11 shadow-2xl ${
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
        <i data-feather="arrow-right" className="h-3 w-3"></i>
      </button>
    </div>
  );
}
