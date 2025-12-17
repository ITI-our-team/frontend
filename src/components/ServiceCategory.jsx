
import './ServiceCategory.css';
import Service from './Service.jsx';
import { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import {SERVICES_CONFIG} from './categories.js';

function ServiceCategory({api_url}) {
    const { type } = useParams();
    const config = SERVICES_CONFIG[type];
    // console.log(config)
    const [myData, setMyData] = useState([]);
    const [search, setSearch] = useState("");
    const api = `${api_url}api/services/?category=`
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const getData = async () => {
            setIsLoading(true);
            const res = await fetch(`${api}${config.slug}&name=${search}`);
            try {
                const data = await res.json();
                console.log(data)
                setMyData(data || []);
            } catch (err) {
                console.error("error fetching data:", err);
                setMyData([]);
            } finally {
                setIsLoading(false);
            }
        };

        getData();
    }, [config.slug,api,search]);

    if (!config) return (
            <div className='container my-5 pt-5 text-center'>
                <div className="alert alert-info mt-4" role="alert">
                    <h4 className="alert-heading">No Data Found!</h4>
                    <p>There are currently no data available.</p>
                    <hr/>
                </div>
                <div className="py-4"> </div>
            </div>
        );
    const scrollToTop = () => {
        window.scrollTo({ top:0,left: 0, behavior: 'smooth' });
    };
    if (isLoading) {
        return (
            <>
            <section className='weddingVenue-section'>
                <div className="container">
                <h1>{config.title}</h1>
                <div className="box">
                    <input
                        type="text"
                        value={search}
                        onChange={(e) => (setSearch(e.target.value),{scrollToTop})}
                        className="search-input"
                    />

                    <Link to="/services"  onClick={scrollToTop} >
                        <button className='back-btn'>
                            <i className="fa-solid fa-arrow-left"></i>
                            Back
                        </button>
                    </Link>
                        </div>
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
                        </div>
            </section>
            </>
        );
    }
    

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

                    <Link to="/services"  onClick={scrollToTop} >
                        <button className='back-btn'>
                            <i className="fa-solid fa-arrow-left"></i>
                            Back
                        </button>
                    </Link>
                </div>

                <div className="cards">
                    {myData.map(service => (
                        <Service
                            key={service.id}
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
