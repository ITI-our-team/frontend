import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import "./ServiceDetails.css";
import Form from "./Form";
// import { useSelector } from "react-redux";
import { Link, useNavigate } from 'react-router-dom'
import toast from 'react-hot-toast';
import { FaCalendarTimes, FaTrashAlt } from "react-icons/fa";
function ServiceDetails({ api_url }) {
    const { id } = useParams();
    const [service, setService] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    // const user = useSelector((state) => state.user);
    const userToken = localStorage.getItem("userToken");
    const role = localStorage.getItem("role");
    const username = localStorage.getItem("username");
    const [blackoutDate, setBlackoutDate] = useState("");
    const [blackoutReason, setBlackoutReason] = useState("");
    const navigate = useNavigate();
    const refreshService = async () => {
        const res = await fetch(`${api_url}api/services/${id}/`);
        if (res.ok) {
            const data = await res.json();
            setService(data);
        }
    };

    const handleToggleBlackout = async (e) => {
        e.preventDefault();
        if (!blackoutDate) return toast.error("Please select a date");
        const blackoutData = new FormData();
        blackoutData.append("date", blackoutDate);
        blackoutData.append("reason", blackoutReason);
        console.log(blackoutData);
        try {
            const res = await fetch(`${api_url}api/services/${id}/toggle-blackout/`, {
                method: 'POST',
                headers: {
                    'Authorization': `Token ${userToken}`
                },
                body: blackoutData
            });

            const data = await res.json();
            if (res.ok) {
                toast.success(data.message);
                setBlackoutDate("");
                setBlackoutReason("");
                refreshService(); // Update the UI to show new unavailable dates
            } else {
                toast.error(data.error || "Failed to update blackout");
                console.log(data);
            }
        } catch (err) {
            toast.error("Connection error");
            console.log(err);
        }
    };
    useEffect(() => {
        const getService = async () => {
            setIsLoading(true);
            try {
                const res = await fetch(`${api_url}api/services/${id}/`);
                if (res.ok) {
                    const data = await res.json();
                    setService(data);
                } else {
                    toast.error("Could not find this service.");
                    navigate("/services");
                }
            } catch (err) {
                console.error("error fetching data:", err);
                toast.error("Network error. Please try again later.");
                setService([]);
            } finally {
                setIsLoading(false);
            }
        };
        getService();
    }, [api_url, id, navigate]);

    async function deleteservice() {
        toast((t) => (
            <span>
                <b>Are you sure?</b><br /> This will permanently delete the service.
                <div className="d-flex gap-2 mt-2 justify-content-center">
                    <button
                        className="btn btn-danger btn-sm"
                        onClick={async () => {
                            toast.dismiss(t.id);
                            await executeDelete();
                        }}
                    >
                        Yes, Delete
                    </button>
                    <button
                        className="btn btn-secondary btn-sm"
                        onClick={() => toast.dismiss(t.id)}
                    >
                        Cancel
                    </button>
                </div>
            </span>
        ), {
            duration: 6000, // Give them time to read and click
            position: 'top-center',
        });
    }
    async function executeDelete() {

        setIsLoading(true);
        try {
            const res = await fetch(`${api_url}api/services/${id}/`, {
                method: 'DELETE',
                headers: {
                    'Authorization': `Token ${userToken}`
                }
            });

            if (res.ok) {
                toast.success("Service deleted successfully.");
                navigate("/dashboard");
            } else {
                toast.error("You are not authorized to delete this service.");
            }
        } catch (err) {
            console.error("error deleting data:", err);
            toast.error("A network error occurred.");
        } finally {
            setIsLoading(false);
        }
    }


    if (isLoading) {
        return (
            <>
                <section className="service-details-section">
                    <div className='container my-5 text-center'>
                        <div className='h1 py-3'>Loading Data...</div>
                        <div className="spinner-border text-primary" role="status">
                            <span className="visually-hidden">Loading...</span>
                        </div>
                        <div className="py-4"> </div>
                        <div className="py-4"> </div>
                        <div className="py-4"> </div>
                        <div className="py-4"> </div>
                    </div>
                </section>
            </>
        );
    }

    return (
        <>
            <section className="service-details-section">
                <div className="container">
                    <h1>{service.name}</h1>

                    <div className={`details-hero ${role != null ? "with-form" : "no-form"}`}>

                        <div className="details-hero-images">
                            <div className="img-details">
                                <img src={service.thumbnail} alt={service.name} />
                            </div>

                            <div className="extra-images">
                                {service.images &&
                                    service.images.map((img) => (
                                        <div key={img.id} className="card-img">
                                            <img src={img.image} alt={service.title} />
                                        </div>
                                    ))
                                }
                            </div>

                        </div>

                        <div className="details-hero-form">
                            {/* {role == "customer" ? <Form service={service} api_url={api_url} /> :
                                    <>
                                        <h5 >please use a customer account to make a booking</h5>
                                    </>} */}

                            {role === "customer" && (
                                <div className="details-hero-form">
                                    <Form service={service} api_url={api_url} />
                                </div>
                            )}
                            {role === "vendor" && username === service.vendor && (
                                <div className="blackout-management">
                                    <h3><i className="fa-solid fa-calendar-xmark"></i> Manage Unavailable Dates</h3>
                                    <p className="description-text">Block dates for holidays, maintenance, or private events.</p>
                                    
                                    <form onSubmit={handleToggleBlackout} className="blackout-form">
                                        <div className="two-inputs">
                                            <div>
                                                <label>Select Date</label>
                                                <input 
                                                    type="date" 
                                                    value={blackoutDate}
                                                    min={new Date().toISOString().split("T")[0]}
                                                    onChange={(e) => setBlackoutDate(e.target.value)}
                                                    required
                                                />
                                            </div>
                                            <div>
                                                <label>Reason (Optional)</label>
                                                <input 
                                                    type="text" 
                                                    placeholder="e.g. Maintenance"
                                                    value={blackoutReason}
                                                    onChange={(e) => setBlackoutReason(e.target.value)}
                                                />
                                            </div>
                                        </div>
                                        <button type="submit" className="toggle-block-btn">Toggle Date Availability</button>
                                    </form>

                                    <div className="blocked-dates-list">
                                        <h5>Currently Blocked:</h5>
                                        <div className="date-badges">
                                            {service.unavailable_dates && service.unavailable_dates.length > 0 ? (
                                                service.unavailable_dates.map(date => (
                                                    <div key={date} className="date-badge">
                                                        <span>{date}</span>
                                                        <i 
                                                            className="fa-solid fa-circle-xmark delete-icon" 
                                                            onClick={() => {
                                                                setBlackoutDate(date);
                                                                setTimeout(() => handleToggleBlackout({preventDefault: () => {}}), 10);
                                                            }}
                                                        ></i>
                                                    </div>
                                                ))
                                            ) : (
                                                <p className="no-dates">No dates manually blocked.</p>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            )}
                        </div>


                        <div className="more-details col-md-6 col-12">
                            <hr />
                            <h5>Description : </h5>
                            <p>{service.description}</p>
                            <h5>Price: </h5>
                            <p>{service.price} L.E.</p>
                            <h5>Vendor Name :</h5>
                            <p>{service.vendor} </p>
                            <h5>Location</h5>
                            <p>{service.location}</p>
                        </div>
                    </div>

                    {role === "vendor" && username === service.vendor && (
                        <div className="btns-admin">
                            <Link to={`/editservice/${service.id}`}>
                                <button className="edit-btn">Edit service</button>
                            </Link>
                            <button className="delete-btn" onClick={deleteservice} >Delete Service</button>
                        </div>
                    )}


                    <Link to="/services" >
                        <button className='back-btn'>
                            <i className="fa-solid fa-arrow-left"></i>
                            Back
                        </button>
                    </Link>

                </div>
            </section>
        </>
    )
}


export default ServiceDetails
