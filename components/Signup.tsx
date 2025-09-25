import React, { useEffect, useState } from 'react';
import { ConnectButton, useCurrentAccount } from '@mysten/dapp-kit';
import axios from 'axios';

const Signup: React.FC = () => {
    // @ts-ignore
    const backendUrl = import.meta.env.VITE_BACKEND_URL;

    const handleGoogleLogin = () => {
        // Correctly initiates the OAuth flow by redirecting the browser to the backend.
        window.location.href = `${backendUrl}/auth/google`;
    };

    return (
        <main className="relative min-h-screen flex items-center justify-center py-24 px-4 sm:px-6 lg:px-8 overflow-hidden">
            <div
                className="absolute inset-0 bg-cover bg-center bg-no-repeat"
                style={{
                    backgroundImage: `url(https://picsum.photos/seed/musicstudio/1920/1080)`,
                }}
            >
                <div className="absolute inset-0 bg-black/70"></div>
            </div>
            <div className="relative z-10 max-w-4xl w-full space-y-12">
                <div className="text-center">
                    <h2 className="font-serif text-5xl md:text-6xl font-bold text-white">
                        Join Fave Today
                    </h2>
                    <p className="mt-4 text-lg text-gray-400">
                        Choose your path and start your journey in sound.
                    </p>
                </div>
                <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-8">
                    {/* Fan Signup Card */}
                    <div className="bg-zinc-800/80 backdrop-blur-sm border border-zinc-700 rounded-2xl p-8 flex-1 flex flex-col items-center text-center transform transition-transform hover:scale-105 duration-300">
                        <h3 className="text-3xl font-bold text-white">For Fans</h3>
                        <p className="mt-4 text-gray-400 flex-grow mb-8">
                            Discover new music, connect with artists, and be part
                            of a vibrant community.
                        </p>
                        <div className="w-full flex justify-center items-center">
                            {/* Correctly initiating the login flow with a button redirect */}
                            <button onClick={handleGoogleLogin} className="mt-8 bg-brand-pink text-white font-bold py-4 px-10 rounded-full text-lg hover:scale-105 transform transition-transform duration-300">
                                Sign up with Google
                            </button>
                        </div>
                    </div>

                    {/* Artist Signup Card */}
                    <div className="bg-zinc-800/80 backdrop-blur-sm border border-zinc-700 rounded-2xl p-8 flex-1 flex flex-col items-center text-center transform transition-transform hover:scale-105 duration-300">
                        <h3 className="text-3xl font-bold text-white">For Artists</h3>
                        <p className="mt-4 text-gray-400 flex-grow mb-8">
                            Unleash your artistry, distribute your music, and
                            build your legacy with our powerful tools.
                        </p>
                        <div className="w-full flex justify-center items-center">
                            {/* Correctly initiating the login flow with a button redirect */}
                            <button onClick={handleGoogleLogin} className="mt-8 bg-brand-pink text-white font-bold py-4 px-10 rounded-full text-lg hover:scale-105 transform transition-transform duration-300">
                                Sign up with Google
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </main>
    );
};

export default Signup;
