import React, { useState } from 'react';

import { getFirestore, collection, addDoc } from "firebase/firestore";
import { ref, uploadBytes } from "firebase/storage"
import { app, storage } from '../services/firebase.ts';

import { useAuth } from '../contexts/AuthContext';

import { v4 as uuidv4 } from 'uuid';

const db = getFirestore(app);

function CreateEventPage() {
    const {signOut} = useAuth();

    const [eventDetails, setEventDetails] = useState({
        eventName: '',
        eventDate: '',
        eventDescription: '',
        eventFlyerLocation: ''
    });

    const [flyer, setFlyer] = useState(null);
    const [imgData, setImgData] = useState(null);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setEventDetails({
            ...eventDetails,
            [name]: value,
        });
    };

    const handleFlyerChange = (e) => {
        console.log(e.target.files)

        if (e.target.files && e.target.files.length > 0) {
            setFlyer(e.target.files[0])
            console.log("picture: ", e.target.files);
            const reader = new FileReader();
            reader.addEventListener("load", () => {
                setImgData(reader.result);
            });
            reader.readAsDataURL(e.target.files[0]);
        } else {
            setFlyer(null);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        // You can handle form submission here, e.g., sending the data and flyer to a server.

        if (flyer !== null) {
            const fileLocation = `flyers/${uuidv4()}.${flyer.name.split('.').pop()}`;
            const uploadRef = ref(storage, `${fileLocation}`);

            uploadBytes(uploadRef, flyer).then((snapshot) => {
                setEventDetails({
                    ...eventDetails,
                    eventFlyerLocation: fileLocation,
                });

                // state update appears to take a while. so we explicitly reinclude
                // the event flyer location here.
                addDoc(collection(db, "events"), {
                    ...eventDetails,
                    eventFlyerLocation: fileLocation,
                }).then((snapshot) => {
                    console.log(snapshot);
                }).catch((error) => {
                    console.error("Couldn't upload to the collection.")
                });
            }).catch((error) => {
                console.error("Couldn't upload image.");
            }).finally(() => {
                console.log("Moving on...");
            });
        }
    };

    return (
        <div>
            <h2>Create Event</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="eventName">Event Name:</label>
                    <input
                        type="text"
                        id="eventName"
                        name="eventName"
                        value={eventDetails.eventName}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div>
                    <label htmlFor="eventDate">Event Date:</label>
                    <input
                        type="date"
                        id="eventDate"
                        name="eventDate"
                        value={eventDetails.eventDate}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div>
                    <label htmlFor="eventDescription">Event Description:</label>
                    <textarea
                        id="eventDescription"
                        name="eventDescription"
                        value={eventDetails.eventDescription}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div>
                    <label htmlFor="flyer">Upload Flyer:</label>
                    <input
                        type="file"
                        id="flyer"
                        name="flyer"
                        accept="image/*"
                        onChange={handleFlyerChange}
                    />
                </div>

                {flyer && (
                    <div>
                        <img src={imgData} alt="Preview" style={{ maxWidth: '100%', maxHeight: '200px' }} />
                    </div>
                )}
                <div>
                    <button type="submit">Create Event</button>
                </div>
            </form>
            <br/>
            <button onClick={() => {signOut()}}>Sign Out</button>
        </div>
    );
}

export default CreateEventPage;

