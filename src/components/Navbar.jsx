import './Navbar.css'
import { Link, useLocation } from 'react-router-dom'
import { useEffect } from 'react'

function Navbar() {

    const location = useLocation()

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
                </nav>
            </div>
        </section>
    )
}

export default Navbar
