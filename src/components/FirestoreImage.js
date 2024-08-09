
import { useEffect, useState } from "react";
import { fetchImageURLFromStorage } from "../services/firebase.ts";

export default function FirestoreImage({
  src,
}) {
  const [imageURL, setImageURL] = useState();
  const [isLoading, setIsLoading] = useState(null);
  const [error, setError] = useState('');

  useEffect(() => {
    // sets to loading state (probably a spinner)
    setIsLoading(true);

    fetchImageURLFromStorage(src)
      .then((_imgURL) => {
        // sets the image URL if no errors
        setImageURL(_imgURL);
      })
      .catch((err) => {
        // catches the error. 
        // Error probably to be used in the rendering somehow.
        setError(err);
        console.error(err);
      })
      .finally(() => {
        // resets the loading state
        setIsLoading(false);
      });
  }, [src]);

  return <div>{isLoading ? "...Loading" : <img src={imageURL} style={{ maxHeight: '300px' }}/>}</div>;
}