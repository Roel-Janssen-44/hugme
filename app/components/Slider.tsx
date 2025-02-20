'use client';

import {useState, useRef} from 'react';

export default function Slider({items}: {items: any[]}) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const touchStartX = useRef<number | null>(null);
  const touchEndX = useRef<number | null>(null);

  console.log('items');
  console.log(items);

  const nextSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % items.length);
  };

  const prevSlide = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? items.length - 1 : prevIndex - 1,
    );
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    touchEndX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = () => {
    if (touchStartX.current !== null && touchEndX.current !== null) {
      const deltaX = touchStartX.current - touchEndX.current;
      if (deltaX > 50) nextSlide();
      else if (deltaX < -50) prevSlide();
    }
    touchStartX.current = null;
    touchEndX.current = null;
  };

  console.log(items);
  return (
    <div className="relative w-80 h-80 overflow-hidden">
      {items?.map((item, index) => (
        <div
          key={index}
          className={`absolute inset-0 flex items-center justify-center text-white text-2xl font-bold transition-opacity duration-500 ${
            currentIndex === index ? 'opacity-100 z-10' : 'opacity-0 z-0'
          }`}
          //   style={{ backgroundColor: item.color }} // Assuming items have a `color` property
          style={{backgroundColor: '#00ff00'}}
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
        >
          {item.title}
        </div>
      ))}
      <button
        className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-black/50 text-white px-3 py-2 rounded-full"
        onClick={prevSlide}
      >
        ❮
      </button>
      <button
        className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-black/50 text-white px-3 py-2 rounded-full"
        onClick={nextSlide}
      >
        ❯
      </button>
    </div>
  );
}
