
import './Services.css'
import Service from './Service.jsx'
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
    
function Services() {

    let [myData, setMyData] = useState([]);

    useEffect(() => {
        const getData = async () => {
            try {
                const result = await fetch(
                    "https://www.themealdb.com/api/json/v1/1/search.php?s="
                );
                const data = await result.json();
                setMyData(data.meals || []);
            } catch (err) {
                console.log(err);
                setMyData([]);
            }
        };
        getData();
    }, []);

    return (
        <>
            <section className='services-section'>
                <div className="container">
                    <div className="header-services">
                        <h1>All Your Wedding Essentials, From Trusted Local Vendors</h1>
                        <p>Our wedding service provider directory helps you quickly connect with the best wedding professionals. Browse a comprehensive list of professional photographers, florists, caterers, and venues, with detailed information and reliable reviews to support your decision. Whether you're looking for simple services or unique details to make your wedding truly special, our directory provides everything you need for a perfectly organized day.</p>
                    </div>


                    {/* section wedding venues */}
                    <div className="wedding-venues-section section">
                        <div className="header">
                            <h2>Wedding Venues</h2>
                            <Link to={'/services/category/wedding-venues'}><p>All Wedding Venues</p></Link>
                        </div>

                        <div className="cards">
                            {myData.slice(0, 8).map(service => (
                                <Service service={service} key={service.idMeal} />
                            ))}
                        </div>
                    </div>

                    {/* section Wedding Photographers */}

                    <div className="wedding-photographers-section section">
                        <div className="header">
                            <h2>Wedding Photographers</h2>
                            <Link to={'/services/category/photographers'}><p>All Wedding Photographers</p></Link>
                        </div>

                        <div className="cards">
                            {myData.slice(0, 8).map(service => (
                                <Service service={service} key={service.idMeal} />
                            ))}
                        </div>
                    </div>

                    {/* section Wedding Planners */}
                    <div className="wedding-planners-section section">
                        <div className="header">
                            <h2>Wedding Planners</h2>
                            <Link to={'/services/category/wedding-planners'}><p>All Wedding Planners</p></Link>
                        </div>

                        <div className="cards">
                            {myData.slice(0, 8).map(service => (
                                <Service service={service} key={service.idMeal} />
                            ))}
                        </div>
                    </div>

                    {/* section Wedding Videographers */}
                    <div className="wedding-videographers-section section">
                        <div className="header">
                            <h2>Wedding Videographers</h2>
                            <Link to={'/services/category/videographers'}><p>All Wedding Videographers</p></Link>
                        </div>

                        <div className="cards">
                            {myData.slice(0, 8).map(service => (
                                <Service service={service} key={service.idMeal} />
                            ))}
                        </div>
                    </div>

                    {/* section Wedding Caterers */}
                    <div className="wedding-caterers-section section">
                        <div className="header">
                            <h2>Wedding Caterers</h2>
                            <Link to={'/services/category/wedding-caterers'}><p>All Wedding Caterers</p></Link>
                        </div>

                        <div className="cards">
                            {myData.slice(0, 8).map(service => (
                                <Service service={service} key={service.idMeal} />
                            ))}
                        </div>
                    </div>

                    {/* section Wedding Entertainment */}
                    <div className="wedding-venues-section section">
                        <div className="header">
                            <h2>Wedding Entertainment</h2>
                            <Link to={'/services/category/entertainment'}><p>All Wedding Entertainment</p></Link>
                        </div>

                        <div className="cards">
                            {myData.slice(0, 8).map(service => (
                                <Service service={service} key={service.idMeal} />
                            ))}
                        </div>
                    </div>
                
                
                </div>
            </section>
        </>
    )
}

export default Services;

