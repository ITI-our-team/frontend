import './Navbar.css'
import { Link, useLocation,useNavigate } from 'react-router-dom'
import { useEffect, useState, useRef } from 'react'
import toast from 'react-hot-toast'

function Navbar({api_url}) {

    const location = useLocation()
    const [open, setOpen] = useState(false)

    const menuRef = useRef(null)
    const btnRef = useRef(null)
    const navigate = useNavigate();
    const userToken = localStorage.getItem("userToken"); 
    const username = localStorage.getItem("username"); 
    const role = localStorage.getItem("role"); 
    function btnlogout() {
        toast((t) => (
            <span className="text-center">
                <b>Logging out?</b> We'll miss you!
                <div className="d-flex gap-2 mt-2 justify-content-center">
                    <button
                        className="btn btn-danger btn-sm"
                        onClick={() => {
                            toast.dismiss(t.id);
                            executeLogout();
                        }}
                    >
                        Yes, Logout
                    </button>
                    <button
                        className="btn btn-secondary btn-sm"
                        onClick={() => toast.dismiss(t.id)}
                    >
                        Cancel
                    </button>
                </div>
            </span>
        ), { position: 'top-center', duration: 5000 });
    }
    async function executeLogout() {
        const API_URL = `${api_url}api/user/logout/`;
        let apiSuccess = false;
        try {
            const response = await fetch(API_URL, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Token ${userToken}` 
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
            toast.success("Successfully logged out!");
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
                                {role === "customer" && (
                                    <Link to="/my-bookings">
                                        <button className="sign-in">My Bookings</button>
                                    </Link>
                                )}
                                    <Link to="/updateinfo"> 
                                        {/* this button only shows for vendors accounts */}
                                        <button className="sign-in">Update Info</button>
                                    </Link>
                                    <button className="btn text-light" onClick={btnlogout}>Logout</button>
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

                    {username ? (
                        <>
                            <p className="px-3 small text-muted">Welcome, {username}</p>
                            {role === 'vendor' && <Link to="/dashboard" onClick={() => setOpen(false)}>Dashboard</Link>}
                            <Link to="/updateinfo" onClick={() => setOpen(false)}>My Profile</Link>
                            <button className="btn btn-danger btn-sm m-3" onClick={() => { setOpen(false); btnlogout(); }}>
                                Logout
                            </button>
                        </>
                    ) : (
                        <>
                            <Link to="/login" onClick={() => setOpen(false)}>Sign in</Link>
                            <Link to="/signup" className="signup" onClick={() => setOpen(false)}>Get started</Link>
                        </>
                    )}
                </div>
            </div>
        </section>
    )
}

export default Navbar
