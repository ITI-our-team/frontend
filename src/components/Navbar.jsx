import './Navbar.css'
import { Link, useLocation } from 'react-router-dom'
import { useEffect, useState, useRef } from 'react'

function Navbar() {

    const location = useLocation()
    const [open, setOpen] = useState(false)

    const menuRef = useRef(null)
    const btnRef = useRef(null)

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

                    <div className="btns">
                        <Link to="/login">
                            <button className="sign-in">Sign in</button>
                        </Link>
                        <Link to="/signup">
                            <button className="get-start">Get started</button>
                        </Link>
                    </div>

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
