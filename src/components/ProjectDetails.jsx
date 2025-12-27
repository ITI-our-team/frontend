import React, { useState } from "react";
import { Container, Row, Col, Card, Button } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import Lightbox from "yet-another-react-lightbox";
import "yet-another-react-lightbox/styles.css";

function ProjectDetails() {
  const project = {
    bride: "Sarah Ali",
    groom: "Ahmed Yasser",
    date: "20/12/2025",
    venue: { name: "Royal Palace Hall", img: "/ring.jpg" },
    dj: { name: "DJ Alex", img: "/ring.jpg" },
    photography: {
      name: "Studio XYZ",
      gallery: ["/ring.jpg", "/ring.jpg", "/ring.jpg", "/ring.jpg"],
    },
    dresses: [
      { name: "Bride Dress", img: "/ring.jpg" },
      { name: "Bridesmaid Dress", img: "/ring.jpg" },
    ],
    feedback: {
      message: "The day was perfect! Everything was organized and beautiful.",
      rating: 5,
    },
  };

  const [lightboxIndex, setLightboxIndex] = useState(-1);

  return (
    <Container className="py-5">
      {/* Header */}
      <div className="text-center m-5">
        <h1>Wedding Project Details</h1>
        <p className="text-muted">{project.date}</p>
      </div>

      {/* Bride & Groom */}
      <Row className="mb-5">
        <Col md={6}>
          <h4>Bride</h4>
          <p>{project.bride}</p>
        </Col>
        <Col md={6}>
          <h4>Groom</h4>
          <p>{project.groom}</p>
        </Col>
      </Row>

      {/* Selected Services */}
      <h2 className="mb-4">Selected Services</h2>
      <Row className="mb-5">
        <Col md={4} className="mb-3">
          <Card>
            <Card.Img variant="top" src={project.venue.img} />
            <Card.Body>
              <Card.Title>Venue: {project.venue.name}</Card.Title>
            </Card.Body>
          </Card>
        </Col>
        <Col md={4} className="mb-3">
          <Card>
            <Card.Img variant="top" src={project.dj.img} />
            <Card.Body>
              <Card.Title>DJ: {project.dj.name}</Card.Title>
            </Card.Body>
          </Card>
        </Col>
        {project.dresses.map((dress, index) => (
          <Col md={4} className="mb-3" key={index}>
            <Card>
              <Card.Img variant="top" src={dress.img} />
              <Card.Body>
                <Card.Title>{dress.name}</Card.Title>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>

      {/* Photography Gallery */}
      <h2 className="mb-4">Photo Session Gallery</h2>
      <Row>
        {project.photography.gallery.map((img, index) => (
          <Col md={3} sm={6} xs={12} key={index} className="mb-3">
            <img
              src={img}
              alt={`Session ${index + 1}`}
              className="img-fluid rounded"
              style={{ cursor: "pointer" }}
              onClick={() => setLightboxIndex(index)}
            />
          </Col>
        ))}
      </Row>

      {/* Lightbox */}
      {lightboxIndex >= 0 && (
        <Lightbox
          open={lightboxIndex >= 0}
          close={() => setLightboxIndex(-1)}
          slides={project.photography.gallery.map((src) => ({ src }))}
          index={lightboxIndex}
          onPrev={() =>
            setLightboxIndex(
              (lightboxIndex + project.photography.gallery.length - 1) %
                project.photography.gallery.length
            )
          }
          onNext={() =>
            setLightboxIndex(
              (lightboxIndex + 1) % project.photography.gallery.length
            )
          }
        />
      )}

      {/* Client Feedback */}
      <h2 className="mb-3 mt-5">Client Feedback</h2>
      <Card className="p-3 mb-4">
        <p className="mb-2">"{project.feedback.message}"</p>
        <p>Rating: {"⭐️".repeat(project.feedback.rating)}</p>
      </Card>

      {/* Optional Button */}
      {/* <div className="text-center">
        <Button variant="primary">Back to Projects</Button>
      </div> */}
    </Container>
  );
}

export default ProjectDetails;
