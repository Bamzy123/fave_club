import React from 'react';

const Logo: React.FC = () => (
    <div className="flex items-center space-x-2">
        <div className="w-8 h-8 bg-white rounded-full flex items-center justify-center">
            <span className="font-bold text-brand-dark text-xl">F</span>
        </div>
        <span className="font-bold text-2xl text-white">Fave</span>
    </div>
);


const Header: React.FC = () => {
  return (
    <header className="absolute top-0 left-0 right-0 z-10 p-6 md:px-12">
        <div className="container mx-auto flex justify-between items-center">
            <Logo />
            <nav className="hidden md:flex space-x-10 items-center">
                <a href="#" className="text-white hover:text-brand-pink transition-colors">Home</a>
                <a href="#" className="text-white hover:text-brand-pink transition-colors">About</a>
                <a href="#" className="text-white border border-white px-6 py-2 rounded-full hover:bg-white hover:text-brand-dark transition-colors">Contact</a>
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
