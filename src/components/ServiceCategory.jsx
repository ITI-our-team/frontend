
import './ServiceCategory.css';
import Service from './Service.jsx';
import { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';


const SERVICES_CONFIG = {
    "wedding-venues": {
        title: "Wedding Venues",
        placeholder: "Search wedding venue...",
        api: "https://www.themealdb.com/api/json/v1/1/search.php?s="
    },
    "photographers": {
        title: "Wedding Photographers",
        placeholder: "Search photographer...",
        api: "https://www.themealdb.com/api/json/v1/1/search.php?s="
    },
    "wedding-planners": {
        title: "Wedding Planners",
        placeholder: "Search wedding planner...",
        api: "https://www.themealdb.com/api/json/v1/1/search.php?s="
    },
    "videographers": {
        title: "Wedding Videographers",
        placeholder: "Search videographer...",
        api: "https://www.themealdb.com/api/json/v1/1/search.php?s="
    },
    "wedding-caterers": {
        title: "Wedding Caterers",
        placeholder: "Search wedding caterer...",
        api: "https://www.themealdb.com/api/json/v1/1/search.php?s="
    },
    "entertainment": {
        title: "Wedding Entertainment",
        placeholder: "Search wedding entertainment...",
        api: "https://www.themealdb.com/api/json/v1/1/search.php?s="
    }
};

function ServiceCategory() {
    const { type } = useParams();
    const config = SERVICES_CONFIG[type];

    const [myData, setMyData] = useState([]);
    const [search, setSearch] = useState("");

    useEffect(() => {
        const getData = async () => {
            try {
                const res = await fetch(`${config.api}${search}`);
                const data = await res.json();
                setMyData(data.meals || []);
            } catch (err) {
                console.log(err)
                setMyData([]);
            }
        };

        getData();
    }, [search, config.api]);

    if (!config) return <p>Page Not Found</p>;

    return (
        <>
            <section className='weddingVenue-section'>
            <div className="container">
                <h1>{config.title}</h1>

                <div className="box">
                    <input
                        type="text"
                        placeholder={config.placeholder}
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        className="search-input"
                    />

                    <Link to="/services">
                        <button className='back-btn'>
                            <i className="fa-solid fa-arrow-left"></i>
                            Back
                        </button>
                    </Link>
                </div>

                <div className="cards">
                    {myData.map(service => (
                        <Service
                            key={service.idMeal}
                            service={service}
                        />
                    ))}
                </div>
            </div>
        </section>
        </>
    )
}

export default ServiceCategory
