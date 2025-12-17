import React from 'react'
import { useState,useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from 'react-router-dom'
import { update } from '../store/userSlice.js';

function Dashboard({api_url}) {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const scrollToTop = () => {
        window.scrollTo({ top:0,left: 0, behavior: 'smooth' });
    };
    const [formData, setFormData] = useState({
        username: '',
        first_name: '',
        last_name: '',
    });
    const [isLoading, setIsLoading] = useState(false);
    const authToken = localStorage.getItem("userToken"); 
    const user = useSelector((state) => state.user);
    async function Getuserdata(data) {
        setIsLoading(true);
        const API_URL = `${api_url}api/user/profile/`;
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
                setFormData({
                    username: result.username || '',
                    first_name: result.first_name || '',
                    last_name: result.last_name || '',
                });
            } else {
                console.error("profile data loading Failed:", result);
                // alert(`Login Failed: Either the Email or the Password is incorrect`);
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
        Getuserdata();
    }, [api_url, authToken, navigate]);
    
    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.id]: e.target.value
        });
    };
    async function cancel(){
        navigate('/')
        alert("Canceled Information update!");
    }
    async function updatedata(e) {
        e.preventDefault();
        setIsLoading(true);
        const API_URL = `${api_url}api/user/profile/`;
        try {
            const response = await fetch(API_URL, {
                method: 'PATCH',
                headers: {
                'Content-Type': 'application/json',
                'Authorization': `Token ${authToken}` 
                },
                body: JSON.stringify(formData),
            });
            const result = await response.json();
            if (response.ok) {
                alert("Information Updates successfully!");
                console.log(result);
                dispatch(update({
                    username: formData.username,
                    first_name: formData.first_name,
                    last_name: formData.last_name,
                }));
            } else {
                console.error("profile data update Failed:", result);
                console.error("Update Failed:", result);
                // alert(`Login Failed: Either the Email or the Password is incorrect`);
            }
        } catch (error) {
            console.error("Network Error:", error);
            alert("A network error occurred. Please try again.");
        } finally {
            setIsLoading(false); 
        }
    }
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
        <section className='login-page'>
        <div className="login-box">
            <h1 className='text-center'>this is the data we have for this user</h1>
            <form onSubmit={updatedata} className='col-md-8 col-12 signupform'>
                    <input type="text" value={formData.username}
                        onChange={handleChange} id="username"
                        />
                    <label className='update_label'>{user.email}</label>

                    <input type="text" value={formData.first_name}
                        onChange={handleChange} id="first_name"
                    />
                    <input type="text" value={formData.last_name}
                        onChange={handleChange} id="last_name"
                    />
                    <label className='update_label'>{user.phone_number}</label>
                    <button type="submit">Update information</button>
                </form>
            <div className="col-3 mx-auto mt-2 ">
                <button className='bg-danger' onClick={cancel}>Cancel Editing</button>
            </div>
        </div>
        </section>
    )
}

export default Dashboard
