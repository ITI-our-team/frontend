import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import "./ServiceDetails.css";
import Form from "./Form";

function ServiceDetails({api_url}) {
    const { id } = useParams();
    const [service, setService] = useState(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const getService = async () => {
            setIsLoading(true);
            const res = await fetch(
                `${api_url}api/services/${id}`
            );
            
            try {
                const data = await res.json();
                setService(data);
            } catch (err) {
                console.error("error fetching data:", err);
                setService([]);
            } finally {
                setIsLoading(false);
            }
        };
        getService();
    }, [api_url]);

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
                        <Form />
                    </div>

                </div>
            </section>
        </>
    )
}


export default ServiceDetails
