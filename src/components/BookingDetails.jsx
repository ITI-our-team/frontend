import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import toast from 'react-hot-toast';

function BookingDetails({ api_url }) {
    const { id } = useParams();
    const navigate = useNavigate();
    const [booking, setBooking] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    
    const userToken = localStorage.getItem("userToken");
    const role = localStorage.getItem("role"); // Need role to show/hide buttons

    // 1. Fetch Booking Function (used on load and after update)
    const fetchBooking = async () => {
        setIsLoading(true);
        try {
            const response = await fetch(`${api_url}api/bookings/${id}/`, {
                headers: { 'Authorization': `Token ${userToken}` }
            });
            const data = await response.json();
            if (response.ok) {
                setBooking(data);
            } else {
                toast.error("Booking not found.");
                navigate('/dashboard');
            }
        } catch (error) {
            console.error(error);
            toast.error("Network error loading booking details.");
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        fetchBooking();
    }, [id, api_url, userToken]);

    // 2. Update Status Function
    async function updateBookingStatus(newStatus) {
        const API_URL = `${api_url}api/bookings/${id}/update-status/`;
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
                toast.success(`Booking ${newStatus} successfully!`);
                fetchBooking(); // Refresh the page data
            } else {
                const err = await response.json();
                toast.error(err.error || "Failed to update status");
            }
        } catch (error) {
            console.error("Error updating status:", error);
            toast.error("Network error. Update failed.");
        }
    }

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

    if (!booking) return null;

    return (
        <div className='weddingVenue-section'>
            <section className="container my-5">
                <div className="card shadow-sm p-4">
                    <div className="d-flex justify-content-between align-items-center border-bottom pb-3 mb-4">
                        <h2 className="mb-0">Booking Details #{booking.id}</h2>
                        <span className={`badge p-2 ${
                            booking.status === 'confirmed' ? 'bg-success' : 
                            booking.status === 'cancelled' ? 'bg-danger' : 
                            booking.status === 'completed' ? 'bg-secondary' : 'bg-warning text-dark'
                        }`}>
                            {booking.status.toUpperCase()}
                        </span>
                    </div>

                    {/* Vendor Actions Section */}
                    {role === 'vendor' && (
                        <div className="vendor-actions bg-light p-3 rounded mb-4 d-flex align-items-center justify-content-between">
                            <span className="fw-bold">Update Status:</span>
                            <div className="btn-group btn-group-sm">
                                {booking.status === 'pending' && (
                                    <>
                                        <button onClick={() => updateBookingStatus('confirmed')} className="btn btn-outline-success">Confirm Booking</button>
                                        <button onClick={() => updateBookingStatus('cancelled')} className="btn btn-outline-danger">Reject Booking</button>
                                    </>
                                )}
                                {booking.status === 'confirmed' && (
                                    <button onClick={() => updateBookingStatus('completed')} className="btn btn-primary">Mark as Completed</button>
                                )}
                                {(booking.status === 'completed' || booking.status === 'cancelled') && (
                                    <span className="text-muted small italic">No further actions available for this status.</span>
                                )}
                            </div>
                        </div>
                    )}

                    <div className="row">
                        <div className="col-md-6">
                            <h5 className="text-primary">Service Information</h5>
                            <p><strong>Service:</strong> {booking.service_name}</p>
                            <p><strong>Vendor:</strong> {booking.vendor_name}</p>
                            <p><strong>Base Price:</strong> {booking.service_price} EGP</p>
                        </div>
                        <div className="col-md-6">
                            <h5 className="text-primary">Schedule</h5>
                            <p><strong>Date:</strong> {booking.booking_date}</p>
                            <p><strong>Time Slot:</strong> {booking.start_time} - {booking.end_time}</p>
                            <p><strong>Requested On:</strong> {new Date(booking.created_at).toLocaleDateString()}</p>
                        </div>
                    </div>

                    <hr />

                    <div className="notes-section bg-light p-3 rounded mb-4">
                        <h5>Customer Notes / Requests:</h5>
                        <p className="mb-0" style={{ whiteSpace: 'pre-line' }}>
                            {booking.notes || "No special notes provided."}
                        </p>
                    </div>

                    <div className="d-flex justify-content-between">
                        <button className="btn btn-outline-secondary" onClick={() => navigate(-1)}>
                            <i className="fa fa-arrow-left"></i> Back
                        </button>
                        <Link to={`/services/${booking.service}`} className="btn btn-link">
                            View Original Service Listing
                        </Link>
                    </div>
                </div>
            </section>
        </div>
    );
}

export default BookingDetails;