import React from 'react'
import { useState,useEffect } from "react";
import { useNavigate } from 'react-router-dom'
import toast from 'react-hot-toast';

function Dashboard({api_url}) {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        username: '',
        first_name: '',
        last_name: '',
    });
    const [isLoading, setIsLoading] = useState(false);
    const userToken = localStorage.getItem("userToken"); 
    const email = localStorage.getItem("email"); 
    const phone_number = localStorage.getItem("phone_number"); 

    // const user = useSelector((state) => state.user);
    async function Getuserdata() {
        setIsLoading(true);
        const API_URL = `${api_url}api/user/profile/`;
        try {
            const response = await fetch(API_URL, {
                method: 'GET',
                headers: {
                'Content-Type': 'application/json',
                'Authorization': `Token ${userToken}` 
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
                toast.error("Failed to load profile data.");
            }
        } catch (error) {
            console.error("Network Error:", error);
            toast.error("A network error occurred. Please try again.");
        } finally {
            setIsLoading(false); 
        }
    }
    useEffect(() => {
        if (!userToken) {
            navigate('/login');
            return;
        }
        Getuserdata();
    }, [api_url, userToken,navigate]);
    
    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.id]: e.target.value
        });
    };
    async function cancel(){
        navigate('/')
        toast.success("Canceled information update!");
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
                'Authorization': `Token ${userToken}` 
                },
                body: JSON.stringify(formData),
            });
            const result = await response.json();
            console.log(result);
            if (response.ok) {
                toast.success("Information updated successfully!");
                console.log(result);
                localStorage.setItem('fname', formData.first_name);
                localStorage.setItem('lname', formData.last_name);
                localStorage.setItem('username', formData.username);
            } else {
                console.error("Update Failed:", result);
                toast.error(result.detail || "Update failed. Please check your inputs.");
            }
        } catch (error) {
            console.error("Network Error:", error);
            toast.error("A network error occurred during the update.");
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
                    <div className="form-group mb-3">
                        <label htmlFor="username">Username</label>
                        <input 
                            type="text" 
                            value={formData.username}
                            onChange={handleChange} 
                            id="username"
                            placeholder="Username"
                        />
                    </div>

                    <div className="form-group mb-3">
                        <label>Account Email (Non-editable)</label>
                        <div className='update_label p-2 border rounded bg-light'>
                            {email}
                        </div>
                    </div>

                    <div className="two-inputs">
                        <div className="form-group">
                            <label htmlFor="first_name">First Name</label>
                            <input 
                                type="text" 
                                value={formData.first_name}
                                onChange={handleChange} 
                                id="first_name"
                                placeholder="First Name"
                            />
                        </div>

                        <div className="form-group">
                            <label htmlFor="last_name">Last Name</label>
                            <input 
                                type="text" 
                                value={formData.last_name}
                                onChange={handleChange} 
                                id="last_name"
                                placeholder="Last Name"
                            />
                        </div>
                    </div>

                    <div className="form-group mb-4">
                        <label>Phone Number (Non-editable)</label>
                        <div className='update_label p-2 border rounded bg-light'>
                            {phone_number}
                        </div>
                    </div>
                    
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
