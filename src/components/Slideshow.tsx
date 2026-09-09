import React, { useState, useEffect, useRef } from 'react';
import { ChevronLeft, ChevronRight, Play, Pause, Film, ArrowDown, Sparkles } from 'lucide-react';
import { SlideItem } from '../types';

interface SlideshowProps {
  slides: SlideItem[];
  onSlideshowComplete: () => void;
}

export const Slideshow: React.FC<SlideshowProps> = ({ slides, onSlideshowComplete }) => {
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState<boolean>(true);
  const [progress, setProgress] = useState<number>(0);
  const timerRef = useRef<number | null>(null);

  const SLIDE_DURATION = 6000; // 6 seconds per slide
  const currentSlide = slides[currentIndex] || slides[0];

  const handleNext = () => {
    if (currentIndex === slides.length - 1) {
      // Reached the end of slideshow!
      onSlideshowComplete();
    } else {
      setCurrentIndex((prev) => prev + 1);
      setProgress(0);
    }
  };

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev > 0 ? prev - 1 : slides.length - 1));
    setProgress(0);
  };

  // Auto play logic
  useEffect(() => {
    if (!isAutoPlaying) {
      if (timerRef.current) clearInterval(timerRef.current);
      return;
    }

    const interval = 100;
    const step = (interval / SLIDE_DURATION) * 100;

    timerRef.current = window.setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          if (currentIndex === slides.length - 1) {
            // End reached on auto-play! Trigger anchor scroll
            setIsAutoPlaying(false);
            onSlideshowComplete();
            return 100;
          }
          setCurrentIndex((idx) => idx + 1);
          return 0;
        }
        return prev + step;
      });
    }, interval);

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [currentIndex, isAutoPlaying, slides.length, onSlideshowComplete]);

  return (
    <section id="slideshow" className="relative py-8 sm:py-12 px-4 sm:px-6 max-w-5xl mx-auto">
      {/* Film Strip Header Accent */}
      <div className="flex items-center justify-between mb-4 pb-2 border-b border-[#E8DFC8]/70">
        <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-[#8C6D2B]">
          <Film className="w-4 h-4 text-[#D4AF37]" />
          <span>Киноархив и кадры памяти</span>
        </div>

        <div className="flex items-center gap-3">
          <span className="font-serif-display text-sm tracking-wider text-[#2D261E] font-medium">
            Кадр {String(currentIndex + 1).padStart(2, '0')} / {String(slides.length).padStart(2, '0')}
          </span>

          <button
            onClick={() => setIsAutoPlaying(!isAutoPlaying)}
            className="p-1.5 rounded-full hover:bg-[#EFE5D3] text-[#7A6F62] hover:text-[#2D261E] transition-colors"
            title={isAutoPlaying ? 'Приостановить слайд-шоу' : 'Запустить авто-слайд-шоу'}
          >
            {isAutoPlaying ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5" />}
          </button>
        </div>
      </div>

      {/* Progress Bar for current slide */}
      <div className="w-full bg-[#EAE0CD] h-1 rounded-full mb-5 overflow-hidden">
        <div
          className="bg-gradient-to-r from-[#D4AF37] to-[#BFA054] h-full transition-all duration-100 ease-linear rounded-full"
          style={{ width: `${progress}%` }}
        />
      </div>

      {/* Main Cinema Viewport */}
      <div className="relative rounded-2xl overflow-hidden bg-[#241F1A] border border-[#D9C8A5] shadow-2xl champagne-glow aspect-[4/3] sm:aspect-[16/10] max-h-[640px] flex items-center justify-center">
        {/* Subtle Decorative Film Sprocket Perforations on edges */}
        <div className="absolute top-2 left-3 right-3 hidden sm:flex justify-between pointer-events-none z-20 opacity-30">
          {Array.from({ length: 14 }).map((_, i) => (
            <div key={i} className="w-2.5 h-1.5 rounded-[2px] bg-[#FAF7F2]" />
          ))}
        </div>
        <div className="absolute bottom-2 left-3 right-3 hidden sm:flex justify-between pointer-events-none z-20 opacity-30">
          {Array.from({ length: 14 }).map((_, i) => (
            <div key={i} className="w-2.5 h-1.5 rounded-[2px] bg-[#FAF7F2]" />
          ))}
        </div>

        {/* Media rendering (Image or Video) */}
        {currentSlide.isVideo && currentSlide.videoUrl ? (
          <video
            src={currentSlide.videoUrl}
            autoPlay
            muted
            loop
            playsInline
            className="w-full h-full object-cover"
          />
        ) : (
          <img
            src={currentSlide.imageUrl}
            alt={currentSlide.title}
            className="w-full h-full object-cover transition-opacity duration-700 select-none"
            referrerPolicy="no-referrer"
          />
        )}

        {/* Cinematic Vignette Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#1A140F]/90 via-transparent to-[#1A140F]/30 pointer-events-none" />

        {/* Bottom Caption Overlay */}
        <div className="absolute bottom-0 inset-x-0 p-5 sm:p-8 z-20 text-[#FAF7F2]">
          <div className="max-w-3xl">
            {currentSlide.category && (
              <span className="inline-block text-[10px] sm:text-xs font-semibold uppercase tracking-widest text-[#E6C687] bg-[#3B3126]/80 px-2.5 py-1 rounded-md mb-2 backdrop-blur-sm border border-[#D4AF37]/30">
                {currentSlide.category}
              </span>
            )}
            <h3 className="font-serif-display text-xl sm:text-3xl font-semibold tracking-wide text-[#FDFBF7] drop-shadow-md">
              {currentSlide.title || `Кадр ${String(currentIndex + 1).padStart(2, '0')}`}
            </h3>
            {currentSlide.subtitle && (
              <p className="text-xs sm:text-sm text-[#E0D7C9] mt-1 font-medium font-cormorant sm:text-lg italic">
                {currentSlide.subtitle}
              </p>
            )}
            {currentSlide.caption && (
              <p className="text-xs sm:text-sm text-[#C8BFB0] mt-1.5 line-clamp-2 max-w-2xl font-light">
                {currentSlide.caption}
              </p>
            )}
          </div>
        </div>

        {/* Navigation Arrows */}
        <button
          id="slide-prev-button"
          onClick={handlePrev}
          aria-label="Предыдущий кадр"
          className="absolute left-3 sm:left-5 top-1/2 -translate-y-1/2 z-30 w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-[#1F1914]/60 hover:bg-[#1F1914]/90 backdrop-blur-md text-[#FAF7F2] flex items-center justify-center border border-[#D4AF37]/40 hover:border-[#D4AF37] transition-all hover:scale-105"
        >
          <ChevronLeft className="w-5 h-5 sm:w-6 sm:h-6" />
        </button>

        <button
          id="slide-next-button"
          onClick={handleNext}
          aria-label="Следующий кадр"
          className="absolute right-3 sm:right-5 top-1/2 -translate-y-1/2 z-30 w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-[#1F1914]/60 hover:bg-[#1F1914]/90 backdrop-blur-md text-[#FAF7F2] flex items-center justify-center border border-[#D4AF37]/40 hover:border-[#D4AF37] transition-all hover:scale-105"
        >
          <ChevronRight className="w-5 h-5 sm:w-6 sm:h-6" />
        </button>
      </div>

      {/* Thumbnails / Dots strip (supports any number of slides) */}
      <div className="mt-5 flex items-center justify-center gap-1.5 sm:gap-2 flex-wrap max-w-2xl mx-auto px-2">
        {slides.map((slide, idx) => (
          <button
            key={slide.id || idx}
            onClick={() => {
              setCurrentIndex(idx);
              setProgress(0);
            }}
            className={`transition-all duration-300 rounded-full ${
              idx === currentIndex
                ? 'w-7 sm:w-9 h-2 bg-[#D4AF37]'
                : 'w-2 h-2 bg-[#DBCFBA] hover:bg-[#BFB097]'
            }`}
            title={`Кадр ${idx + 1}`}
          />
        ))}
      </div>

      {/* Anchor Transition Button to Clapperboard */}
      <div className="mt-8 text-center">
        <button
          id="scroll-to-clapperboard-btn"
          onClick={onSlideshowComplete}
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-[#F3E9DD] hover:bg-[#EADBCA] text-[#4A3D2F] hover:text-[#1F1914] text-xs sm:text-sm font-medium border border-[#D9C8A5] transition-all hover:shadow-sm group"
        >
          <span>Перейти к кинематографической хлопушке</span>
          <ArrowDown className="w-4 h-4 text-[#A8883B] group-hover:translate-y-0.5 transition-transform" />
        </button>
      </div>
    </section>
  );
};
