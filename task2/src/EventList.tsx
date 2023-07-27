import React, { useState, useEffect } from "react";
import { authenticate, getEventsByMonth, Event } from "./apiService"

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
            <ul>
                {events.map((event) => (
                    <li key={event.id}>
                        <h2>{event.title}</h2>
                        <img src={event.images.mobile} alt={event.title} />
                        <p dangerouslySetInnerHTML={{ __html: event.description }} />
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default EventList;
