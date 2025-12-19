import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
// import { useSelector } from 'react-redux';
import CATEGORY_SECTIONS from './categories';

function EditService({ api_url }) {
    const { id } = useParams();
    const navigate = useNavigate();
    // const { userToken } = useSelector((state) => state.user);
    const userToken = localStorage.getItem("userToken"); 
    const [isLoading, setIsLoading] = useState(false);
    
    const [formData, setFormData] = useState({
        name: '',
        category: '',
        description: '',
        price: '',
        location: '',
    });

    // Files are handled separately from text state
    const [thumbnail, setThumbnail] = useState(null);
    const [gallery, setGallery] = useState(null);

    // 1. Fetch existing data
    useEffect(() => {
        const fetchService = async () => {
            setIsLoading(true);
            const res = await fetch(`${api_url}api/services/${id}/`);
            try{

                const data = await res.json();
                if (res.ok) {
                    console.log(data)
                    setFormData({
                        name: data.name,
                        category: data.category,
                        description: data.description,
                        price: data.price,
                        location: data.location,
                        thumbnail:data.thumbnail
                    });
                }
            }
            catch (error) {
                console.error("Network Error:", error);
                alert("A network error occurred. Please try again.");
            } finally {
                setIsLoading(false); 
            }
        };
        fetchService();
    }, [api_url, id]);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.id]: e.target.value });
    };

    const handleUpdate = async (e) => {
        e.preventDefault();
        setIsLoading(true);

        const dataToSend = new FormData();
        Object.keys(formData).forEach(key => dataToSend.append(key, formData[key]));
        
        if (thumbnail) dataToSend.append('thumbnail', thumbnail);
        if (gallery) {
            Array.from(gallery).forEach(file => dataToSend.append('uploaded_images', file));
        }

        try {
            const response = await fetch(`${api_url}api/services/${id}/`, {
                method: 'PATCH', // Use PATCH for partial updates
                headers: {
                    'Authorization': `Token ${userToken}`
                },
                body: dataToSend,
            });

            if (response.ok) {
                alert("Updated successfully!");
                navigate(`/services/${id}`);
            }
        } catch (error) {
            console.error("Update Error:", error);
        } finally {
            setIsLoading(false);
        }
    };
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
        <section className="login-page">
            <div className="login-box">
                <h2>Edit Service</h2>
                <form onSubmit={handleUpdate} className='col-12 signupform'>
                    
                    <div className="form-group">
                        <label htmlFor="name">Service Name</label>
                        <input id="name" value={formData.name} onChange={handleChange} required />
                    </div>

                    <div className="form-group d-flex flex-column">
                        <label htmlFor="category">Service Category</label>
                        <select id="category" value={formData.category} onChange={handleChange} className='p-2 mb-3'>
                            {CATEGORY_SECTIONS.map(choice => (
                                <option key={choice.slug} value={choice.slug}>{choice.title}</option>
                            ))}
                        </select>
                    </div>

                    <div className="form-group">
                        <label htmlFor="price">Service Price</label>
                        <input id="price" type="number" value={formData.price} onChange={handleChange} required />
                    </div>

                    <div className="form-group">
                        <label htmlFor="description">Description</label>
                        <textarea id="description" value={formData.description} onChange={handleChange} className='w-100 p-3' />
                    </div>

                    <div className="form-group">
                        <label htmlFor="location">Location</label>
                        <input id="location" value={formData.location} onChange={handleChange} />
                    </div>
                    
                    <div className='d-flex justify-content-center flex-column'>
                        {formData.thumbnail ? 
                            <label className='mx-auto' >Thumbnail Image</label>
                        :<></>}
                        <img className='w-25 mx-auto' src={formData.thumbnail}></img>
                    </div>
                    <div className="file-input ">
                        <label>Change Thumbnail (Optional):</label>
                        <input type="file" onChange={(e) => setThumbnail(e.target.files[0])} accept="image/*" />
                    </div>

                    <div className="file-input">
                        <label>Replace Gallery (Optional):</label>
                        <input type="file" multiple onChange={(e) => setGallery(e.target.files)} accept="image/*" />
                    </div>

                    <button type="submit" disabled={isLoading}>
                        {isLoading ? "Saving..." : "Save Changes"}
                    </button>
                </form>
            </div>
        </section>
    );
}

export default EditService;