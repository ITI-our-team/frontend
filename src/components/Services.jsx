
import './Services.css'
import Service from './Service.jsx'
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import CATEGORY_SECTIONS from './categories.js'

function Services({ api_url }) {

    // let [myData, setMyData] = useState([]);
    const [categorizedData, setCategorizedData] = useState({});
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchAllCategoriesData = async () => {
            setIsLoading(true);
            const services_base_api = `${api_url}api/services/`;

            // Create an array of Promises, one for each category API call
            const fetchPromises = CATEGORY_SECTIONS.map(section => {
                const category_url = `${services_base_api}?category=${section.slug}`;
                return fetch(category_url)
                    .then(res => res.json())
                    .then(data => ({ slug: section.slug, data: data || [] }))
                    .catch(error => {
                        console.error(`Error fetching ${section.slug}:`, error);
                        return { slug: section.slug, data: [] };
                    });
            });
            try {
                const results = await Promise.all(fetchPromises);

                const newCategorizedData = results.reduce((acc, result) => {
                    acc[result.slug] = result.data.slice(0, 8);
                    return acc;
                }, {});

                setCategorizedData(newCategorizedData);
            } catch (err) {
                // This catch handles critical errors if Promise.all fails entirely
                console.error("Critical error fetching all data:", err);
            } finally {
                setIsLoading(false);
            }
        };

        fetchAllCategoriesData();
    }, [api_url]); // Rerun only if api_url changes

    const scrollToTop = () => {
        window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
    };

    if (isLoading) {
        return (
            <>
                <section className='services-section'>
                    <div className="container">
                        <div className="header-services">
                            <h1>All Your Wedding Essentials, From Trusted Local Vendors</h1>
                            <p>Our wedding service provider directory helps you quickly connect with the best wedding professionals. Browse a comprehensive list of professional photographers, florists, caterers, and venues, with detailed information and reliable reviews to support your decision. Whether you're looking for simple services or unique details to make your wedding truly special, our directory provides everything you need for a perfectly organized day.</p>
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
            <section className='services-section'>
                <div className="container">
                    <div className="header-services">
                        <h1>All Your Wedding Essentials, From Trusted Local Vendors</h1>
                        <p>Our wedding service provider directory helps you quickly connect with the best wedding professionals. Browse a comprehensive list of professional photographers, florists, caterers, and venues, with detailed information and reliable reviews to support your decision. Whether you're looking for simple services or unique details to make your wedding truly special, our directory provides everything you need for a perfectly organized day.</p>
                    </div>

                    {/* Dynamic Rendering of All Sections */}
                    {CATEGORY_SECTIONS.map((section) => {
                        const services = categorizedData[section.slug] || [];

                        // Only render the section if there are services available
                        if (services.length === 0) {
                            return null;
                        }

                        return (
                            <div key={section.slug} className={`${section.slug}-section section`}>
                                <hr />
                                <div className="header">
                                    <h2>{section.title}</h2>
                                    <Link to={section.link} onClick={scrollToTop} ><p>All {section.title}</p></Link>
                                </div>

                                <div className="cards">
                                    {services.map(service => (
                                        <Service service={service} key={service.id} />
                                    ))}
                                </div>
                            </div>
                        );
                    })}

                </div>
            </section>
        </>
    )
}

export default Services;

