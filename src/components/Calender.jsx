import React, { useState, useEffect, useRef, useCallback } from "react";
import axios from "axios";
import { Calendar, dateFnsLocalizer } from "react-big-calendar";
import getDay from "date-fns/getDay";
import parse from "date-fns/parse";
import "../style/Calend.css"
import { Scrollbars } from 'react-custom-scrollbars';
import { isWithinInterval, format } from 'date-fns';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import { startOfWeek, endOfWeek, startOfMonth, endOfMonth, startOfDay, endOfDay } from 'date-fns';



const locales = {
    "en-US": require("date-fns/locale/en-US"),
};

const localizer = dateFnsLocalizer({
    format,
    parse,
    startOfWeek: (date) => startOfWeek(date, { weekStartsOn: 1 }),
    getDay,
    locales,
});






const Calender = () => {
    const [events, setEvents] = useState([]);
    const [currentView, setCurrentView] = useState("month");
    const [currentDate, setCurrentDate] = useState(new Date());
    const [SelectedEvent, setSelectedEvent] = useState("");
    const handleViewChange = (newView) => {
        setCurrentView(newView);
    };

    let startDate = startOfWeek(currentDate);
    let endDate = endOfWeek(currentDate);



    const [showModal, setShowModal] = useState(false);
    const handleSelectEvent = (event) => {
        setSelectedEvent(event);
        setShowModal(true);
    };


    const handleCloseModal = () => {
        setShowModal(false);
    };


    useEffect(() => {
        axios.get(`http://localhost:5000/booking/getBookingsByDateRange`, {
            params: {
                startDate: startDate.toISOString(),
                endDate: endDate.toISOString(),
            }
        })
            .then((response) => {
                console.log(response.data)
                const bookingEvents = response.data.map((booking) => ({
                    title: booking.trip_name,
                    start: new Date(booking.startdate),
                    end: new Date(booking.enddate),
                    deptor_place: booking.deptor_place,
                    summary: booking.summary,
                    status_code: booking.status_code,
                    number: booking.number,
                    company_name: booking.company_name,
                    contact_first_name: booking.contact_first_name,

                    bookingelements: booking.booking_elements.map((element) => ({
                        element_name: element.element_name,
                        start: new Date(element.startdate),
                        end: new Date(element.enddate),
                        starttime: element.starttime,
                        endtime: element.endtime,
                        supplier_place: element.supplier_place,

                    })),

                }));
                setEvents(bookingEvents);
            })
            .catch((error) => {
                console.error("Erreur lors de la récupération des réservations :", error);
            });
    }, [currentDate, currentView]);

    const customDayFormat = (date, culture, localizer) => {
        const formattedDate = localizer.format(date, 'dd/MM/yyyy', culture);
        const dayOfWeek = localizer.format(date, 'EEEE', culture);
        return `${dayOfWeek} ${formattedDate}`;
    };


    return (
        <>
            <Calendar
                formats={{
                    dayFormat: (date, culture, localizer) =>
                        customDayFormat(date, culture, localizer),
                }}
                localizer={localizer}
                startAccessor="start"
                endAccessor="end"
                style={{ height: 1000 }}
                events={events}
                onView={handleViewChange}
                onNavigate={(newDate) => setCurrentDate(newDate)}
                onSelectEvent={(event) => handleSelectEvent(event)}
                showAllEvents
            />
            <Modal show={showModal} onHide={handleCloseModal}>
                <Modal.Header closeButton>
                    <Modal.Title>{SelectedEvent.title}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div className="event-details-label">Booking:</div>
                    <div className="event-details-value">{SelectedEvent.number}</div>
                    <div className="event-details-label">Company Name:</div>
                    <div className="event-details-value">{SelectedEvent.company_name}</div>
                    <div className="event-details-label">Deptor Place:</div>
                    <div className="event-details-value">{SelectedEvent.deptor_place}</div>
                    {SelectedEvent.bookingelements?.length > 0 && (
                        <div className="event-details-bookingelements-container">
                            <h3>Activities Details</h3>
                            {SelectedEvent.bookingelements.map((element, index) => (
                                <div key={index} className="event-details-bookingelement">
                                    <p className="event-details-bookingelement-name">{element.element_name}</p>
                                    <div className="event-details-bookingelement-details">
                                        <div className="event-details-bookingelement-detail">
                                            <label>Start:</label>
                                            <span>{element.start.toLocaleString()}</span>
                                        </div>

                                        <div className="event-details-bookingelement-detail">
                                            <label>End:</label>
                                            <span>{element.end.toLocaleString()}</span>
                                        </div>
                                    </div>
                                    <div className="event-details-bookingelement-details">
                                        <div className="event-details-bookingelement-detail">
                                            <label>Starttime:</label>
                                            <span>{element.starttime.toLocaleString()}</span>
                                        </div>

                                        <div className="event-details-bookingelement-detail">
                                            <label>EndTime:</label>
                                            <span>{element.endtime.toLocaleString()}</span>
                                        </div>
                                    </div>
                                    <div className="event-details-bookingelement-detail">
                                        <label>Supplier Place:</label>
                                        <span>{element.supplier_place || "None"}</span>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleCloseModal}>
                        Close
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    )
}

export default Calender
