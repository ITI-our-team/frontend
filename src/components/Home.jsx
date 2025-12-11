import './Home.css'
import { useEffect } from "react";

function Home() {

    useEffect(() => {
        const reveals = document.querySelectorAll(".reveal");

        const observer = new IntersectionObserver(
            entries => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add("show");
                    }
                });
            },
            {
                threshold: 0.2
            }
        );

        reveals.forEach(el => observer.observe(el));
    }, []);


    return (
        <>
            <section className='home-section'>
                <div className="container">
                    <div className="hair reveal reveal-left">
                        <img src="/hair-style.jpg" alt="hairImg" />
                        <p>Hair</p>
                        <h3>Beautiful Hair Style</h3>
                    </div>

                    <div className="right-content ">
                        <h2>KEEP YOUR LOVE STORY SHORT AND SWEET</h2>
                        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Quis quos perspiciatis cupiditate reprehenderit, illum dolorem neque provident sit nihil culpa corrupti. Eveniet atque vel quam repellendus earum error enim fugit.</p>
                    </div>

                    <div className="dress reveal reveal-left">
                        <img src="/dress.jpg" alt="dress" />
                        <p>Dress</p>
                        <h3>Amazing Dress</h3>
                    </div>
                    
                    <div className="photo reveal reveal-right">
                        <img src="/photo-session.jpg" alt="photo" />
                        <p>Photo Session</p>
                        <h3>Amazing Photosession</h3>
                    </div>

                    <div></div>
                    
                    <div className="makeup reveal reveal-right">
                        <img src="/makeup.jpg" alt="makeup" />
                        <p> Makeup </p>
                        <h3>Beautiful Makeup</h3>
                    </div>

                </div>
            </section>
        </>
    )
}

export default Home;

