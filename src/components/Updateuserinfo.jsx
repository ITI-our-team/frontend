import React from 'react'
import { useState,useEffect } from "react";
import { useNavigate } from 'react-router-dom'
import toast from 'react-hot-toast';
import { FaUserCircle } from "react-icons/fa";

function Updateuserinfo({api_url}) {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        username: '',
        first_name: '',
        last_name: '',
    });
    const [isLoading, setIsLoading] = useState(false);
    const [imagePreview, setImagePreview] = useState(null);
    const [newImage, setNewImage] = useState(null);
    const [isImageDeleted, setIsImageDeleted] = useState(false);
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
                if (result.profile_image) {
                    setImagePreview(result.profile_image);
                }
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
    }, [api_url, userToken, navigate]);

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setNewImage(file);
            setImagePreview(URL.createObjectURL(file));
            setIsImageDeleted(false);
        }
    };
    const removeImage = () => {
        setImagePreview(null);
        setNewImage(null);
        setIsImageDeleted(true);
    };
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
        const updateData = new FormData();
        updateData.append("username", formData.username);
        updateData.append("first_name", formData.first_name);
        updateData.append("last_name", formData.last_name);
        if (newImage) {
            updateData.append("profile_image", newImage);
        }else if (isImageDeleted) {
            updateData.append("profile_image", ""); 
        }
        const API_URL = `${api_url}api/user/profile/`;
        try {
            const response = await fetch(API_URL, {
                method: 'PATCH',
                headers: {
                'Authorization': `Token ${userToken}` 
                },
                body: updateData,
            });
            const result = await response.json();
            console.log(result);
            if (response.ok) {
                console.log(result);
                localStorage.setItem('fname', formData.first_name);
                localStorage.setItem('lname', formData.last_name);
                localStorage.setItem('username', formData.username);
                if (!result.profile_image) {
                    localStorage.removeItem('profile_image');
                } else {
                    localStorage.setItem('profile_image', result.profile_image);
                }
                window.location.reload();
                toast.success("Information updated successfully!");
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
        <section className='Signup-page'>
        <div className="Signup-box">
            <h1 className='text-center py-4'>You can update your info here</h1>
                <form onSubmit={updatedata} className='col-md-8 col-12 signupform'>
                    <div className="form-group text-center mb-4">
                        <div className='profile-image-container update-page'>
                            {imagePreview ? (
                                <>
                                    <img src={imagePreview} alt="Profile" className="profile-preview-img update-page" />
                                    <button 
                                        className="btn btn-outline-danger btn-sm mt-2 remove-img-btn" 
                                        onClick={removeImage}
                                    >
                                        <i className="fa-solid fa-trash"></i>
                                    </button>
                                </>
                            ) : (
                                <FaUserCircle size={100} color="#ccc" />
                            )}
                        </div>
                        <label htmlFor="imageUpload" className="d-block mt-2 image-label">
                            Change Profile Picture
                        </label>
                        <input type="file" id="imageUpload" accept="image/*" onChange={handleImageChange} style={{display: 'none'}} />
                    </div>
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

export default Updateuserinfo
