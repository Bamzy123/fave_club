import React from 'react';

const featureCards = [
    {
        bgColor: 'bg-zinc-800',
        icon: <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-brand-yellow" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6V4m0 16v-2m0-10v2m0 6v2M6 12H4m16 0h-2m-10 0h2m6 0h2M9 18l-2-2m10 0l-2 2m0-10l2 2m-10 0l2-2" /></svg>,
        title: 'Instant Setup',
        description: 'Get your artist profile live in minutes.'
    },
    {
        bgColor: 'bg-brand-yellow',
        icon: <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-purple-600" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2L2 22h20L12 2z"/></svg>,
        title: 'Direct Distribution',
        description: 'Release your music to all major platforms.'
    },
    {
        bgColor: 'bg-white',
        icon: <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-black" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l-1.586-1.586a2 2 0 010-2.828L16 8" /></svg>,
        title: 'Manage Your Music',
        description: 'Control your catalog and artwork with ease.'
    },
    {
        bgColor: 'bg-zinc-800',
        icon: <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-indigo-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" /></svg>,
        title: 'Real-time Analytics',
        description: 'Track your streams and audience growth.'
    },
];

const FeatureCard = ({ bgColor, icon, title, description }: { bgColor: string; icon: React.ReactNode; title: string; description: string }) => (
    <div className={`rounded-xl p-8 flex flex-col justify-between h-64 ${bgColor} transition-transform duration-300 hover:-translate-y-2`}>
        <div>{icon}</div>
        <div>
            <h3 className={`${bgColor === 'bg-white' ? 'text-black' : 'text-white'} text-xl font-bold`}>{title}</h3>
            <p className={`${bgColor === 'bg-white' ? 'text-gray-600' : 'text-gray-400'} mt-2`}>{description}</p>
        </div>
    </div>
);


const Artistry: React.FC = () => {
    return (
        <section className="bg-brand-dark py-20 px-6 md:px-12">
            <div className="container mx-auto text-center">
                <h2 className="font-serif text-5xl font-bold">Unleash Your Artistry</h2>
                <p className="mt-4 max-w-2xl mx-auto text-gray-400">
                    We provide the tools and platform for artists to thrive. Focus on your craft, we'll handle the rest.
                </p>
                <button className="mt-8 bg-brand-pink text-white font-bold py-3 px-8 rounded-full text-md hover:scale-105 transform transition-transform duration-300">
                    Start Creating
                </button>
            </div>
            <div className="container mx-auto mt-16 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                {featureCards.map((card, index) => (
                    <FeatureCard key={index} {...card} />
                ))}
            </div>
        </section>
    );
};

export default Artistry;
