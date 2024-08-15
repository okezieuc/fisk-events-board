import React, { useEffect, useState } from "react";
import { fetchImageURLFromStorage } from "../services/firebase";

type FirestoreImageProps = {
  src: string;
  classExtension?: string;
};

// replace loading text with actual spinning indicator
export default function FirestoreBackgroundImage(props: FirestoreImageProps) {
  const [imageURL, setImageURL] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    // sets to loading state (probably a spinner)
    setIsLoading(true);

    fetchImageURLFromStorage(props.src)
      .then((_imgURL) => {
        // sets the image URL if no errors
        setImageURL(_imgURL);
      })
      .catch((err) => {
        // catches the error.
        // Error probably to be used in the rendering somehow.
        setError(err);
      })
      .finally(() => {
        // resets the loading state
        setIsLoading(false);
      });
  }, [props.src]);

  if (isLoading) {
    return <div>{"...Loading"}</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div
      style={{
        backgroundImage: `url("${imageURL}")`,
      }}
      className={props.classExtension}
    ></div>
  );
}
