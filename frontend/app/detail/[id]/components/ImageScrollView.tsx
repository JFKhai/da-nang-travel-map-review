"use client";
import Image from "next/image";
import { useRef } from "react";

interface ImageScrollViewProps {
  images: string[];
}

export default function ImageScrollView({ images }: ImageScrollViewProps) {
  const imageRefs = useRef<(HTMLDivElement | null)[]>([]);

  if (!images || images.length === 0) {
    return (
      <div className="w-full h-screen flex items-center justify-center bg-gray-100">
        <p className="text-gray-500 text-xl">Không có hình ảnh</p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {images.map((image, index) => (
        <div
          key={index}
          ref={(el) => {
            imageRefs.current[index] = el;
          }}
          className="relative w-full overflow-hidden rounded-2xl"
          style={{
            height: "100vh",
            minWidth: "100%",
          }}
        >
          <Image    
            src={image}
            alt={`Image ${index + 1}`}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, 70vw"
            unoptimized
            quality={100}
          />
        </div>
      ))}
    </div>
  );
}