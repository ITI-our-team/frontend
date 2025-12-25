import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import './MyBookings.css'

function MyBookings({ api_url }) {
    const [bookings, setBookings] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const userToken = localStorage.getItem("userToken");
    const navigate = useNavigate();

    const fetchMyBookings = async () => {
        setIsLoading(true);
        try {
            const response = await fetch(`${api_url}api/bookings/`, {
                headers: { 'Authorization': `Token ${userToken}` }
            });
            const data = await response.json();
            if (response.ok) {
                setBookings(data);
            } else {
                toast.error("Failed to load your bookings.");
            }
        } catch (error) {
            console.log(error)
            toast.error("Network error.");
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        if (!userToken) { navigate('/login'); return; }
        fetchMyBookings();
    }, []);

    // Handle Deletion (Cancellation)
    const deleteBooking = async (id) => {
        toast((t) => (
            <span>
                <b>Cancel this booking?</b>
                <div className="d-flex gap-2 mt-2 justify-content-center">
                    <button className="btn btn-danger btn-sm" onClick={async () => {
                        toast.dismiss(t.id);
                        await executeDelete(id);
                    }}>Confirm</button>
                    <button className="btn btn-secondary btn-sm" onClick={() => toast.dismiss(t.id)}>Back</button>
                </div>
            </span>
        ), { position: 'top-center' });
    };

    const executeDelete = async (id) => {
        try {
            const response = await fetch(`${api_url}api/bookings/${id}/`, {
                method: 'DELETE',
                headers: { 'Authorization': `Token ${userToken}` }
            });
            if (response.ok) {
                toast.success("Booking cancelled successfully.");
                fetchMyBookings();
            } else {
                const err = await response.json();
                toast.error(err[0] || "Cannot cancel a confirmed booking.");
            }
        } catch (error) {
            console.log(error)
            toast.error("Error connecting to server.");
        }
    };

    const getStatusStyle = (status) => {
        switch(status) {
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
                </div>
            </section>
        );
    }

    return (
        <div className='weddingVenue-section'>
            <section className="container my-5 min-vh-100">
                <h2 className="mb-4">My Bookings</h2>
                
                {bookings.length === 0 ? (
                    <div className="text-center py-5 shadow-sm bg-white rounded">
                        <h4>No bookings yet!</h4>
                        <p>Start exploring our venues and vendors to plan your perfect day.</p>
                        
                        <Link to="/services"><button className='browse-btn'>Browse Services</button></Link>
                    </div>
                ) : (
                    <div className="row g-4">
                        {bookings.map((book) => (
                            <div key={book.id} className="col-md-6 col-lg-4">
                                <div className="card h-100">
                                    <div className="card-body">
                                        <div className="d-flex justify-content-between align-items-start mb-2">
                                            <h5 className="">{book.service_name}</h5>
                                            <span className={getStatusStyle(book.status)}>{book.status}</span>
                                        </div>
                                        <p className="card-text mb-1"><strong>Date:</strong> {book.booking_date}</p>
                                        <p className="card-text mb-1"><strong>Time:</strong> {book.start_time} - {book.end_time}</p>
                                        <p className="card-text text-muted">ID: #{book.id}</p>
                                    </div>
                                    <div className="card-footer border-top-0 d-flex gap-2 pb-3">
                                        <Link to={`/bookings/${book.id}`} className="btn btn-outline-info btn-sm flex-grow-1">
                                            View Details <i class="fa-solid fa-eye"></i>
                                        </Link>
                                        {book.status === 'pending' && (
                                            <button 
                                                onClick={() => deleteBooking(book.id)} 
                                                className="btn btn-outline-danger btn-sm"
                                            >
                                                <i class="fa-solid fa-trash"></i>
                                            </button>
                                        )}
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </section>
        </div>
    );
}

export default MyBookings;