import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import "./ServiceDetails.css";

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
            <section className="service-details">

                <div className="details-hero">
                    <img src={service.strMealThumb} alt={service.strMeal} />
                    <h1>{service.strMeal}</h1>
                </div>

                <div className="details-content container">
                    <h2>About This Service</h2>
                    <p>
                        This wedding service is perfect for couples looking for a
                        unique and unforgettable experience. Carefully crafted to
                        match your special day.
                    </p>

                    <h3>Location</h3>
                    <p>Available Worldwide</p>
                </div>
            </section>
        </>
    )
}


export default ServiceDetails
