import React, { PropsWithChildren } from "react";

// TODO: Consider creating a custom max width that is much smaller than 640px
// TODO: Choose to keep bg-stone-50 or use a different, custom color for the background.
// TODO: Move all style related to preventing scrolling and having vertical flex to TodayViewContainer
export default function AppContainer(props: PropsWithChildren) {
  return (
    <div className="bg-stone-50">
      <div className="flex flex-col max-w-screen-sm  mx-auto h-screen py-16 px-12 gap-6">
        {props.children}
      </div>
    </div>
  );
}
