import React from 'react';

const Hero: React.FC = () => {
  return (
    <section className="relative h-screen min-h-[700px] flex items-center justify-center text-center text-white">
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url(https://picsum.photos/seed/musicfest/1920/1080)` }}
      >
        <div className="absolute inset-0 bg-black/60"></div>
        <div className="absolute inset-0 bg-gradient-to-t from-brand-dark via-transparent to-transparent"></div>
      </div>
      <div className="relative z-10 px-4">
        <h1 className="font-serif text-6xl md:text-8xl font-bold leading-tight">
          <span className="relative inline-block">
            Welcome to
            <span className="absolute left-0 bottom-0 -mb-2 transform -translate-x-1/4 w-24 h-2 bg-brand-yellow"></span>
          </span> Fave
        </h1>
        <p className="mt-4 max-w-lg mx-auto text-lg text-gray-300">
          Discover, create, and share music like never before. Your journey in sound starts here.
        </p>
        <button className="mt-8 bg-brand-pink text-white font-bold py-4 px-10 rounded-full text-lg hover:scale-105 transform transition-transform duration-300">
          Explore Now
        </button>
      </div>
    </section>
  );
};

export default Hero;
