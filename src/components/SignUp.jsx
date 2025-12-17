import { Link,useNavigate } from 'react-router-dom'
import './Login.css'
import { useForm } from "react-hook-form"
import { useState } from "react";

function SignUp({ api_url }) {
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
                alert("Register successful!");
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
                alert(`Login Failed: ${err}`);
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


                <form onSubmit={handleSubmit(myHandleSubmit)} className='col-md-8 col-12 signupform'>
                    <input type="text" placeholder="Username"
                        {...register("username",
                        {
                        required: "Username can't be empty",
                        pattern: {
                            value: /^[\w.@+-]+/i,
                            message:"Enter a valid username. This value may contain only letters, numbers, and @/./+/-/_ characters."
                        }
                        })} />
                    {errors.username && <span>{errors.username.message}</span>}

                    <input type="text" placeholder="First Name" {...register("fname")}/>
                    <input type="text" placeholder="Last Name" {...register("lname")} />
                    
                    <input type="email" placeholder="Email"
                        {...register("email", {
                            required: "email can't be empty",
                        pattern:{
                            value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
                            message:"Invalid email address format"
                        }
                        })}/>
                    {errors.email && <span>{errors.email.message}</span>}

                    <input type="text" placeholder="Phone Number"
                        {...register("phonenum",
                        {
                        required: "Phone Number can't be Empty",
                        pattern: {
                            value: /^01[0-2,5]{1}[0-9]{8}$/i,
                            message:"Invalid Egyptian phone number."
                    }
                        })} />
                    {errors.phonenum && <span>{errors.phonenum.message}</span>}

                    <input type="password" placeholder="Password"
                        {...register("passwd1", { required: "Password can't be empty", })} />
                    {errors.passwd1 && <span>{errors.passwd1.message}</span>}

                    <input type="password" placeholder="Confirm Password"
                        {...register("passwd2", {
                        required: "Password confirmation can't be empty",
                        validate: (val) => {
                            if (watch('passwd1') != val) {
                            return "Your passwords do no match";
                            }
                        }
                        })} />
                    {errors.passwd2 && <span>{errors.passwd2.message}</span>}

                    <div className='d-flex py-2 justify-content-center align-items-center'>
                    <input type="checkbox" name="role" id="role" className="py-0 my-0 mx-2" value="False"
                        {...register("role")} />
                    <label htmlFor="role" className="">sign up as a vendor?</label>
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
