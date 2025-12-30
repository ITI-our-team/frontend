import "./Project.css";
import { Link } from "react-router-dom";

function Project({ limit }) {
  const projects = [
    {
      id: 1,
      img: "/photo-session8.jpg",
      name: "M & A",
      title: "Let's go to join our wedding",
    },
    { id: 2, img: "/photo-session.jpg", name: "M & A", title: "Special Wedding Day" },
    { id: 3, img: "/photo-session2.jpg", name: "M & A", title: "Luxury Wedding Party" },
    { id: 4, img: "/photo-session6.jpg", name: "M & A", title: "Forever Together" },
    {
      id: 5,
      img: "/photo-session4.jpg",
      name: "M & A",
      title: "Let's go to join our wedding",
    },
    {
      id: 6,
      img: "/photo-session7.jpg",
      name: "M & A",
      title: "Let's go to join our wedding",
    },
    {
      id: 7,
      img: "/photo-session5.jpg",
      name: "M & A",
      title: "Let's go to join our wedding",
    },
    {
      id: 8,
      img: "/photo-session3.jpg",
      name: "M & A",
      title: "Let's go to join our wedding",
    },
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
              <h2 className="section-title__tagline">Our Completed Blogs</h2>
            </div>
          </div>
        </div>

        {/* Slider Start */}
        <div className="portfolio-one__slider">
          {displayedProjects.map((project) => (
            <div key={project.id} className="item col-3">
              <div className="portfolio-one__item">
                <Link to="/project-details" className="portfolio-one__thumb">
                  <img src={project.img} alt={project.title} loading="lazy" />
                </Link>
                <div className="portfolio-one__hover">
                  <div className="portfolio-one__hover-bottom">
                    <div className="portfolio-one__cats">
                      <Link to="/project-details">
                        <span>{project.name}</span>
                      </Link>
                    </div>
                    <Link to="/project-details">
                      <h3 className="portfolio-one__title">{project.title}</h3>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Slider End */}

        {limit && (
          <div className="button">
            <Link to="/projects" className="more-btn">
              <span className="-btn">Discover More</span>
            </Link>
          </div>
        )}
      </div>
    </section>
  );
}

export default Project;
