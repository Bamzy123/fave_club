import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import Artistry from './components/Artistry';
import Legacy from './components/Legacy';
import Future from './components/Future';
import Footer from './components/Footer';
import Signup from './components/Signup';
import ArtistDashboard from './components/ArtistDashboard';
// import FanDashboard from './components/FanDashboard';


const ChatBubble = () => (
    <button className="fixed bottom-6 right-6 bg-brand-pink text-white w-14 h-14 rounded-full flex items-center justify-center shadow-lg hover:bg-pink-500 transition-colors">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
        </svg>
    </button>
);

const App: React.FC = () => {
  const [page, setPage] = useState('home');
  const [forceDashboard, setForceDashboard] = useState<'artist' | 'fan' | null>(null);

  // Check URL for direct dashboard access
  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const dashboard = urlParams.get('dashboard');
    
    if (dashboard === 'artist') {
      setForceDashboard('artist');
    } else if (dashboard === 'fan') {
      setForceDashboard('fan');
    } else {
      // Check the pathname for dashboard routes
      const path = window.location.pathname;
      if (path === '/artist/dashboard') {
        setForceDashboard('artist');
      } else if (path === '/fan/dashboard') {
        setForceDashboard('fan');
      }
    }
  }, []);


    const navigate = (pageName: string) => {
        setPage(pageName);
        window.scrollTo(0, 0);
    };


    return (
        <div className="bg-brand-dark font-sans text-white overflow-x-hidden">
            <Header onNavigate={navigate} />
            {page === 'home' ? (
                <main>
                    <Hero onNavigate={navigate} />
                    <Artistry onNavigate={navigate} />
                    <Legacy onNavigate={navigate} />
                    <Future onNavigate={navigate} />
                </main>
            ) : (
                <Signup />
            )}
            <Footer />
            <ChatBubble />
        </div>
    );
}
  

export default App;