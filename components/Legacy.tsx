import React from 'react';

const legacyItems = [
    { name: 'Amplify Your Voice', role: 'Singer, Songwriter', img: 'https://picsum.photos/seed/person1/100/100' },
    { name: 'Monetize Your Talent', role: 'Producer, DJ', img: 'https://picsum.photos/seed/person2/100/100' },
    { name: 'Connect with Fans', role: 'Band Leader', img: 'https://picsum.photos/seed/person3/100/100' },
    { name: 'Harness the Power of Fave', role: 'Indie Artist', img: 'https://picsum.photos/seed/person4/100/100' },
    { name: 'Fuel Your Creative Vision', role: 'Composer', img: 'https://picsum.photos/seed/person5/100/100' },
    { name: 'Showcase Your Music', role: 'Rapper', img: 'https://picsum.photos/seed/person6/100/100' },
];

const LegacyItem = ({ name, role, img, onNavigate }: { name: string; role: string; img: string; onNavigate: (page: string) => void; }) => (
    <div className="text-center p-4">
        <img src={img} alt={name} className="w-24 h-24 rounded-full mx-auto object-cover mb-4 border-4 border-transparent hover:border-teal-400 transition-all duration-300" />
        <h3 className="text-xl font-bold text-gray-800">{name}</h3>
        <p className="text-gray-600">{role}</p>
        <p className="text-gray-500 mt-2 text-sm">"Fave revolutionized how I connect with my audience and manage my releases."</p>
         <button onClick={() => onNavigate('signup')} className="mt-4 inline-block font-semibold text-gray-700 group">
            Learn Their Story
            <span className="block max-w-0 group-hover:max-w-full transition-all duration-500 h-0.5 bg-brand-yellow"></span>
        </button>
    </div>
);

const Legacy: React.FC<{ onNavigate: (page: string) => void }> = ({ onNavigate }) => {
    return (
        <section className="bg-brand-light py-20 px-6 md:px-12">
            <div className="container mx-auto text-center">
                <h2 className="font-serif text-5xl font-bold text-gray-900">Your Music, Your Legacy</h2>
                <p className="mt-4 max-w-2xl mx-auto text-gray-600">
                    Join thousands of artists who are building their careers on Fave. From emerging talents to established icons, our platform is where musical legacies are born and nurtured.
                </p>
            </div>
            <div className="container mx-auto mt-16 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-12">
                {legacyItems.map((item, index) => (
                   <LegacyItem key={index} {...item} onNavigate={onNavigate} />
                ))}
            </div>
        </section>
    );
};

export default Legacy;