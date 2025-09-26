import React from 'react';

const Logo: React.FC<{ onClick: () => void }> = ({ onClick }) => (
    <div className="flex items-center space-x-3 cursor-pointer" onClick={onClick}>
        <img src="/fave-removebg-preview.png" alt="Fave" className="h-32 w-20 rounded-full object-contain" />
    </div>
);


const Header: React.FC<{ onNavigate: (page: string) => void }> = ({ onNavigate }) => {
  return (
    <header className="absolute top-0 left-0 right-0 z-10 p-6 md:px-12">
        <div className="container mx-auto flex justify-between items-center">
            <Logo onClick={() => onNavigate('home')} />
            <nav className="hidden md:flex space-x-10 items-center">
                <button onClick={() => onNavigate('home')} className="text-white hover:text-brand-pink transition-colors">Home</button>
                <button className="text-white hover:text-brand-pink transition-colors">About</button>
                <button onClick={() => onNavigate('contact')} className="text-white border border-white px-6 py-2 rounded-full hover:bg-white hover:text-brand-dark transition-colors">Contact</button>
            </nav>
            <button className="md:hidden text-white">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
            </button>
        </div>
    </header>
  );
};

export default Header;