import { Link } from 'react-router-dom'
import './Login.css'

function Login() {
    return (
        <section className="login-page">
            <div className="login-box">
                <h2>Sign In To Your Account</h2>
                <p>Welcome to your wedding journey.<br/>
                Log in to discover beautiful venues, vendors, and everything you need</p>

                <form>
                    <input type="email" placeholder="Email" />
                    <input type="password" placeholder="Password" />
                    <button type="submit">Login</button>
                </form>

                <p className="switch-auth">
                    Don’t have an account? <Link to="/signup">Create one</Link>
                </p>
            </div>
        </section>
    )
}

export default Login
