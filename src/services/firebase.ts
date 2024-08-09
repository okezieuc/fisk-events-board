import { initializeApp } from "firebase/app";
import { getAuth, User } from "firebase/auth";
import { addDoc, collection, getDocs, getFirestore, Timestamp } from "firebase/firestore";
import { getStorage, getDownloadURL, ref, uploadBytes, StorageReference } from "firebase/storage";

import * as utils from "../utils/firebaseUtils";

const firebaseConfig = {
  apiKey: "AIzaSyCWReDRCN3szdhefs9PshevaAYEMgximjA",
  authDomain: "fisk-events-board.firebaseapp.com",
  projectId: "fisk-events-board",
  storageBucket: "fisk-events-board.appspot.com",
  messagingSenderId: "316693740020",
  appId: "1:316693740020:web:9deb54efed4aa06ea9e1a1",
};

export type Event = {
  id: string,
  name: string,
  dateTime: Timestamp,
  description: string,

  flyerStorageURL: StorageReference,
  flyerDownloadURL: string | null,
  flyerData: File | null,
};

export type EventInputObject = {
  name: string,
  dateTime: Timestamp,
  description: string,

  flyerData: File,
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const storage = getStorage(app);
export const store = getFirestore(app);

const eventsRef = collection(store, "events");

export const fetchImageURLFromStorage = async (src: string) => {
  const imageRef = ref(storage, src);
  return await getDownloadURL(imageRef);
};

export const fetchEventsData = async (): Promise<Event[]> => {
  const querySnapshot = await getDocs(eventsRef);
  
  const events: Event[] = querySnapshot.docs.map(
    (doc) => {
      const _data = doc.data();
      return {
        id: doc.id,
        name: _data.eventName as string,
        dateTime: _data.eventDateTime as Timestamp,
        description: _data.eventDescription as string,
        flyerStorageURL: _data.eventFlyerRef as StorageReference,
        
        flyerDownloadURL: null,
        flyerData: null,
      };
    }
  );

  return events;
}

export const storeEvent = async (user: User, data: EventInputObject): Promise<void> => {
  if (!data.flyerData.type.startsWith("image/")) {
    throw Error('The flyer file must be an image file');
  }

  const normalizedFileName = utils.normalizeStoragePath(user.uid + "-" + data.name + "-" + data.dateTime.toString() + "-" + Timestamp.now().toString());
  const fileLocation = `flyers/${normalizedFileName}`;

  const uploadRef = ref(storage, fileLocation);
  await uploadBytes(uploadRef, data.flyerData);

  addDoc(eventsRef, {
    eventName: data.name,
    eventDataTime: data.dateTime,
    eventDescription: data.description,
    eventFlyerRef: uploadRef.toString(),
  })
};