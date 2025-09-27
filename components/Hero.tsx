import React, { useState, useEffect, useRef } from 'react';

const Hero: React.FC<{ onNavigate: (page: string) => void }> = ({ onNavigate }) => {
  const sectionRef = useRef<HTMLElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(entry.target);
        }
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      className={`relative h-screen min-h-[700px] flex items-center justify-center text-center text-white transition-all duration-1000 ease-out ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
    >
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url(https://images.unsplash.com/photo-1506157786151-b8491531f063?auto=format&fit=crop&w=2000&q=80)` }}
      >
        <div className="absolute inset-0 bg-black/60"></div>
        <div className="absolute inset-0 bg-gradient-to-t from-brand-dark via-transparent to-transparent"></div>
      </div>
      <div className="relative z-10 px-4">
        <h1 className="font-serif text-6xl md:text-8xl font-bold leading-tight">
          <span className="relative inline-block">
            Own a Piece Of the Music You
            <span className="absolute left-0 bottom-0 -mb-2 transform -translate-x-1/4 w-24 h-2 bg-brand-yellow"></span>
          </span> Love
        </h1>
        <p className="mt-4 max-w-lg mx-auto text-lg text-gray-300">
          Become more than  fan.
        </p>
        <button onClick={() => onNavigate('signup')} className="mt-8 bg-gradient-to-r from-pink-500 via-purple-600 to-indigo-600 hover:scale-[1.02] hover:shadow-xl focus:outline-none focus:ring-4 focus:ring-pink-400/30 text-white font-bold py-4 px-10 rounded-full text-lg hover:scale-105 transform transition-transform duration-300">
          Explore Now
        </button>
      </div>
    </section>
  );
};

export default Hero;
