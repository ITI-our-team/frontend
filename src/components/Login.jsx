import { Link,useNavigate } from 'react-router-dom'
import { useForm } from "react-hook-form"
import { useState } from "react";
import './Login.css'
// import { useDispatch } from "react-redux";
// import { login } from '../store/userSlice.js';
import { FaEye, FaEyeSlash } from "react-icons/fa";
import toast from 'react-hot-toast';

function Login({ api_url }) {
    const [showPass, setShowPass] = useState(false);
    const navigate = useNavigate();
    const {
        register,
        handleSubmit,
        formState: { errors },
        // reset,
    } = useForm();
    const [isLoading, setIsLoading] = useState(false);
    
    // const dispatch = useDispatch();

    async function myHandleSubmit(data) {
        setIsLoading(true);
        const API_URL = `${api_url}api/user/login/`;
        try {
            const response = await fetch(API_URL, {
                method: 'POST',
                headers: {
                'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                username: data.username,
                password: data.passwd
                }),
            });
            const result = await response.json();
            if (response.ok) {
                // alert("Login successful!");
                toast.success('Login successful, Welcome back!');
                console.log(result);
                // store the users info in localstorage
                localStorage.setItem('userToken', result.token);
                localStorage.setItem('fname', result.fname);
                localStorage.setItem('lname', result.lname);
                localStorage.setItem('email', result.email);
                localStorage.setItem('username', result.username);
                localStorage.setItem('role', result.role);
                localStorage.setItem('user_id', result.id);
                localStorage.setItem('phone_number', result.phone_number);
                localStorage.setItem('isLoggedIn', true);
                // dispatch(login({
                //     email: result.email,
                //     username: result.username,
                //     token: result.token,
                //     user_id: result.id,
                //     fname: result.fname,
                //     lname: result.lname,
                //     role:result.role,
                //     phone_number:result.phone_number
                // }));
                // let's try to save in local storage for now 
                if (result.role == "customer") {
                    // this user is a customer
                    navigate('/services');
                } else {
                    // this user should be a vendor
                    navigate('/dashboard');

                }
            } else {
                console.error("Login Failed:", result);
                // alert(`Login Failed: Either the Email or the Password is incorrect`);
                toast.error('Login failed. Please try again: Either the Email or the Password is incorrect')
            }
        } catch (error) {
            console.error("Network Error:", error);
            toast.error("A network error occurred. Please try again.");
        } finally {
            setIsLoading(false); 
        }
    }
    if (isLoading) {
        return (
            <section className='container my-5 text-center'>
                <div className="login-box">
                <h2 className='py-3'>Logging In ...</h2>
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
                <h2>Sign In To Your Account</h2>
                <p>Welcome to your wedding journey.<br/>
                Log in to discover beautiful venues, vendors, and everything you need</p>

                <form onSubmit={handleSubmit(myHandleSubmit)} className="login-form">
                    <div className="form-group mb-3">
                        <label htmlFor="login_username">Username</label>
                        <input 
                            id="login_username"
                            type="text" 
                            placeholder="Username"
                            {...register("username", { required: "Username can't be empty" })} 
                        />
                        {errors.username && <span className="error-text">{errors.username.message}</span>}
                    </div>

                    <div className="form-group mb-3 password-wrapper">
                        <label htmlFor="login_password">Password</label>
                        <div className="input-container">
                            <input 
                                id="login_password"
                                type={showPass ? "text" : "password"} 
                                {...register("passwd", { required: "Password can't be empty" })} 
                            />
                            <span className="toggle-icon" onClick={() => setShowPass(!showPass)}>
                                {showPass ? <FaEyeSlash /> : <FaEye />}
                            </span>
                        </div>
                        {errors.passwd && <span className="error-text">{errors.passwd.message}</span>}
                    </div>

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
