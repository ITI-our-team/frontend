
import './Form.css'

function Form() {

    return (
        <>
            <div className='form-section'>
                <form>
                    <label>Email</label>
                    <input type="email" placeholder="mail@email.com" required />
                    <div className="two-inputs">
                        <div>
                            <label>First Name *</label>
                            <input type="text" placeholder="First name" required />
                        </div>

                        <div>
                            <label>Last Name *</label>
                            <input type="text" placeholder="Last name" required />
                        </div>
                    </div>

                    <label>Wedding Date *</label>
                    <input type="date" />
                    
                    <label>Message</label>
                    <textarea
                        placeholder="Tell us about your wedding..."
                        rows="4"
                    ></textarea>

                    <p className="terms">
                        By submitting your inquiry, you agree to our{" "}
                        <span>Terms of Use</span> and <span>Privacy Policy</span>.
                    </p>

                    <button type="submit">Submit Inquiry</button>
                </form>
            </div>
        </>
    )
}

export default Form
