"use client";
import { useState, useEffect } from 'react';

// This component expects to receive an array of image paths
export default function ImageSlider({ images }: { images: string[] }) {
  const [currentSetIndex, setCurrentSetIndex] = useState(0);

  // Group the flat array of images into smaller arrays of 4 (for our 2x2 grid)
  const imageSets: string[][] = [];
  for (let i = 0; i < images.length; i += 4) {
    imageSets.push(images.slice(i, i + 4));
  }

  // Auto-slider effect
  useEffect(() => {
    // If we only have 1 set of images (4 or less), we don't need to slide!
    if (imageSets.length <= 1) return; 

    const slideInterval = setInterval(() => {
      setCurrentSetIndex((prevIndex) => (prevIndex + 1) % imageSets.length);
    }, 5000); 

    return () => clearInterval(slideInterval); 
  }, [imageSets.length]);

  // If the folder is empty, show a friendly message
  if (images.length === 0) {
    return (
      <div className="bg-white p-10 rounded-2xl shadow-md text-center text-purple-800 font-bold">
        কোনো ছবি পাওয়া যায়নি! (No pictures found in folder)
      </div>
    );
  }

  // Get the 4 images we should currently be showing
  const currentImages = imageSets[currentSetIndex] || [];

  return (
    <div className="flex flex-col items-center w-full">
      <div className="bg-white p-3 rounded-2xl shadow-xl border border-yellow-200 w-full">
        {/* The 2x2 Grid */}
        <div className="grid grid-cols-2 gap-3">
          {currentImages.map((imgSrc, index) => (
            // 'aspect-video' forces the perfect 16:9 ratio!
            <div key={index} className="aspect-video overflow-hidden rounded-xl bg-gray-200 shadow-sm relative group">
              <img 
                src={imgSrc} 
                alt={`School Activity ${index + 1}`} 
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
              />
            </div>
          ))}
        </div>
      </div>

      {/* Slider Indicators (Dots at the bottom) */}
      {imageSets.length > 1 && (
        <div className="flex gap-2 mt-4">
          {imageSets.map((_, idx) => (
            <span key={idx} className={`h-3 w-3 rounded-full transition-colors ${currentSetIndex === idx ? 'bg-purple-700' : 'bg-purple-300'}`}></span>
          ))}
        </div>
      )}
    </div>
  );
}