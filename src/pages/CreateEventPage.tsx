import React, { useCallback, useState , useEffect } from 'react';

import { storeEvent} from '../services/firebase';
import { useAuth } from '../contexts/AuthContext';
import { nullthrows } from '../utils/variableUtils';
import { dateTimeToTimestamp } from '../utils/firebaseUtils';

type EventDetails = {
    name: string,
    date: string,
    time: string,
    description: string,
    organizer: string,
    location: string,
    attire: string,
};

function CreateEventPage() {
    const { user, signOut } = useAuth();

    const [eventDetails, setEventDetails] = useState<EventDetails>({
        name: '', date: '', time: '', description: '',
        organizer: '', location: '', attire: ''
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
                    organizer: eventDetails.organizer,
                    location: eventDetails.location,
                    attire: eventDetails.attire
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
                    <HTMLTextInputComponent name="name" type="text" value={eventDetails.name} onChange={handleChange}/>
                </div>
                <div>
                    <HTMLTextInputComponent name="date" type="date" value={eventDetails.date} onChange={handleChange}/>
                    <br/>
                    <HTMLTextInputComponent name="time" type="time" value={eventDetails.time} onChange={handleChange}/>
                </div>
                <div>
                    <HTMLTextInputComponent name="description" isTextArea type="" value={eventDetails.description} onChange={handleChange}/>
                    <br/>
                    <HTMLTextInputComponent name="organizer" type="text" value={eventDetails.organizer} onChange={handleChange}/>
                    <br/>
                    <HTMLTextInputComponent name="location" type="text" value={eventDetails.location} onChange={handleChange}/>
                    <br/>
                    <HTMLTextInputComponent name="attire" type="text" value={eventDetails.attire} onChange={handleChange} isOptional/>
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

// temporary to be deprecated on styling update
const HTMLTextInputComponent = (props: {
    name: string, 
    type: string, 
    value: string, 
    onChange: (event: React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLTextAreaElement>) => void, 
    isTextArea?: boolean
    isOptional?: boolean
}) => {
    return (
        <>
            <label htmlFor={props.name}>Event {props.name[0].toUpperCase() + props.name.slice(1)}:</label>
            {props.isTextArea ? 
                <textarea
                    className='border border-gray-300'
                    id={props.name}
                    name={props.name}
                    value={props.value}
                    onChange={props.onChange}
                    required={!props.isOptional}
                />
            :    <input
                    className='border border-gray-300'
                    type={props.type}
                    id={props.name}
                    name={props.name}
                    value={props.value}
                    onChange={props.onChange}
                    required={!props.isOptional}
                />
            }
        </>
    )
}

export default CreateEventPage;
