import { Link,useNavigate } from 'react-router-dom'
import './Login.css'
import { useForm } from "react-hook-form"
import { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import toast from 'react-hot-toast';

function SignUp({ api_url }) {
    const [showPass1, setShowPass1] = useState(false);
    const [showPass2, setShowPass2] = useState(false);
    const navigate = useNavigate();
    const {
        register,watch,
        handleSubmit,
        formState: { errors },
        // reset,
    } = useForm();
    const [isLoading, setIsLoading] = useState(false);

    async function myHandleSubmit(data) {
        setIsLoading(true);
        const API_URL = `${api_url}api/user/register/`;
        try {
            const response = await fetch(API_URL, {
                method: 'POST',
                headers: {
                'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                username: data.username,
                password: data.passwd1,
                password2: data.passwd2,
                email: data.email,
                first_name: data.fname,
                last_name: data.lname,
                phone_number: data.phonenum,
                role: data.role ? "vendor" :"customer"
                }),
            });
            const result = await response.json();
            if (response.ok) {
                toast.success("Register successful!");
                console.log(result);
                navigate('/login');
            } else {
                let err = ""
                if (result["username"]) {
                    // console.error("Register Failed:", result["username"][0]);
                    err = err + `\n username : ${result["username"][0]}`;
                }
                if (result["email"]) {
                    // console.error("Register Failed:", result["email"][0]);
                    err = err + `\n Email : ${result["email"][0]}`;
                }
                if (result["phone_number"]) {
                    // console.error("Register Failed:", result["phone_number"][0]);
                    err = err + `\n Phone Number : ${result["phone_number"][0]}`;
                }
                // console.error("Register Failed:", result);
                console.log(err)
                toast.error(`Login Failed: ${err}`);
            }
        } catch (error) {
            console.error("Network Error:", error);
            toast.error("A network error occurred. Please try again.");
        } finally {
            setIsLoading(false); 
        }
        // reset();
    }
    if (isLoading) {
        return (
            <section className='container my-5 text-center'>
                <div className="login-box">
                <h2 className='py-3'>Registering the account ...</h2>
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
        const scrollToTop = () => {
        window.scrollTo({ top:0,left: 0, behavior: 'smooth' });
    };
    return (
        <section className="login-page">
            <div className="login-box">
                <h2>Create Account</h2>
                <p>Welcome to your wedding journey.<br/>
                Sign Up to discover beautiful venues, vendors, and everything you need</p>


                <form onSubmit={handleSubmit(myHandleSubmit)} className='col-md-10 col-12 signupform'>
                    <div className="form-group">
                        <label htmlFor="reg_username">Username *</label>
                        <input 
                            id="reg_username"
                            type="text" 
                            placeholder="Choose a username"
                            {...register("username", {
                                required: "Username can't be empty",
                                pattern: {
                                    value: /^[\w.@+-]+/i,
                                    message: "Enter a valid username (Letters, numbers, and @/./+/-/_ only)."
                                }
                            })} 
                        />
                        {errors.username && <span className="error-text">{errors.username.message}</span>}
                    </div>

                    <div className="two-inputs">
                        <div className="form-group">
                            <label htmlFor="fname">First Name</label>
                            <input id="fname" type="text" placeholder="First Name" {...register("fname")} />
                        </div>
                        <div className="form-group">
                            <label htmlFor="lname">Last Name</label>
                            <input id="lname" type="text" placeholder="Last Name" {...register("lname")} />
                        </div>
                    </div>

                    <div className="form-group">
                        <label htmlFor="reg_email">Email Address *</label>
                        <input 
                            id="reg_email"
                            type="email" 
                            placeholder="mail@example.com"
                            {...register("email", {
                                required: "Email can't be empty",
                                pattern: {
                                    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
                                    message: "Invalid email address format"
                                }
                            })} 
                        />
                        {errors.email && <span className="error-text">{errors.email.message}</span>}
                    </div>

                    <div className="form-group">
                        <label htmlFor="phonenum">Egyptian Phone Number *</label>
                        <input 
                            id="phonenum"
                            type="text" 
                            placeholder="01xxxxxxxxx"
                            {...register("phonenum", {
                                required: "Phone Number can't be Empty",
                                pattern: {
                                    value: /^01[0-2,5]{1}[0-9]{8}$/i,
                                    message: "Invalid Egyptian phone number."
                                }
                            })} 
                        />
                        {errors.phonenum && <span className="error-text">{errors.phonenum.message}</span>}
                    </div>

                    <div className="form-group">
                        <label htmlFor="passwd1">Password *</label>
                        <div className="input-container">
                            <input 
                                id="passwd1"
                                type={showPass1 ? "text" : "password"} 
                                {...register("passwd1", { required: "Password can't be empty" })} 
                            />
                            <span className="toggle-icon" onClick={() => setShowPass1(!showPass1)}>
                                {showPass1 ? <FaEyeSlash /> : <FaEye />}
                            </span>
                        </div>
                        {errors.passwd1 && <span className="error-text">{errors.passwd1.message}</span>}
                    </div>

                    <div className="form-group">
                        <label htmlFor="passwd2">Confirm Password *</label>
                        <div className="input-container">
                            <input 
                                id="passwd2"
                                type={showPass2 ? "text" : "password"} 
                                {...register("passwd2", {
                                    required: "Password confirmation can't be empty",
                                    validate: (val) => watch('passwd1') === val || "Your passwords do not match"
                                })} 
                            />
                            <span className="toggle-icon" onClick={() => setShowPass2(!showPass2)}>
                                {showPass2 ? <FaEyeSlash /> : <FaEye />}
                            </span>
                        </div>
                        {errors.passwd2 && <span className="error-text">{errors.passwd2.message}</span>}
                    </div>

                    <div className='d-flex py-3 justify-content-center align-items-center vendor-toggle'>
                        <input 
                            type="checkbox" 
                            id="role" 
                            className="mx-2" 
                            {...register("role")} 
                        />
                        <label htmlFor="role" className="mb-0">Sign up as a vendor?</label>
                    </div>

                    <button type="submit" onClick={scrollToTop}>Sign Up</button>
                </form>

                <p className="switch-auth">
                    Already have an account? <Link to="/login">Sign in</Link>
                </p>
            </div>
        </section>
    )
}

export default SignUp
