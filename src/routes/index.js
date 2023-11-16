import { useState } from "react";

export default function Index() {
  const [loading, setLoading] = useState(true);

  return (
    <>
      <h1>Fisk events board</h1>
      {loading ? "loading" : <h2>Events</h2>}
    </>
  );
}
