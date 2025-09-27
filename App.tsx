import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useNavigate } from 'react-router-dom';

import Header from './components/Header';
import Hero from './components/Hero';
import Artistry from './components/Artistry';
import Legacy from './components/Legacy';
import Future from './components/Future';
import Footer from './components/Footer';
import Signup from './components/Signup';
import Contact from './components/Contact';
import ArtistDashboard from './components/ArtistDashboard';
import WalletPanel from './components/WalletPanel';
import FanDashboard from './components/FanDashboard';
import { Song } from './types';

const ChatBubble = () => (
    <button className="fixed bottom-6 right-6 bg-purple-600 text-white w-14 h-14 rounded-full flex items-center justify-center shadow-lg hover:bg-purple-700 transition-colors">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
            />
        </svg>
    </button>
);

const Home: React.FC = () => {
    const navigate = useNavigate();

    return (
        <div className="bg-gray-900 text-white min-h-screen">
            <Header onNavigate={(page) => navigate(page === 'signup' ? '/signup' : '/')} />
            <main>
                <Hero onNavigate={(page) => navigate(page === 'signup' ? '/signup' : '/')} />
                <Artistry onNavigate={(page) => navigate(page === 'signup' ? '/signup' : '/')} />
                <Legacy onNavigate={(page) => navigate(page === 'signup' ? '/signup' : '/')} />
                <Future onNavigate={(page) => navigate(page === 'signup' ? '/signup' : '/')} />
            </main>
            <Footer />
            <ChatBubble />
        </div>
    );
};

const App: React.FC = () => {
    // Centralized state management
    const [songs, setSongs] = useState<Song[]>(() => {
        try {
            const savedSongs = localStorage.getItem('artist_dashboard_songs');
            return savedSongs ? JSON.parse(savedSongs) : [];
        } catch (error) {
            console.error("Failed to parse songs from localStorage", error);
            return [];
        }
    });

    useEffect(() => {
        try {
            localStorage.setItem('artist_dashboard_songs', JSON.stringify(songs));
            window.dispatchEvent(new StorageEvent('storage', {
                key: 'artist_dashboard_songs',
                newValue: JSON.stringify(songs),
            }));
        } catch (error) {
            console.error("Failed to save songs to localStorage", error);
        }
    }, [songs]);

    const handleAddSong = (name: string, percentage: number, imageFile: File) => {
        const reader = new FileReader();
        reader.readAsDataURL(imageFile);
        reader.onloadend = () => {
            const base64String = reader.result as string;
            const newSong: Song = {
                _id: new Date().toISOString(),
                title: name || 'Untitled Submission',
                artist: name,
                coverArt: {
                    url: base64String,
                },
                song: {
                    url: '',
                },
                percentage: percentage,
            };
            setSongs(prevSongs => [newSong, ...prevSongs]);
        };
        reader.onerror = (error) => {
            console.error("Error converting file to base64", error);
        };
    };

    return (
        <Router>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/signup" element={<Signup />} />
                <Route path="/artist/dashboard" element={<ArtistDashboard songs={songs} onAddSong={handleAddSong} />} />
                <Route path="/fan/dashboard" element={<FanDashboard songs={songs} />} />
                <Route path='/contact' element={<Contact />} />
                <Route path="/wallet" element={<WalletPanel />} />
            </Routes>
        </Router>
    );
};

export default App;
