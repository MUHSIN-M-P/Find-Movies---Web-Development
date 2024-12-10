import React, { useEffect, useRef, useState } from "react";
import "./MediaCarousel.css"; // Adjust to your CSS file path

function MediaSlider({ category, videos, images }) {
  const imageListRef = useRef(null);
  const scrollbarThumbRef = useRef(null);
  const [maxScrollLeft, setMaxScrollLeft] = useState(0);
  const [thumbWidth, setThumbWidth] = useState(50);

  useEffect(() => {
    const imageList = imageListRef.current;
    const maxScrollLeftValue = imageList.scrollWidth - imageList.clientWidth;
    setMaxScrollLeft(maxScrollLeftValue);

    const handleResize = () => {
      const scrollbarWidth = imageList.clientWidth / imageList.scrollWidth;
      setThumbWidth(Math.max(scrollbarWidth * 100, 20)); // Minimum thumb width of 20%
    };

    handleResize();
    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, [images, videos]);

  const handleScroll = () => {
    const scrollPosition = imageListRef.current.scrollLeft;
    const thumbPosition = (scrollPosition / maxScrollLeft) * (imageListRef.current.clientWidth - scrollbarThumbRef.current.offsetWidth);
    scrollbarThumbRef.current.style.left = `${thumbPosition}px`;
  };

  const handleSlide = (direction) => {
    const scrollAmount = imageListRef.current.clientWidth * direction;
    imageListRef.current.scrollBy({ left: scrollAmount, behavior: "smooth" });
  };

  return (
    <div className="container">
      <div className="slider-wrapper">
        <button onClick={() => handleSlide(-1)} className="slide-button material-symbols-rounded">
          chevron_left
        </button>
        <ul className="image-list" ref={imageListRef} onScroll={handleScroll}>
          {category === "Videos" &&
            videos.map((item, i) => (
              <iframe
                key={i}
                width="100%"
                height="300px"
                src={`https://www.youtube.com/embed/${item.key}`}
                allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen
                style={{ borderRadius: "8px" }}
              ></iframe>
            ))}
          {category === "Images" &&
            images.map((item, i) => (
              <img
                key={i}
                src={`https://image.tmdb.org/t/p/w500${item.file_path}`}
                alt={`Backdrop ${i + 1}`}
                className="image-item"
              />
            ))}
        </ul>
        <button onClick={() => handleSlide(1)} id="right" className="slide-button material-symbols-rounded">
          chevron_right
        </button>
      </div>

    </div>
  );
}

export default MediaSlider;
