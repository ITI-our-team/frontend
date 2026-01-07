import './Navbar.css'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { useEffect, useState, useRef } from 'react'
import toast from 'react-hot-toast'
import { FaUserCircle } from "react-icons/fa";

function Navbar({ api_url }) {

    const location = useLocation()
    const [open, setOpen] = useState(false)
    const [openUserMenu, setOpenUserMenu] = useState(false);
    const menuRef = useRef(null)
    const btnRef = useRef(null)
    const navigate = useNavigate();
    const userToken = localStorage.getItem("userToken");
    const username = localStorage.getItem("username");
    const profile_image = localStorage.getItem("profile_image");
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
                if (window.scrollY >= 100) {
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

                    <div className="logo">
                        <p>WEDORA <i className="fa-solid fa-crown"></i></p>
                    </div>

                    <div className="menu">
                        <Link to="/">
                            <button className={location.pathname === "/" ? "active" : ""}>
                                Home
                            </button>
                        </Link>

                        <Link to="/services">
                            <button className={location.pathname.startsWith("/services") ? "active" : ""}>
                                Venues and Vendors
                            </button>
                        </Link>

                            <Link to="/projects">
                                <button className={location.pathname === "/projects" ? "active" : ""}>
                                    Blogs
                                </button>
                            </Link>
                        </div>
                    
                    {username ? (
                        <>
                            <div className="btns">

                                <div className="user-menu-wrapper">
                                    <div
                                        className={`profile-img-container ${openUserMenu ? "active-user" : ""}`}
                                        onClick={() => setOpenUserMenu(!openUserMenu)}
                                    >
                                        {profile_image ? (
                                            <img src={profile_image} className="profile-prev-img" />
                                        ) : (
                                            <FaUserCircle size={45} color="#bab7b7" />
                                        )}
                                    </div>

                                    {openUserMenu && (
                                        <div className="user-dropdown">

                                            {(role === "vendor") && (
                                                <Link to="/dashboard">
                                                    {/* this button only shows for vendors accounts */}
                                                    <i class="fa-solid fa-chart-line"></i> Dashboard
                                                </Link>
                                            )}

                                            {role === "customer" && (
                                                <Link to="/my-bookings"> <i class="fa-regular fa-rectangle-list"></i>My Bookings</Link>
                                            )}

                                            <Link to="/updateinfo"><i class="fa-solid fa-gear"></i> Update Info</Link>
                                            <hr />
                                            <button
                                                className="logout-item"
                                                onClick={btnlogout}
                                            >
                                                <i class="fa-solid fa-arrow-right-from-bracket"> </i>
                                                Logout
                                            </button>
                                        </div>
                                    )}
                                </div>
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
                    <p className="welcome-para">Welcome, {username}</p>
                    <hr />
                    <Link to="/" onClick={() => setOpen(false)}>Home</Link>
                    <Link to="/services" onClick={() => setOpen(false)}>Venues & Vendors</Link>
                    <Link to="/" onClick={() => setOpen(false)}>Projects</Link>

                    {username ? (
                        <>
                            {role === 'vendor' && <Link to="/dashboard" onClick={() => setOpen(false)}>Dashboard</Link>}
                            <Link to="/updateinfo" onClick={() => setOpen(false)}>My Profile</Link>
                            <hr />
                            <button className="logout-item" onClick={() => { setOpen(false); btnlogout(); }}>
                                <i class="fa-solid fa-arrow-right-from-bracket"> </i>
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
