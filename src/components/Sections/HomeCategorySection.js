import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

// import required modules
import { Navigation } from "swiper/modules";

export default function HomeCategorySection({ title, items = [] }) {
  return (
    <section className="w-100 catergory-section">
      <div className="container d-flex align-items-center justify-content-between">
        <h3>{title}</h3>

        <div
        className="d-flex flex-wrap catergory-list"
        >
          {items.length > 0 &&
            items.map((item, key) => {
              return (
                <div
                  className="category-card mx-2"
                  key={`${title}-${key}`}
                >
                  <img
                    src={item.img}
                    alt={item.name}
                    className="rounded-circle w-100"
                    style={{ aspectRatio: 1 }}
                  />
                  <p className="text-center mt-2">{item.name}</p>
                </div>
              );
            })}
        </div>
      </div>
    </section>
  );
}
