import { Link } from 'react-router-dom'
import './Login.css'

function SignUp() {
    return (
        <section className="login-page">
            <div className="login-box">
                <h2>Create Account</h2>
                <p>Welcome to your wedding journey.<br/>
                Sign Up to discover beautiful venues, vendors, and everything you need</p>


                <form>
                    <input type="text" placeholder="Full Name" />
                    <input type="email" placeholder="Email" />
                    <input type="password" placeholder="Password" />
                    <input type="password" placeholder="Confirm Password" />
                    <button type="submit">Sign Up</button>
                </form>

                <p className="switch-auth">
                    Already have an account? <Link to="/login">Sign in</Link>
                </p>
            </div>
        </section>
    )
}

export default SignUp
