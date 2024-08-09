import React, { useCallback, useState , useEffect } from 'react';

import { storeEvent} from '../services/firebase';
import { useAuth } from '../contexts/AuthContext';
import { nullthrows } from '../utils/variableUtils';
import { dateTimeToTimestamp } from '../utils/firebaseUtils';

type EventDetails = {
    name: string,
    date: string,
    time: string,
    description: string
};

function CreateEventPage() {
    const { user, signOut } = useAuth();

    const [eventDetails, setEventDetails] = useState<EventDetails>({
        name: '', date: '', time: '', description: ''
    });

    const [flyer, setFlyer] = useState<File | null>(null);
    const [imagePreviewUrl, setImagePreviewUrl] = useState<string | null>(null);

    useEffect(() => {
        if (flyer) {
          const url = URL.createObjectURL(flyer);
          setImagePreviewUrl(url);
    
          // Clean up the URL object when the component unmounts or when the file changes
          return () => {
            URL.revokeObjectURL(url);
          };
        } 
        return;
      }, [flyer]);

    const handleChange = (event: React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLTextAreaElement>) => {
        const { name, value } = event.target;
        setEventDetails({
            ...eventDetails,
            [name]: value,
        });
    };

    const handleFlyerChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const files = nullthrows(event.target.files);
        return setFlyer(files.item(0));
    };

    const handleSubmit = useCallback(async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        console.log("submitting...");
        // You can handle form submission here, e.g., sending the data and flyer to a server.

        if (user !== null && flyer !== null) {
            try {
                storeEvent(user, {
                    name: eventDetails.name,
                    description: eventDetails.description,
                    dateTime: dateTimeToTimestamp(eventDetails.date, eventDetails.time),
                    flyerData: flyer,
                });
            } catch(error) {
                console.log(error);
            } finally {
                console.log("Moving on...");
            };
        }
    }, [user, flyer, eventDetails]);

    return (
        <div>
            <h2>Create Event</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="name">Event Name:</label>
                    <input
                        type="text"
                        id="name"
                        name="name"
                        value={eventDetails.name}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div>
                    <label htmlFor="date">Event Date:</label>
                    <input
                        type="date"
                        id="date"
                        name="date"
                        value={eventDetails.date}
                        onChange={handleChange}
                        required
                    />
                    <br/>
                    <label htmlFor='time'> Event Time:</label>
                    <input
                        type="time"
                        id="time"
                        name="time"
                        value={eventDetails.time}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div>
                    <label htmlFor="description">Event Description:</label>
                    <textarea
                        id="description"
                        name="description"
                        value={eventDetails.description}
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

                {flyer && imagePreviewUrl && (
                    <div>
                        <img src={imagePreviewUrl} alt="Preview" style={{ maxWidth: '100%', maxHeight: '200px' }} />
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
