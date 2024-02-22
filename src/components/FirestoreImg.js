import app from "../utils/firebase";
import { getDownloadURL, getStorage, ref } from "firebase/storage";
import { useEffect, useState } from "react";

const storage = getStorage(app);

export default function FirestoreImg({
  src,
}) {
  const [imageURL, setImageURL] = useState();

  async function fetchImage() {
    const imageRef = ref(storage, src);

    getDownloadURL(imageRef).then((url) => {
      setImageURL(url);
    });
  }

  useEffect(() => {
    fetchImage();
  }, []);

  return (
    <>
      <img src={imageURL} />
    </>
  );
}