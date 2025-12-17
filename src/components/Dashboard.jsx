import React from 'react'
import { useState,useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from 'react-router-dom'
import { useForm } from "react-hook-form"
import { update } from '../store/userSlice.js';
import Service from './Service.jsx';
import { Link } from 'react-router-dom';

function Dashboard({api_url}) {
    const navigate = useNavigate();
    const scrollToTop = () => {
        window.scrollTo({ top:0,left: 0, behavior: 'smooth' });
    };
    const [isLoading, setIsLoading] = useState(false);
    const [myData, setMyData] = useState([]);
    const authToken = localStorage.getItem("userToken"); 
    const user_id = localStorage.getItem("user_id"); 
    const user = useSelector((state) => state.user);
    async function getservices(data) {
        setIsLoading(true);
        const API_URL = `${api_url}api/services/?vendor=${user.username}`;
        try {
            const response = await fetch(API_URL, {
                method: 'GET',
                headers: {
                'Content-Type': 'application/json',
                'Authorization': `Token ${authToken}` 
                }
            });
            const result = await response.json();
            if (response.ok) {
                // alert("Data retrieved successful!");
                console.log(result);
                setMyData(result || []);
            } else {
                console.error("profile data loading Failed:", result);
            }
        } catch (error) {
            console.error("Network Error:", error);
            alert("A network error occurred. Please try again.");
        } finally {
            setIsLoading(false); 
        }
    }
    useEffect(() => {
        if (!authToken) {
            navigate('/login');
            return;
        }
        getservices();
    }, [api_url, authToken, navigate]);
    
    if (isLoading) {
        return (
            <section className='container my-5 text-center'>
                <div className="login-box">
                <h2 className='py-3'>Loading Data ...</h2>
                <div className="spinner-border align-center text-primary" role="status">
                    <span className="visually-hidden">Loading...</span>
                </div>
                <div className="py-4"> </div>
                <div className="py-4"> </div>
                <div className="py-4"> </div>
                <div className="py-4"> </div>
                </div>
            </section>
        );
    }
    return (
        <section className='weddingVenue-section'>
            <div className="container">
                <h1 className='text-center'>this is the services we have for this vendor</h1>
                <button className='btn btn-info my-4'> 
                    <Link to="/newservice"> Add a new Service </Link>
                </button>
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
    )
}

export default Dashboard
