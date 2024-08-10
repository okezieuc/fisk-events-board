
import React, { useCallback, useEffect, useState } from "react";
import { fetchImageURLFromStorage } from "../services/firebase";

type FirestoreImageProps = {
  src: string,
  containerStyle?: string,
  imageStyle?: string,
};

export default function FirestoreImage({src, containerStyle= '', imageStyle= ''}: FirestoreImageProps) {
  const [imageURL, setImageURL] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');

  const loadImageURL = useCallback(async () => {
    // sets to loading state (probably a spinner)
    setIsLoading(true);

    try {
      const _imgURL = await fetchImageURLFromStorage(src);
      setImageURL(_imgURL); // sets img url if no errors
    } catch (err) {
      // catches the error. 
      // Error probably to be used in the rendering somehow.

      if (err instanceof Error) {
        setError(`Error loading image: ${err}`);
      }
    } finally {
      // resets the loading state
      setIsLoading(false);
    }
  }, [ src ]);

  useEffect(() => {
    loadImageURL();
  }, [ loadImageURL ]);

  if (isLoading) {
    return <div>{"...Loading"}</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div className={containerStyle}>
      <img src={imageURL} alt={imageURL} className={imageStyle} />
    </div>
  );
}