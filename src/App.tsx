import React, { useState } from 'react';
import { Header } from './components/Header';
import { Slideshow } from './components/Slideshow';
import { Clapperboard } from './components/Clapperboard';
import { DEFAULT_SLIDES } from './data/slides';
import { SlideItem } from './types';
import { Sparkles, Film, Heart } from 'lucide-react';

export default function App() {
  const [slides] = useState<SlideItem[]>(DEFAULT_SLIDES);
  const [customAudioUrl, setCustomAudioUrl] = useState<string | null>(null);

  const handleAudioUpload = (file: File) => {
    const url = URL.createObjectURL(file);
    setCustomAudioUrl(url);
  };

  const handleScrollToClapperboard = () => {
    const element = document.getElementById('clapperboard');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <div className="min-h-screen bg-[#FAF7F2] text-[#2D261E] relative selection:bg-[#EADEBA] selection:text-[#1F1914] overflow-x-hidden">
      {/* Background Champagne Glow Elements */}
      <div className="fixed top-0 left-1/2 -translate-x-1/2 w-[750px] h-[350px] bg-gradient-to-b from-[#F7EDDC] via-[#F3E5CD]/40 to-transparent blur-3xl pointer-events-none -z-10" />

      {/* Header with Play Button */}
      <Header
        customAudioUrl={customAudioUrl}
        onAudioUpload={handleAudioUpload}
      />

      {/* Hero Welcome Header */}
      <section className="pt-10 sm:pt-14 pb-4 px-4 text-center max-w-3xl mx-auto">
        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#F3E8D7] text-[#8C6D2B] text-xs font-medium uppercase tracking-widest border border-[#E5D7BF] mb-4">
          <Sparkles className="w-3.5 h-3.5 text-[#D4AF37]" />
          <span>Праздничный спецвыпуск</span>
        </div>

        <h1 className="font-serif-display text-3xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-[#201A15] leading-tight">
          С днём рождения, <br className="hidden sm:inline" />
          <span className="bg-gradient-to-r from-[#9E7A31] via-[#D4AF37] to-[#8C6D2B] bg-clip-text text-transparent">
            Елена!
          </span>
        </h1>

        <p className="mt-4 text-base sm:text-lg text-[#665A4C] font-light max-w-xl mx-auto font-cormorant sm:text-xl italic">
          Главный продюсер своей вдохновляющей жизни, великих киноисторий и самых тёплых семейных воспоминаний.
        </p>

        {/* Delicate golden accent divider */}
        <div className="mt-6 flex items-center justify-center gap-3">
          <div className="h-[1px] w-12 bg-[#D4AF37]/50" />
          <div className="w-2 h-2 rotate-45 border border-[#D4AF37] bg-[#FAF7F2]" />
          <div className="h-[1px] w-12 bg-[#D4AF37]/50" />
        </div>
      </section>

      {/* Main Slideshow of Photos / Archive */}
      <Slideshow
        slides={slides}
        onSlideshowComplete={handleScrollToClapperboard}
      />

      {/* Cinematic Clapperboard with Wishes */}
      <Clapperboard />

      {/* Warm Minimalist Footer */}
      <footer className="py-12 px-4 border-t border-[#E8DFC8]/60 text-center text-xs text-[#8A7D6E] mt-12 bg-[#F5EFEB]/50">
        <div className="max-w-md mx-auto space-y-3">
          <div className="flex items-center justify-center gap-2 text-[#736553]">
            <Film className="w-4 h-4 text-[#D4AF37]" />
            <span className="font-serif-display font-medium text-sm text-[#2D261E]">
              Elena Film Productions • Москва
            </span>
          </div>

          <p className="font-light">
            Каждый твой день — это премьера, достойная самых восторженных аплодисментов!
          </p>

          <div className="pt-2 text-[11px] text-[#A69886] flex items-center justify-center gap-1">
            <span>С любовью и уважением</span>
            <Heart className="w-3 h-3 text-[#D4AF37] fill-[#D4AF37]/40" />
          </div>
        </div>
      </footer>
    </div>
  );
}
