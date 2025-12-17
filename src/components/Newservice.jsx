import React from 'react'
import { useState } from "react";
import { useForm } from "react-hook-form"
import { useSelector } from "react-redux";
import { Link,useNavigate } from 'react-router-dom'
import CATEGORY_SECTIONS from './categories'

function Newservice({api_url}) {
    const navigate = useNavigate();
    const {
        register,
        handleSubmit,
        // reset,
    } = useForm();
    const [isLoading, setIsLoading] = useState(false);
    const {userToken} = useSelector((state) => state.user);
    async function myHandleSubmit(data) {
        setIsLoading(true);
        const API_URL = `${api_url}api/services/`;
        const formData = new FormData();
        formData.append('name', data.name);
        formData.append('category', data.category);
        formData.append('price', data.price);
        formData.append('description', data.description);
        formData.append('location', data.location);
        if (data.thumbnail[0]) { // upload the thumbnail
            formData.append('thumbnail', data.thumbnail[0]);
        }
        if (data.gallery_images) { // Gallery Images if there is any
            Array.from(data.gallery_images).forEach((file) => {
                formData.append('uploaded_images', file);
            });
        }
        try {
            const response = await fetch(API_URL, {
                method: 'POST',
                headers: {
                    'Authorization': `Token ${userToken}`
                },
                body: formData,
            });
            console.log(formData);
            const result = await response.json();
            if (response.ok) {
                alert("Register successful!");
                console.log(result);
                navigate('/dashboard');
            } else {
                console.error("Register Failed:", result);
            }
        } catch (error) {
            console.error("Network Error:", error);
            alert("A network error occurred. Please try again.");
        } finally {
            setIsLoading(false); 
        }
        // reset();
    }
    if (isLoading) {
        return (
            <section className='container my-5 text-center'>
                <section className="login-page">
                    <div className="login-box">
                        <h2>Add a new Service</h2>
                    </div>
                </section>
                
                <div className="login-box">
                <h2 className='py-3'>Registering new Service ...</h2>
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
        <section className="login-page">
            <div className="login-box">
                <h2>Add a new Service</h2>
                <form onSubmit={handleSubmit(myHandleSubmit)} className='col-md-10 col-12 signupform'>
                    <input {...register("name", { required: true })} placeholder="Service Name" />
                    
                    <select {...register("category", { required: true })} className='p-2 mb-3'>
                        <option value="" >Select Category</option>
                        {CATEGORY_SECTIONS.map(choice => (
                            <option key={choice.slug} value={choice.slug}>{choice.title}</option>
                        ))}
                    </select>

                    <input type="number" {...register("price", { required: true })} placeholder="Price (EGP)" />
                    
                    <textarea {...register("description", { required: true })} placeholder="Description" className='w-100 p-3' />
                    
                    <input {...register("location", { required: true })} placeholder="Location (e.g., Cairo, Egypt)" />

                    <div className="file-input">
                        <label>Thumbnail Photo:</label>
                        <input type="file" {...register("thumbnail", { required: true })} accept="image/*" />
                    </div>

                    <div className="file-input">
                        <label>Gallery Images (Max 5):</label>
                        <input type="file" {...register("gallery_images")} multiple accept="image/*" />
                    </div>

                    <button type="submit" disabled={isLoading}>
                        {isLoading ? "Creating..." : "Create Service"}
                    </button>
                </form>
            </div>
        </section>

    )
}

export default Newservice
