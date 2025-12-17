import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import "./ServiceDetails.css";
import Form from "./Form";
import { useSelector } from "react-redux";

function ServiceDetails({api_url}) {
    const { id } = useParams();
    const [service, setService] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const user = useSelector((state) => state.user);

    useEffect(() => {
        const getService = async () => {
            setIsLoading(true);
            const res = await fetch(
                `${api_url}api/services/${id}`
            );
            
            try {
                const data = await res.json();
                setService(data);
                console.log(data.images)
            } catch (err) {
                console.error("error fetching data:", err);
                setService([]);
            } finally {
                setIsLoading(false);
            }
        };
        getService();
    }, [api_url,id]);

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

                    <div className="details-hero">
                        <div className="img-details">
                            <img src={service.thumbnail} alt={service.name} />
                        </div>
                        {user.role=="vendor"? <></>:<Form />}
                    </div>
                    <div className="details-hero">
                        <div className="more-details">
                            <h5>Description : </h5>
                            <p>{service.description}</p>
                            <h5>Price: </h5>
                            <p>{service.price} L.E.</p>
                            <h5>Vendor Name :</h5>
                            <p>{service.vendor} </p>
                            <h5>Location</h5>
                            <p>{service.location}</p>
                            
                        </div>
                        <div className="extra-images">
                            {service.images && (
                                service.images.map(img => (
                                    <div key={img.id} className="card-img">
                                        <img src={img.image} alt={service.title}/>
                                    </div>
                                ))
                            )}
                        </div>
                    </div>

                </div>
            </section>
        </>
    )
}


export default ServiceDetails
