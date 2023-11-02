import React, { useState } from 'react';
import { getFirestore, collection, addDoc } from "firebase/firestore";
import app from "../utils/firebase";

const db = getFirestore(app);


function CreateEventPage() {
    const [eventDetails, setEventDetails] = useState({
        eventName: '',
        eventDate: '',
        eventDescription: '',
    });

    const [flyer, setFlyer] = useState(null);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setEventDetails({
            ...eventDetails,
            [name]: value,
        });
    };

    const handleFlyerChange = (e) => {
        const file = e.target.files[0];
        setFlyer(file);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        // You can handle form submission here, e.g., sending the data and flyer to a server.
        const docRef = await addDoc(collection(db, "events"), eventDetails)
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
                        accept=".jpg, .jpeg, .png, .pdf"
                        onChange={handleFlyerChange}
                    />
                </div>
                <div>
                    <button type="submit">Create Event</button>
                </div>
            </form>
        </div>
    );
}

export default CreateEventPage;

