import { useState } from 'react';
import './Form.css'
import toast from 'react-hot-toast';

function Form({service,api_url}) {
    const stored_email = localStorage.getItem("email"); 
    const stored_fname = localStorage.getItem('fname');
    const stored_lname = localStorage.getItem('lname');
    const userToken = localStorage.getItem("userToken");
    const today = new Date().toISOString().split('T')[0];
    const currentTimeStr = new Date().toTimeString().slice(0, 5);
    const [formData, setFormData] = useState({
        email: stored_email || '',
        firstName: stored_fname || '',
        lastName: stored_lname || '',
        weddingDate: '',
        time_type: 'full', 
        startTime: '', 
        endTime: '',
        message: ''
    });


    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (formData.time_type === 'half' && formData.startTime >= formData.endTime) {
            toast.error("End time must be after start time");
            return;
        }

        let submissionData = {
            service: service.id,
            booking_date: formData.weddingDate,
            notes: formData.message,
            start_time: formData.startTime,
            end_time: formData.endTime
        };
        if (formData.time_type === "full") {
            submissionData.start_time = "00:00:00"; // 12:00 AM Time is in 24Hours format
            submissionData.end_time = "23:59:59";   // 12:00 PM (or "23:59" for midnight)
        }else {
            // Ensure time format is HH:MM:SS for Django TimeField
            if (submissionData.start_time) submissionData.start_time += ":00";
            if (submissionData.end_time) submissionData.end_time += ":00";
        }

        try {
            const response = await fetch(`${api_url}api/bookings/`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Token ${userToken}`
                },
                body: JSON.stringify(submissionData),
            });
            console.log(submissionData);
            const result = await response.json();

            if (response.ok) {
                toast.success('Booking Requested Successfully!');
                // Reset fields
                setFormData({
                    ...formData,
                    weddingDate: '',
                    message: '',
                    time_type: 'full', 
                    startTime: '', 
                    endTime: '',
                });
            } else {
                const errorMsg = result.non_field_errors || result.detail || "Booking failed.";
                toast.error(`Error: ${errorMsg}`);
            }
        } catch (error) {
            console.error('Network Error:', error);
            toast.error('Connection error. Please try again.');
        }
    };

    return (
        <>
            <div className='form-section'>
                <form onSubmit={handleSubmit}>
                    <label>Email</label>
                    <input name="email" type="email" value={formData.email}
                    placeholder="Enter your email" onChange={handleChange} required />
                    <div className="two-inputs">
                        <div>
                            <label>First Name *</label>
                            <input name="firstName" type="text"
                                value={formData.firstName} onChange={handleChange}
                                placeholder="Enter your first name" required />
                        </div>

                        <div>
                            <label>Last Name *</label>
                            <input name="lastName" type="text"
                                value={formData.lastName} onChange={handleChange}
                                placeholder="Enter your last name" required />
                        </div>
                    </div>

                    <label>Wedding Date *</label>
                    <input name="weddingDate" type="date" min={today}
                        value={formData.weddingDate} onChange={handleChange}
                        required />
                    
                    {service.category === "wedding_planner" && (
                        <>
                            <label>Start Time</label>
                            <input name="startTime" type='time'
                                min={formData.weddingDate === today ? currentTimeStr : "00:00"}
                                value={formData.startTime} onChange={handleChange} />
                        </>
                    )}
                    {service.category === "photographer" && (
                        <>
                            <label>Time Duration</label>
                            <select name="time_type" value={formData.time_type} onChange={handleChange}>
                                <option value="full">Full day</option>
                                <option value="half">Half day</option>
                            </select>

                            {formData.time_type === "half" && (
                                <div className="two-inputs mt-3">
                                    <div>
                                        <label>Start Time</label>
                                        <input name="startTime" type="time"
                                            value={formData.startTime} onChange={handleChange}
                                            min={formData.weddingDate === today ? currentTimeStr : "00:00"}
                                            required />
                                    </div>
                                    <div>
                                        <label>End Time</label>
                                        <input name="endTime" type="time" value={formData.endTime} onChange={handleChange} required />
                                    </div>
                                </div>
                            )}
                        </>
                    )}

                    <label>Message</label>
                    <textarea name="message" value={formData.message}
                        placeholder="Enter the message you want"
                        onChange={handleChange} rows="4"></textarea>

                    <p className="terms">
                        By submitting your inquiry, you agree to our{" "}
                        <span>Terms of Use</span> and <span>Privacy Policy</span>.
                    </p>

                    <button type="submit">Submit</button>
                </form>
            </div>
        </>
    )
}

export default Form
