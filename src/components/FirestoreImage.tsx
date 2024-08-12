
import React, { useEffect, useState } from "react";
import { fetchImageURLFromStorage } from "../services/firebase";

type FirestoreImageProps = {
  src: string,
};

export default function FirestoreImage(props: FirestoreImageProps) {
  const [imageURL, setImageURL] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');

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
    <div>
      <img src={imageURL} alt={imageURL} style={{ maxHeight: '300px' }}/>
    </div>
  );
}