import { useEffect, useRef } from 'react';
import './Hero.css'

function Hero() {
    const contentRef = useRef(null);
    
    useEffect(() => {
        const currentRef = contentRef.current;
        if (!currentRef) return;
        const timer = setTimeout(() => {
            currentRef.classList.add('show');
        }, 100);
        
        return () => {
            clearTimeout(timer);
        };
    }, []);
    
    return (
        <>
            <section className="hero-section">
                <div className="hero-content" ref={contentRef}>
                    <h2>Plan, Style, Celebrate, With <span>Wedora ♡</span></h2>
                    <p>From dresses to decor, we cover all your wedding needs.</p>
                    <button>Explore Services</button>
                </div>
            </section>
        </>
    )
}

export default Hero;