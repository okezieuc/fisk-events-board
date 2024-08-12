import React from "react";

export default function AppHeader({
  title,
  subtitle,
  rightSideText,
}: {
  title: string;
  subtitle: string;
  rightSideText: string;
}) {
  return (
    <div className="flex items-center">
      <div className="grow">
        <h1 className="text-4xl font-bold">{title}</h1>
        <div className="text-zinc-600 text-sm mt-2">{subtitle}</div>
      </div>
      <div className="text-zinc-600 text-sm">{rightSideText}</div>
    </div>
  );
}
