import './Navbar.css'
import { Link, useLocation,useNavigate } from 'react-router-dom'
import { useEffect, useState, useRef } from 'react'
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../store/userSlice.js";

function Navbar({api_url}) {

    const location = useLocation()
    const [open, setOpen] = useState(false)

    const menuRef = useRef(null)
    const btnRef = useRef(null)
    const navigate = useNavigate();
    const authToken = localStorage.getItem("userToken"); 
    const dispatch = useDispatch();
    const {username,role} = useSelector((state) => state.user);
    async function btnlogout() {
        let answer = confirm("log out ?")
        if (!answer) { return }
        const API_URL = `${api_url}api/user/logout/`;
        let apiSuccess = false;
        try {
            const response = await fetch(API_URL, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Token ${authToken}` 
                },
            });

            if (response.ok || response.status === 200) {
                console.log("API Logout successful.");
                apiSuccess = true;
            } else {
                console.error("API Logout failed. Status:", response.status);
            }
        }
        catch (error) {
            console.error("Network error during API logout:", error);
        } finally {
            localStorage.clear();
            dispatch(logout());   
            navigate(`/`);
            window.location.reload();

            if (!apiSuccess) {
                alert("Logout completed locally, but there was an error clearing the session on the server.");
            }
        }
    }

    useEffect(() => {
        const nav = document.querySelector('.nav-section')

        if (location.pathname === "/") {

            const handleScroll = () => {
                if (window.scrollY >= window.innerHeight) {
                    nav.classList.add('scrolled')
                } else {
                    nav.classList.remove('scrolled')
                }
            }

            window.addEventListener('scroll', handleScroll)

            return () => window.removeEventListener('scroll', handleScroll)
        }

        nav.classList.add('scrolled')

    }, [location.pathname])

    useEffect(() => {
        const handleClickOutside = (e) => {
            if (
                open &&
                menuRef.current &&
                !menuRef.current.contains(e.target) &&
                !btnRef.current.contains(e.target)
            ) {
                setOpen(false)
            }
        }

        document.addEventListener('mousedown', handleClickOutside)

        return () => {
            document.removeEventListener('mousedown', handleClickOutside)
        }
    }, [open])

    useEffect(() => {
        const handleScroll = () => {
            if (open) setOpen(false)
        }

        window.addEventListener('scroll', handleScroll)
        return () => window.removeEventListener('scroll', handleScroll)
    }, [open])

    return (
        <section className="nav-section">
            <div className="container">
                <nav>
                    <div className="part-one">
                        <div className="logo">
                            <p>WEDORA</p>
                        </div>

                        <div className="menu">
                            <Link to="/"><button>Home</button></Link>
                            <Link to="/services"><button>venues and vendors</button></Link>
                            <Link to="/"><button>projects</button></Link>
                        </div>
                    </div>
                    {username ? (
                        <>
                            <div className="btns">
                                {(role === "vendor") && (
                                    <Link to="/dashboard"> 
                                        {/* this button only shows for vendors accounts */}
                                        <button className="sign-in">Dashboard</button>
                                    </Link>
                                )}
                                    <Link to="/updateinfo"> 
                                        {/* this button only shows for vendors accounts */}
                                        <button className="sign-in">Update Info</button>
                                    </Link>
                                    <button className="btn" onClick={btnlogout}>Logout</button>
                            </div>
                        </>
                    ) : (
                        <div className="btns">
                            <Link to="/login">
                                <button className="sign-in">Sign in</button>
                            </Link>
                            <Link to="/signup">
                                <button className="get-start">Get started</button>
                            </Link>
                        </div>
                    )}

                    <div
                        ref={btnRef}
                        className="mobile-menu-btn"
                        onClick={() => setOpen(!open)}
                    >
                        <span></span>
                        <span></span>
                        <span></span>
                    </div>
                </nav>

                <div
                    ref={menuRef}
                    className={`mobile-menu ${open ? 'show' : ''}`}
                >
                    <Link to="/" onClick={() => setOpen(false)}>Home</Link>
                    <Link to="/services" onClick={() => setOpen(false)}>Venues & Vendors</Link>
                    <Link to="/" onClick={() => setOpen(false)}>Projects</Link>

                    <hr />

                    <Link to="/login" onClick={() => setOpen(false)}>Sign in</Link>
                    <Link to="/signup" className="signup" onClick={() => setOpen(false)}>
                        Get started
                    </Link>
                </div>
            </div>
        </section>
    )
}

export default Navbar
