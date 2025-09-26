import React, { useState, useEffect, useRef } from 'react';

const ArtistCard = ({ name, genre, img, alignLeft = false, onNavigate }: { name: string; genre: string; img: string; alignLeft?: boolean; onNavigate: (page: string) => void; }) => (
    <div className={`bg-zinc-800 rounded-2xl overflow-hidden shadow-lg transform transition-transform duration-500 hover:scale-105 ${alignLeft ? 'md:self-start' : 'md:self-end'}`}>
        <img src={img} alt={name} className="w-full h-80 object-cover" />
        <div className="p-6">
            <h3 className="text-2xl font-bold text-white">{name}</h3>
            <p className="text-brand-yellow">{genre}</p>
            <button onClick={() => onNavigate('signup')} className="mt-4 text-white font-semibold group">
                View More
                <span className="block max-w-0 group-hover:max-w-full transition-all duration-500 h-0.5 bg-brand-yellow"></span>
            </button>
        </div>
    </div>
);


const Future: React.FC<{ onNavigate: (page: string) => void }> = ({ onNavigate }) => {
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
            className={`bg-brand-dark py-24 px-6 md:px-12 transition-all duration-1000 ease-out ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
        >
            <div className="container mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                <div className="text-center lg:text-left">
                    <p className="text-brand-yellow font-semibold">The Next Wave</p>
                    <h2 className="font-serif text-5xl md:text-6xl text-white font-bold mt-2">
                        Welcome to the <br/> Future of Music
                    </h2>
                    <p className="mt-6 text-gray-400 max-w-md mx-auto lg:mx-0">
                        We are empowering a new generation of artists with innovative tools for creation, distribution, and monetization.
                    </p>
                    <button onClick={() => onNavigate('signup')} className="mt-10 bg-brand-yellow text-brand-dark font-bold py-4 px-10 rounded-full text-lg hover:scale-105 transform transition-transform duration-300">
                        Get Started Now
                    </button>
                </div>
                <div className="flex flex-col sm:flex-row lg:flex-col gap-8">
                     <div className="w-full flex sm:flex-col gap-8">
                        <ArtistCard onNavigate={onNavigate} name="Lucas" genre="Electronic / Future Bass" img="https://picsum.photos/seed/maleartist/400/600" alignLeft />
                        <ArtistCard onNavigate={onNavigate} name="Isabella" genre="R&B / Soul" img="https://picsum.photos/seed/femaleartist/400/600" alignLeft={false}/>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Future;