import { Link,useNavigate } from 'react-router-dom'
import './SignUp.css'
import { useForm } from "react-hook-form"
import { useState } from "react";
import { FaEye, FaEyeSlash, FaUserCircle,FaTimesCircle } from "react-icons/fa";
import toast from 'react-hot-toast';

function SignUp({ api_url }) {
    const [showPass1, setShowPass1] = useState(false);
    const [showPass2, setShowPass2] = useState(false);
    const [imagePreview, setImagePreview] = useState(null);
    const navigate = useNavigate();
    const {
        register,watch,
        handleSubmit,
        formState: { errors },
        setValue,
        // reset,
    } = useForm();
    const [isLoading, setIsLoading] = useState(false);

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setImagePreview(URL.createObjectURL(file));
        }
    };
    const removeImage = () => {
        setImagePreview(null);
        setValue("profile_image", null);
        document.getElementById('profile_image').value = "";
    };

    async function myHandleSubmit(data) {
        setIsLoading(true);
        const API_URL = `${api_url}api/user/register/`;
        const formData = new FormData();
        formData.append("username", data.username);
        formData.append("password", data.passwd1);
        formData.append("password2", data.passwd2);
        formData.append("email", data.email);
        formData.append("first_name", data.fname);
        formData.append("last_name", data.lname);
        formData.append("phone_number", data.phonenum);
        formData.append("role", data.role ? "vendor" : "customer");
        
        if (data.profile_image && data.profile_image[0]) {
            formData.append("profile_image", data.profile_image[0]);
        }
        try {
            const response = await fetch(API_URL, {
                method: 'POST',
                body: formData,
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
        <section className="Signup-page">
            <div className="Signup-box">
                <h2>Create Account</h2>
                <p>Welcome to your wedding journey.<br/>
                Sign Up to discover beautiful venues, vendors, and everything you need</p>


                <form onSubmit={handleSubmit(myHandleSubmit)} className='col-md-10 col-12 signupform'>
                    <div className="form-group text-center mb-4">
                        <div className="profile-image-container">
                            {imagePreview ? (
                                <>
                                    <img src={imagePreview} alt="Preview" className="profile-preview-img" />
                                    <button 
                                        className="btn btn-outline-danger btn-sm mt-2 remove-img-btn" 
                                        onClick={removeImage}
                                    >
                                        <i className="fa-solid fa-trash"></i>
                                    </button>
                                </>
                            ) : (
                                <FaUserCircle size={80} color="#ccc" />
                            )}
                        </div>
                        
                        <label htmlFor="profile_image" className="d-block mt-2 image-label" >
                            {imagePreview ? "Change Photo" : "Upload Profile Photo (Optional)"}
                        </label>
                        <input 
                            type="file" 
                            id="profile_image" 
                            accept="image/*"
                            style={{display: 'none'}}
                            {...register("profile_image")}
                            onChange={(e) => {
                                register("profile_image").onChange(e); 
                                handleImageChange(e);
                            }}
                        />
                    </div>
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

                    <button type="submit" className='submit_btn' onClick={scrollToTop}>Sign Up</button>
                </form>

                <p className="switch-auth">
                    Already have an account? <Link to="/login">Sign in</Link>
                </p>
            </div>
        </section>
    )
}

export default SignUp
