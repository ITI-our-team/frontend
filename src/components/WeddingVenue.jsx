
import './WeddingVenue.css'
import Service from './Service.jsx'
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

function WeddingVenue() {

    let [myData, setMyData] = useState([]);
    let [search, setSearch] = useState("");

    useEffect(() => {
        const getData = async () => {
            try {
                const result = await fetch(
                    `https://www.themealdb.com/api/json/v1/1/search.php?s=${search}`
                );
                const data = await result.json();
                setMyData(data.meals || []);
            } catch (err) {
                console.log(err)
                setMyData([]);
            }
        };

        getData();
    }, [search]);

    return (
        <section className='weddingVenue-section'>
            <div className="container">
                <h1>Wedding Venue</h1>

                <div className="box">
                    <input
                        type="text"
                        placeholder="Search wedding venue..."
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        className="search-input"
                    />
                    
                    <Link to={'/services'}><button className='back-btn'><i class="fa-solid fa-arrow-left"></i>Back</button></Link>
                </div>

                <div className="cards">
                    {myData.map(service => (
                        <Service service={service} key={service.idMeal} />
                    ))}
                </div>
            </div>
        </section>
    )
}
export default WeddingVenue;