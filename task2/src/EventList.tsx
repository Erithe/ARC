import React, { useState, useEffect } from "react";
import { authenticate, getEventsByMonth, Event } from "./apiService"
import {decode} from "html-entities"

const EventList: React.FC = () => {
    const [events, setEvents] = useState<Event[]>([]);
    const [selectedMonth, setSelectedMonth] = useState<number>(8);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const token = await authenticate();
                return getEventsByMonth(selectedMonth, token);
            } catch (error) {
                console.error("Failed to fetch events:", error);
                throw error;
            }
        };

        fetchData()
            .then((eventsData) => {
                setEvents(eventsData);
            })
            .catch((error) => {
                console.error("Failed to display events:", error);
            });
    }, [selectedMonth]);

    const handleMonthChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        setSelectedMonth(parseInt(event.target.value));
    };


    return (
        <div>
            <h1>Event List</h1>
            <select value={selectedMonth} onChange={handleMonthChange}>
                <option value={8}>August</option>
                <option value={9}>September</option>
                <option value={10}>October</option>
                <option value={11}>November</option>
                <option value={12}>December</option>

            </select>

            {events.map((event) => (
                <div key={event.id} className="event-card">
                    <h2>{event.title}</h2>
                    <div className="event-image-wrapper">
                        <img
                            className="event-image desktop-image"
                            src={event.images.desktop}
                            alt={event.title}
                        />
                        <img
                            className="event-image tablet-landscape"
                            src={event.images.tablet_land}
                            alt={event.title}
                        />
                        <img
                            className="event-image tablet-portrait"
                            src={event.images.tablet_port}
                            alt={event.title}
                        />
                        <img
                            className="event-image mobile-image"
                            src={event.images.mobile}
                            alt={event.title}
                        />
                    </div>
                    <div>
                        <p dangerouslySetInnerHTML={{ __html: decode(event.description)}} />
                    </div>
                </div>
            ))}
        </div>
    );
};

export default EventList;
