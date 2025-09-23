import React, { useEffect } from 'react';

const Signup: React.FC = () => {
    
    const handleCredentialResponse = (response: any) => {
        console.log("Encoded JWT ID token: " + response.credential);
        // Here you would send the token to your backend for verification
        alert('Signup successful! Check the console for your token.');
    };

    useEffect(() => {
        const initializeGsi = () => {
            const google = (window as any).google;
            if (!google || !google.accounts || !google.accounts.id) {
                console.error("Google Identity Services not available.");
                return;
            }

            google.accounts.id.initialize({
                client_id: "1051618722983-18hfavntsgcr1hkefir2ehatpsrvt795.apps.googleusercontent.com",
                callback: handleCredentialResponse
            });

            const fanButtonParent = document.getElementById('google-signin-fan');
            if (fanButtonParent) {
                 google.accounts.id.renderButton(
                    fanButtonParent,
                    { theme: "outline", size: "large", type: 'standard', text: 'signup_with', logo_alignment: 'left' }
                );
            }

            const artistButtonParent = document.getElementById('google-signin-artist');
            if (artistButtonParent) {
                google.accounts.id.renderButton(
                    artistButtonParent,
                    { theme: "outline", size: "large", type: 'standard', text: 'signup_with', logo_alignment: 'left' }
                );
            }
        };

        const interval = setInterval(() => {
            if ((window as any).google?.accounts?.id) {
                clearInterval(interval);
                initializeGsi();
            }
        }, 100);

        return () => clearInterval(interval);

    }, []);

    return (
        <main className="min-h-screen bg-brand-dark flex items-center justify-center py-24 px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl w-full space-y-12">
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
                    <div className="bg-zinc-800 border border-zinc-700 rounded-2xl p-8 flex-1 flex flex-col items-center text-center transform transition-transform hover:scale-105 duration-300">
                        <h3 className="text-3xl font-bold text-white">For Fans</h3>
                        <p className="mt-4 text-gray-400 flex-grow mb-8">
                            Discover new music, connect with artists, and be part of a vibrant community.
                        </p>
                        <div id="google-signin-fan" className="w-full flex justify-center"></div>
                    </div>

                    {/* Artist Signup Card */}
                    <div className="bg-zinc-800 border border-zinc-700 rounded-2xl p-8 flex-1 flex flex-col items-center text-center transform transition-transform hover:scale-105 duration-300">
                        <h3 className="text-3xl font-bold text-white">For Artists</h3>
                        <p className="mt-4 text-gray-400 flex-grow mb-8">
                           Unleash your artistry, distribute your music, and build your legacy with our powerful tools.
                        </p>
                        <div id="google-signin-artist" className="w-full flex justify-center"></div>
                    </div>
                </div>
            </div>
        </main>
    );
};

export default Signup;