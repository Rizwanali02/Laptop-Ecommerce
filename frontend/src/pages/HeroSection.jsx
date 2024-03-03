import React, { useState, useEffect } from 'react';

const HeroSection = () => {
  const images = [
    "/images/lapiimage2.webp",
    // "/images/image2.jpg",
    "/images/image3.webp",
    // Add more image URLs here if needed
  ];

  const [scrollPosition, setScrollPosition] = useState(0);

  useEffect(() => {
    // Function to update scroll position every 3 seconds
    const interval = setInterval(() => {
      setScrollPosition(scrollPosition => (scrollPosition + 1) % images.length);
    }, 3000);

    // Cleanup function to clear interval on component unmount
    return () => clearInterval(interval);
  }, [images.length]); // Add images.length to the dependency array

  return (
    <div className="hero-section overflow-hidden relative">
      <div
        className="image-container flex transition-transform duration-1000 ease-in-out"
        style={{ transform: `translateX(-${scrollPosition * 100}%)` }}
      >
        {/* Map through images array and render each image */}
        {images.map((imageUrl, index) => (
          <img
            key={index}
            className="w-full md:w-auto"
            src={imageUrl}
            alt={`main-image-${index}`}
          />
        ))}
      </div>
    </div>
  );
};

export default HeroSection;
