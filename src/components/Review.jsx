import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import { Pagination, Autoplay } from "swiper/modules";
import "./Review.css";

export default function Review() {
  const reviews = [
    {
      name: "Mohamed Ali",
      job: "Frontend Developer",
      img: "/hair-style.jpg",
      review:
        "The service was excellent and delivered faster than expected!",
    },
    {
      name: "Sara Ahmed",
      job: "UI/UX Designer",
      img: "/hair-style.jpg",
      review:
        "Very professional and the design was absolutely amazing.",
    },
    {
      name: "Omar Hassan",
      job: "HR Specialist",
      img: "/hair-style.jpg",
      review:
        "High quality and great attention to detail. Highly recommended!",
    },
    {
      name: "Mohamed Ali",
      job: "Frontend Developer",
      img: "/hair-style.jpg",
      review:
        "The service was excellent and delivered faster than expected!",
    },
    {
      name: "Sara Ahmed",
      job: "UI/UX Designer",
      img: "/hair-style.jpg",
      review:
        "Very professional and the design was absolutely amazing.",
    },
    {
      name: "Omar Hassan",
      job: "HR Specialist",
      img: "/hair-style.jpg",
      review:
        "High quality and great attention to detail. Highly recommended!",
    },
  ];

  return (
    <section className="reviews-section">
      <div className="container">
        <h2 className="title">BRIDE & GROOM REVIEWS</h2>

        <Swiper
          modules={[Pagination, Autoplay]}
          autoplay={{ delay: 2500 }}
          pagination={{ clickable: true }}
          spaceBetween={20}
          slidesPerView={3}
          breakpoints={{
              0: {
                slidesPerView: 1,  
              },
              768: {
                slidesPerView: 2,  
              },
              1024: {
                slidesPerView: 3,  
              },
          }}
          className="reviews-slider"
        >
          {reviews.map((item, index) => (
            <SwiperSlide key={index}>
              <div className="review-card">
                <img src={item.img} alt={item.name} className="review-img" />
                <p className="review-text">"{item.review}"</p>
                <h3 className="review-name">{item.name}</h3>
                <span className="review-job">{item.job}</span>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
}
