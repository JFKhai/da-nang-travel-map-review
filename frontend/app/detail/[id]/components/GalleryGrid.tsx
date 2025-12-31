"use client";

import { useEffect, useState, useRef } from "react";

interface GalleryGridProps {
  images: string[];
}

export default function GalleryGrid({ images }: GalleryGridProps) {
  const [scrollY, setScrollY] = useState(0);
  const galleryRef = useRef<HTMLDivElement>(null);
  const imageRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
      
      // Update parallax for each image
      imageRefs.current.forEach((ref, index) => {
        if (!ref) return;
        
        const rect = ref.getBoundingClientRect();
        const windowHeight = window.innerHeight;
        const elementCenter = rect.top + rect.height / 2;
        const viewportCenter = windowHeight / 2;
        const distanceFromCenter = elementCenter - viewportCenter;
        
        // Parallax effect: images move at different speeds
        const speed = 0.15 + (index % 4) * 0.08;
        const parallaxOffset = distanceFromCenter * speed * 0.1;
        
        ref.style.transform = `translateY(${parallaxOffset}px)`;
      });
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll(); // Initial call
    
    return () => window.removeEventListener("scroll", handleScroll);
  }, [images]);

  if (!images || images.length <= 1) {
    return null;
  }

  // Get all images except the first one (which is used as hero)
  const galleryImages = images.slice(1);

  return (
    <div ref={galleryRef} className="bg-white rounded-2xl shadow-lg p-8 hover:shadow-xl transition-shadow duration-300">
      <h2 className="text-3xl font-bold mb-6 text-gray-800 flex items-center gap-3">
        <span className="w-1 h-8 bg-gradient-to-b from-purple-500 to-purple-600 rounded-full"></span>
        Thư viện ảnh ({galleryImages.length} ảnh)
      </h2>
      
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {galleryImages.map((image, index) => {
          return (
            <div
              key={index}
              ref={(el) => {
                imageRefs.current[index] = el;
              }}
              className="group relative overflow-hidden rounded-xl shadow-md hover:shadow-2xl transition-all duration-500 aspect-square will-change-transform"
            >
              <img
                src={image}
                alt={`Gallery ${index + 1}`}
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              <div className="absolute bottom-0 left-0 right-0 p-3 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300 transform translate-y-2 group-hover:translate-y-0">
                <p className="text-sm font-medium">Ảnh {index + 1}</p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}