import React, { useState, useMemo } from 'react';
import {BrowserRouter as Router, Routes, Route, useNavigate, Navigate} from 'react-router-dom';
import { Toaster } from 'react-hot-toast';

import Header from './components/Header';
import Hero from './components/Hero';
import Artistry from './components/Artistry';
import Legacy from './components/Legacy';
import Future from './components/Future';
import Footer from './components/Footer';
import Signup from './components/Signup';
import Contact from './components/Contact';
import ArtistDashboard from './components/ArtistDashboard';
import FanDashboard from './components/FanDashboard';
import WalletPanel from './components/WalletPanel';

import type { Project } from './types';
import { View } from './types';
import { MOCK_PROJECTS } from './constants';

const ChatBubble = () => (
    <button className="fixed bottom-6 right-6 bg-brand-pink text-white w-14 h-14 rounded-full flex items-center justify-center shadow-lg hover:bg-pink-500 transition-colors">
        <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-7 w-7"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
        >
            <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
            />
        </svg>
    </button>
);

// ✅ Home page
const Home: React.FC = () => {
    const navigate = useNavigate();

    return (
        <>
            <Header onNavigate={(page) => navigate(page === 'signup' ? '/signup' : '/')} />
            <main>
                <Hero onNavigate={(page) => navigate(page === 'signup' ? '/signup' : '/')} />
                <Artistry onNavigate={(page) => navigate(page === 'signup' ? '/signup' : '/')} />
                <Legacy onNavigate={(page) => navigate(page === 'signup' ? '/signup' : '/')} />
                <Future onNavigate={(page) => navigate(page === 'signup' ? '/signup' : '/')} />
            </main>
            <Footer />
            <ChatBubble />
        </>
    );
};

// ✅ Main App
const App: React.FC = () => {
    const [view, setView] = useState<View>(View.Artist);
    const [artistProfilePic, setArtistProfilePic] = useState<string | null>(null);
    const [fanProfilePic, setFanProfilePic] = useState<string | null>(null);
    const [projects, setProjects] = useState<Project[]>(MOCK_PROJECTS);

    const backgroundClass = useMemo(() => {
        return view === View.Artist
            ? 'bg-gray-900 text-white'
            : 'bg-slate-100 text-gray-800';
    }, [view]);

    return (
        <Router>
            <div className={`min-h-screen font-sans ${backgroundClass} transition-colors duration-500`}>
                <Toaster position="top-right" />
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/signup" element={<Signup />} />
                    <Route
                        path="/artist/dashboard"
                        element={
                            <ArtistDashboard
                                profilePic={artistProfilePic}
                                setProfilePic={setFanProfilePic}
                                projects={projects}
                            />
                        }
                    />
                    <Route
                        path="/fan/dashboard"
                        element={
                            <FanDashboard
                                profilePic={fanProfilePic}
                                setProfilePic={setFanProfilePic}
                                projects={projects}
                            />
                        }
                    />
                    <Route path="/contact" element={<Contact />} />
                    <Route path="/wallet" element={<WalletPanel />} />
                </Routes>
            </div>
        </Router>
    );
};

export default App;
