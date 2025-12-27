import "./Project.css";
import { Link } from 'react-router-dom';

function Project({ limit }) {
  const projects = [
    { id: 1, img: "/ring.jpg", name: "M & A", title: "Let's go to join our wedding" },
    { id: 2, img: "/ring.jpg", name: "M & A", title: "Special Wedding Day" },
    { id: 3, img: "/ring.jpg", name: "M & A", title: "Luxury Wedding Party" },
    { id: 4, img: "/ring.jpg", name: "M & A", title: "Forever Together" },
    { id: 5, img: "/ring.jpg", name: "M & A", title: "Let's go to join our wedding" },
    { id: 6, img: "/ring.jpg", name: "M & A", title: "Let's go to join our wedding" },
    { id: 7, img: "/ring.jpg", name: "M & A", title: "Let's go to join our wedding" },
    { id: 8, img: "/ring.jpg", name: "M & A", title: "Let's go to join our wedding" },
  ];

  const displayedProjects = limit ? projects.slice(0, limit) : projects;

  return (
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
          {displayedProjects.map((project) => (
            <div key={project.id} className="item col-3">
              <div className="portfolio-one__item">
                <div className="portfolio-one__thumb">
                  <img src={project.img} alt={project.title} loading="lazy" />
                </div>

                <div className="portfolio-one__hover">
                  <div className="portfolio-one__hover-bottom">
                    <div className="portfolio-one__cats">
                      <span>{project.name}</span>
                    </div>
                    <h3 className="portfolio-one__title">{project.title}</h3>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
        {/* Slider End */}

        <div className="button">
          <Link to="/project-details" className="more-btn">
            <span className="-btn">Discover More</span>
          </Link>
        </div>
      </div>
    </section>
  );
}

export default Project;
