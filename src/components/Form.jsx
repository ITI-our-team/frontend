import { useState } from 'react';
import './Form.css'

function Form() {
    const stored_email = localStorage.getItem("email"); 
    const stored_fname = localStorage.getItem('fname');
    const stored_lname = localStorage.getItem('lname');

    const [formData, setFormData] = useState({
        email: stored_email || '',
        firstName: stored_fname || '',
        lastName: stored_lname || '',
        weddingDate: '',
        message: ''
    });

    const [status, setStatus] = useState('');

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setStatus('Sending...');
        
        const SCRIPT_URL = import.meta.env.VITE_GOOGLE_SHEET_URL;

        try {
            await fetch(SCRIPT_URL, {
                method: 'POST',
                body: JSON.stringify(formData),
            });
            setStatus('Inquiry Sent Successfully!');
            setFormData({ email: '', firstName: '', lastName: '', weddingDate: '', message: '' });
        } catch (error) {
            console.error('Error!', error.message);
            setStatus('Error sending inquiry.');
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
                    <input name="weddingDate" type="date"
                        value={formData.weddingDate} onChange={handleChange}
                        required />
                    
                    <label>Message</label>
                    <textarea name="message" value={formData.message}
                        placeholder="Enter the message you want"
                        onChange={handleChange} rows="4"></textarea>

                    <p className="terms">
                        By submitting your inquiry, you agree to our{" "}
                        <span>Terms of Use</span> and <span>Privacy Policy</span>.
                    </p>

                    <p>{status}</p>
                    <button type="submit">Submit Inquiry</button>
                </form>
            </div>
        </>
    )
}

export default Form
