import React, { useState, useEffect } from 'react';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from "moment";
import "react-big-calendar/lib/css/react-big-calendar.css";

const localizer = momentLocalizer(moment);

function TrainingCalendar() {
	const [trainings, setTrainings] = useState([]);

    useEffect(() => {
        fetchTrainings();
    }, [])

    const fetchTrainings = () => {
        fetch('https://customerrest.herokuapp.com/gettrainings')
        .then(response => response.json())
        .then(data => setTrainings(data))
        .catch(err => console.error(err))
    };

    const myEventsList = trainings.map(tr => {
        let date = new Date(tr.date)
        
        const eventsDetails = {
            start: date,
            end: new Date(moment(date).add(tr.duration, "minutes")),
            title: tr.activity + '/' + tr.customer.firstname + ' ' + tr.customer.lastname
        }
  
        return eventsDetails
	});

    return (
        <div>
            <Calendar
                localizer={localizer}
                events={myEventsList}
                startAccessor="start"
                endAccessor="end"
                style={{ height: 500 }}
            />
        </div>
    );
}

export default TrainingCalendar;