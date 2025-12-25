import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import "./ServiceDetails.css";
import Form from "./Form";
// import { useSelector } from "react-redux";
import { Link,useNavigate } from 'react-router-dom'
import toast from 'react-hot-toast';

function ServiceDetails({api_url}) {
    const { id } = useParams();
    const [service, setService] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    // const user = useSelector((state) => state.user);
    const userToken = localStorage.getItem("userToken"); 
    const role = localStorage.getItem("role"); 
    const username = localStorage.getItem("username"); 
    
    const navigate = useNavigate();
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
    }, [api_url, id,navigate]);
    
    async function deleteservice() {
        toast((t) => (
            <span>
                <b>Are you sure?</b><br/> This will permanently delete the service.
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

    
    // if (!service) return <p>Loading...</p>;
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
                    {role === "vendor"&& username===service.vendor && (
                        <div className="d-flex gap-3 justify-content-end">
                            <Link to={`/editservice/${service.id}`}>
                                <button className="btn bg-info">Edit service</button>
                            </Link>
                            <button className="btn bg-danger" onClick={deleteservice} >Delete Service</button>
                        </div>
                    )}
                    <div className="details-hero">
                        <div className="img-details">
                            <img src={service.thumbnail} alt={service.name} />
                        </div>
                        {/* {role == "vendor" ? <></> : <Form />} */}
                        {role == "customer" ? <Form service={service} api_url={api_url} /> :
                            <>
                                <h5>please use a customer account to make a booking</h5>
                            </>}
                        
                    </div>
                    <div className="details-hero flex-wrap">
                        <div className="more-details col-md-6 col-12">
                            <h5>Description : </h5>
                            <p>{service.description}</p>
                            <h5>Price: </h5>
                            <p>{service.price} L.E.</p>
                            <h5>Vendor Name :</h5>
                            <p>{service.vendor} </p>
                            <h5>Location</h5>
                            <p>{service.location}</p>
                            
                        </div>
                        <div className="extra-images col-md-6 col-12">
                            {service.images && (
                                service.images.map(img => (
                                    <div key={img.id} className="card-img">
                                        <img src={img.image} alt={service.title}/>
                                    </div>
                                ))
                            )}
                        </div>
                        {/* moved to the form to make it easier to show */}
                        {/* <div className="extra-data col-md-6 col-12 mt-4">
                            {service.extras && (
                                service.extras.map(
                                    extra => (
                                        <div key={extra.id} className="d-flex gap-3" >
                                            <h5>{extra.name}</h5>
                                            <p>{extra.price} L.E.</p>
                                        </div>
                                    )
                                )
                            )

                            }
                        </div> */}
                    </div>

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
