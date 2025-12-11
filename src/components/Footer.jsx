
import './Footer.css'

function Footer() {

    return (
        <>
            <section className='footer-section'>
                <div className="container">
                    <div className="content-footer">
                        <h1>Wedora</h1>
                        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Harum voluptas exercitationem, adipisci quisquam saepe sunt, voluptate soluta minus nesciunt velit numquam tempore ea commodi magni explicabo id placeat ipsa distinctio.</p>
                    </div>

                    <div className="explore-social">
                        <div className="explore">
                            <h4>Explore</h4>
                            <ul>
                                <li><a href="#">Home</a></li>
                                <li><a href="#">About Us</a></li>
                                <li><a href="#">Services</a></li>
                                <li><a href="#">Rewiews</a></li>
                                <li><a href="#">Contact Us</a></li>
                            </ul>
                        </div>
                        <div className="social">
                            <h4>Contact</h4>
                            <ul>
                                <li><a href="#"><i class="fa-brands fa-facebook"></i></a></li>
                                <li><a href="#"><i class="fa-solid fa-envelope"></i></a></li>
                                <li><a href="#"><i class="fa-brands fa-instagram"></i></a></li>
                            </ul>
                        </div>
                    </div>


                </div>
                
            </section>
        </>
    )
}

export default Footer;