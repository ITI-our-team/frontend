import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import "./ServiceDetails.css";
import Form from "./Form";

function ServiceDetails() {
    const { id } = useParams();
    const [service, setService] = useState(null);

    useEffect(() => {
        const getService = async () => {
            const res = await fetch(
                `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`
            );
            const data = await res.json();
            setService(data.meals[0]);
        };

        getService();
    }, [id]);

    if (!service) return <p>Loading...</p>;

    return (
        <>
            <section className="service-details-section">
                <div className="container">
                    <h1>{service.strMeal}</h1>

                    <div className="details-hero">
                        <div className="img-details">
                            <img src={service.strMealThumb} alt={service.strMeal} />
                        </div>
                        <Form />
                    </div>

                </div>
            </section>
        </>
    )
}


export default ServiceDetails
