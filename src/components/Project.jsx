import "./Project.css";

function Project() {
  return (
    <>
      <section className="portfolio-one" id="portfolio">
        <div className="container-fluid">
          <div className="row">
            <div className="col-md-12 normal">
              <div className="section-title text-center">
                <div className="section-title__triangle">
                  <span className="section-title__triangle-left"></span>
                  <span className="section-title__triangle-right"></span>
                </div>
                <h2 className="section-title__tagline">Our Completed Projects</h2>
              </div>
            </div>
          </div>

          {/* Slider Start */}
          <div className="portfolio-one__slider">
            
            {[1, 2, 3, 4].map((item) => (
              <div key={item} className="item col-3">
                <div className="portfolio-one__item">
                  <div className="portfolio-one__thumb">
                    <img src="/ring.jpg" alt="Project" loading="lazy" />
                  </div>

                  <div className="portfolio-one__hover">
                    <div className="portfolio-one__hover-bottom">
                      <div className="portfolio-one__cats">
                        <a href="portfolio.html">M & A</a>
                      </div>
                      <h3 className="portfolio-one__title">
                        <a href="portfolio-details.html">
                          Let's go to join our weeding
                        </a>
                      </h3>
                    </div>
                  </div>
                </div>
              </div>
            ))}

          </div>
          {/* Slider End */}

          <div className="button">
            <a href="portfolio.html" className="more-btn">
              <span className="-btn">Discover More</span>
            </a>
          </div>
        </div>
      </section>
    </>
  );
}

export default Project;
