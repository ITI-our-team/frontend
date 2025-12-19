import React from 'react'
import { useState } from "react";
import { useForm } from "react-hook-form"
// import { useSelector } from "react-redux";
import { Link,useNavigate } from 'react-router-dom'
import CATEGORY_SECTIONS from './categories'
import { MapContainer, TileLayer, Marker, useMapEvents } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';

function Newservice({api_url}) {
    const navigate = useNavigate();
    const {
        register,
        handleSubmit,
        // reset,
        setValue
    } = useForm();
    const [isLoading, setIsLoading] = useState(false);
    // const {userToken} = useSelector((state) => state.user);
    const userToken = localStorage.getItem("userToken"); 
    const [extras, setExtras] = useState([{ name: "", price: "" }]);
    const [position, setPosition] = useState([30.0444, 31.2357]); // Default: Cairo
    const addExtra = () => setExtras([...extras, { name: "", price: "" }]);
    const removeExtra = (index) => setExtras(extras.filter((_, i) => i !== index));
    const handleExtraChange = (index, field, value) => {
        const newExtras = [...extras];
        newExtras[index][field] = value;
        setExtras(newExtras);
    };
    function LocationMarker() {
        useMapEvents({
            async click(e) {
                const { lat, lng } = e.latlng;
                setPosition([lat, lng]);
                try {
                    const response = await fetch(
                        `https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lng}`
                    );
                    const data = await response.json();
                    if (data.display_name) {
                        setValue("location", data.display_name);
                    }
                } catch (error) {
                    console.error("Geocoding error:", error);
                }
            },
        });
        return position === null ? null : <Marker position={position} />;
    }
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
        const validExtras = extras.filter(e => e.name !== "" && e.price !== "");
        formData.append('extras_data', JSON.stringify(validExtras));
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
                <form onSubmit={handleSubmit(myHandleSubmit)} className='col-12 signupform'>
                    <label htmlFor="serv_name">Service Name *</label>
                    <input {...register("name", { required: true })} id="serv_name" placeholder="Service Name" />
                    
                    <div className='d-flex flex-column'>
                        <label htmlFor="serv_cat">Category *</label>
                        <select {...register("category", { required: true })} id="serv_cat" className='p-2 mb-3'>
                            <option value="" >Select Category</option>
                            {CATEGORY_SECTIONS.map(choice => (
                                <option key={choice.slug} value={choice.slug}>{choice.title}</option>
                            ))}
                        </select>
                    </div>

                    <div>
                        <label htmlFor="serv_price">Base Price (EGP) *</label>
                        <input type="number" {...register("price", { required: true })} id="serv_price" placeholder="Price (EGP)" />
                    </div>

                    <label htmlFor="serv_desc">Description *</label>
                    <textarea {...register("description", { required: true })} id="serv_desc" placeholder="Description" className='w-100 p-3' />
                    
                    <label htmlFor="serv_loc">Location *</label>
                    <input {...register("location", { required: true })} id="serv_loc" placeholder="Location (e.g., Cairo, Egypt)" />
                    <div className='leaflocation_minimap'>
                        <MapContainer center={[30.0444, 31.2357]} zoom={10} scrollWheelZoom={false} style={{ height: "100%", width: "100%" }}>
                            <TileLayer
                                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                                // attribution='&copy; OpenStreetMap contributors'
                            />
                            <LocationMarker />
                        </MapContainer>
                    </div>

                    <div className="file-input">
                        <label htmlFor="serv_thumb">Thumbnail Photo (Main Display) *</label>
                        <input type="file" {...register("thumbnail", { required: true })} id="serv_thumb" accept="image/*" />
                    </div>

                    <div className="file-input">
                        <label htmlFor="serv_gallery">Gallery Images (Max 5)</label>
                        <input type="file" {...register("gallery_images")} id="serv_gallery" multiple accept="image/*" />
                    </div>
                    <div className="extras-section mt-3">
                        <h4>Service Extras (Optional)</h4>
                        {extras.map((extra, index) => (
                            <div key={index} className="d-flex gap-2 mb-2 align-items-center">
                                <div className="flex-grow-1">
                                    <label className="small">Extra Name</label>
                                    <input 
                                        type="text" 
                                        placeholder="Extra name" 
                                        value={extra.name}
                                        onChange={(e) => handleExtraChange(index, 'name', e.target.value)}
                                    />
                                </div>
                                <div >
                                    <label className="small">Price</label>
                                    <input 
                                        type="number" 
                                        placeholder="Price" 
                                        value={extra.price}
                                        onChange={(e) => handleExtraChange(index, 'price', e.target.value)}
                                    />
                                </div>
                                {extras.length > 1 && (
                                    <button type="button" className="btn btn-danger w-25 mt-4" onClick={() => removeExtra(index)}>Remove</button>
                                )}
                            </div>
                        ))}
                        <button type="button" className="btn btn-secondary mb-3" onClick={addExtra}>+ Add Extra</button>
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
