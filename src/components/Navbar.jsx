
import './Navbar.css'

function Navbar() {
    return (
        <>
            <section className='nav-section'>
                <div className="container">
                    <nav>
                        <div className="part-one">
                            {/* Logo */}
                            <div className="logo">
                                <p>WEDORA</p>
                            </div>

                            {/* buttons Menu */}
                            <div className="menu">
                                <button>Home</button>
                                <button>venues and vendors <i class="fa-solid fa-angle-down"></i></button>
                                <button>shop <i class="fa-solid fa-angle-down"></i></button>
                            </div>
                        </div>
                        {/* buttons login & started */}
                        <div className="btns">
                            <button className='sign-in'>Sign in</button>
                            <button className='get-start'>Get started</button>
                        </div>
                    </nav>
                </div>
            </section>
        </>
    )
}

export default Navbar
