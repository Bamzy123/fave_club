import React, { useState, useEffect, useRef } from 'react';

const artistSongs = [
    {
        artistName: 'Wizkid',
        songTitle: 'Lagos Love (Unreleased)',
        imageSrc: 'https://picsum.photos/seed/wizkid/400/400',
    },
    {
        artistName: 'Burna Boy',
        songTitle: 'Gbedu Fire (Snippet)',
        imageSrc: 'https://picsum.photos/seed/burnaboy/400/400',
    },
    {
        artistName: 'Davido',
        songTitle: 'OBO\'s Anthem (Demo)',
        imageSrc: 'https://picsum.photos/seed/davido/400/400',
    },
    {
        artistName: 'Tiwa Savage',
        songTitle: 'Queen\'s Vibe (Exclusive)',
        imageSrc: 'https://picsum.photos/seed/tiwasavage/400/400',
    },
];

const ArtistSongCard = ({ artistName, songTitle, imageSrc, onNavigate }: { artistName: string; songTitle: string; imageSrc: string; onNavigate: (page: string) => void; }) => (
    <div className="bg-zinc-800 rounded-2xl overflow-hidden group shadow-lg transform transition-transform duration-300 hover:-translate-y-2">
        <div className="relative overflow-hidden">
            <img src={imageSrc} alt={artistName} className="w-full h-72 object-cover group-hover:scale-105 transition-transform duration-500 ease-out" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"></div>
        </div>
        <div className="p-6">
            <h3 className="text-2xl font-bold text-white">{artistName}</h3>
            <p className="text-brand-yellow mt-1">{songTitle}</p>
            <button onClick={() => onNavigate('signup')} className="mt-6 w-full bg-brand-pink text-white font-bold py-3 px-6 rounded-full hover:bg-pink-500 transform transition-all duration-300 ease-in-out">
                BUY NOW
            </button>
        </div>
    </div>
);

const Artistry: React.FC<{ onNavigate: (page: string) => void }> = ({ onNavigate }) => {
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
            className={`bg-brand-dark py-20 px-6 md:px-12 transition-all duration-1000 ease-out ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
        >
            <div className="container mx-auto text-center">
                <h2 className="font-serif text-5xl font-bold text-white">Exclusive Drops from Nigerian Stars</h2>
                <p className="mt-4 max-w-2xl mx-auto text-gray-400">
                    Get exclusive access to unreleased tracks and demos from your favorite artists. Be the first to hear the future of Afrobeats.
                </p>
            </div>
            <div className="container mx-auto mt-16 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                {artistSongs.map((song, index) => (
                    <ArtistSongCard key={index} {...song} onNavigate={onNavigate} />
                ))}
            </div>
        </section>
    );
};

export default Artistry;