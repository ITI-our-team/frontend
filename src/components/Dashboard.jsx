import React from 'react'
import { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom'
import Service from './Service.jsx';
import { Link } from 'react-router-dom';
import toast from 'react-hot-toast';
import './Dashboard.css'

function Dashboard({ api_url }) {
    const [openServices, setOpenServices] = useState(false);
    const navigate = useNavigate();
    const [bookings, setBookings] = useState([]);
    const scrollToTop = () => {
        window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
    };
    const [isLoading, setIsLoading] = useState(false);
    const [myData, setMyData] = useState([]);
    const userToken = localStorage.getItem("userToken");
    const username = localStorage.getItem("username");
    async function getservices() {
        setIsLoading(true);
        const API_URL = `${api_url}api/services/?vendor=${username}`;
        try {
            const response = await fetch(API_URL, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Token ${userToken}`
                }
            });
            const result = await response.json();
            if (response.ok) {
                // alert("Data retrieved successful!");
                console.log(result);
                setMyData(result || []);
            } else {
                console.error("profile data loading Failed:", result);
                toast.error("Failed to load your services.");
            }
        } catch (error) {
            console.error("Network Error:", error);
            // alert("A network error occurred. Please try again.");
            toast.error("A network error occurred while fetching services.");
        } finally {
            setIsLoading(false);
        }
    }
    async function getbookings() {
        const API_URL = `${api_url}api/bookings/`;
        try {
            const response = await fetch(API_URL, {
                headers: { 'Authorization': `Token ${userToken}` }
            });
            const result = await response.json();
            if (response.ok) {
                setBookings(result || []);
            } else {
                toast.error("Could not refresh bookings list.");
            }
        } catch (error) {
            console.log(error);
            toast.error("Network error while loading bookings.");
        }
    }

    // Handle Status Updates (Confirm/Cancel/Complete)
    async function updateBookingStatus(bookingId, newStatus) {
        const API_URL = `${api_url}api/bookings/${bookingId}/update-status/`;
        try {
            const response = await fetch(API_URL, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Token ${userToken}`
                },
                body: JSON.stringify({ status: newStatus })
            });
            if (response.ok) {
                toast.success(`Booking updated to ${newStatus}`);
                getbookings(); // Refresh the list
            } else {
                const err = await response.json();
                toast.error(err.error || "Failed to update status");
            }
        } catch (error) {
            console.error("Error updating status:", error);
            toast.error("Network error. Update failed.");
        }
    }

    useEffect(() => {
        if (!userToken) { navigate('/login'); return; }
        setIsLoading(true);
        Promise.all([getservices(), getbookings()]).finally(() => setIsLoading(false));
    }, [userToken, api_url]);

    // Helper to style status badges
    const getStatusClass = (status) => {
        switch (status) {
            case 'confirmed': return 'badge bg-success';
            case 'cancelled': return 'badge bg-danger';
            case 'completed': return 'badge bg-secondary';
            default: return 'badge bg-warning text-dark';
        }
    };
    if (isLoading) {
        return (
            <section className='container my-5 text-center'>
                <div className="login-box">
                    <h2 className='py-3'>Loading Data ...</h2>
                    <div className="spinner-border align-center text-primary" role="status">
                        <span className="visually-hidden">Loading...</span>
                    </div>
                    <div className="py-4"> </div>
                    <div className="py-4"> </div>
                    <div className="py-4"> </div>
                    <div className="py-4"> </div>
                </div>
            </section>
        );
    }


    return (
        <>

            <div
                className={`overlay ${openServices ? "show" : ""}`}
                onClick={() => setOpenServices(false)}
            ></div>

            <section className='dashboard-section'>
                <div className="part-booking">
                    <h1 className='text-center'>Vendor Dashboard</h1>
                    <h1 className='text-center'>welcome {username} <i class="fa-regular fa-face-smile-beam"></i></h1>
                    <button
                        className="show-services-btn"
                        onClick={() => setOpenServices(true)}
                    >
                        Show Your Services
                    </button>
                    <div className="bookings-section ">
                        {/* <h2 className=''>Recent Booking Requests</h2> */}
                        <div className="table-responsive bg-white p-3 rounded shadow-sm">
                            <table className="table table-hover align-middle">
                                <thead className="table-striped thead-table">
                                    <tr>
                                        <th>Service</th>
                                        <th>Date</th>
                                        <th>Time</th>
                                        <th>Status</th>
                                        <th>Actions</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {bookings.length > 0 ? bookings.map(book => (
                                        <tr key={book.id}>
                                            <td>
                                                <Link to={`/bookings/${book.id}`} className="text-decoration-none fw-bold">
                                                    {book.service_name}
                                                </Link>
                                            </td>
                                            <td>{book.booking_date}</td>
                                            <td>{book.start_time} - {book.end_time}</td>
                                            <td><span className={getStatusClass(book.status)}>{book.status}</span></td>
                                            <td>
                                                {book.status === 'pending' && (
                                                    <div className="btn-group btn-group-sm">
                                                        <button onClick={() => updateBookingStatus(book.id, 'confirmed')} className="btn btn-outline-success">Confirm <i class="fa-solid fa-circle-check"></i></button>
                                                        <button onClick={() => updateBookingStatus(book.id, 'cancelled')} className="btn btn-outline-danger"><i class="fa-solid fa-trash"></i></button>
                                                    </div>
                                                )}
                                                {book.status === 'confirmed' && (
                                                    <button onClick={() => updateBookingStatus(book.id, 'completed')} className="btn btn-sm btn-outline-primary">Mark Completed <i class="fa-solid fa-eye"></i></button>
                                                )}
                                            </td>
                                        </tr>
                                    )) : <tr><td colSpan="5" className="text-center">No bookings found.</td></tr>}
                                </tbody>
                            </table>
                        </div>
                    </div>
                    <button className='add-btn' onClick={scrollToTop}>
                        <Link to="/newservice"> + Add a new Service </Link>
                    </button>
                </div>


                <div className={`my-services ${openServices ? "open" : ""}`}>

                    <div className="para-serv">
                        <div className="para-serv-header">
                            <p>Your Services</p>
                            <button
                                className="close-services"
                                onClick={() => setOpenServices(false)}
                            >
                                ✕
                            </button>
                        </div>
                        <hr />
                    </div>

                    <div className="cards-service">
                        {myData.map(service => (
                            <Service
                                key={service.id}
                                service={service}
                            />
                        ))}
                    </div>

                    <button className='add-btn-slider' onClick={scrollToTop}>
                        <Link to="/newservice"> + Add a new Service </Link>
                    </button>
                </div>


            </section>
        </>
    )
}

export default Dashboard
