import React, { useEffect, useState } from 'react';
import { ConnectButton, useCurrentAccount } from '@mysten/dapp-kit';
import axios from 'axios';

const Signup: React.FC = () => {
    const account = useCurrentAccount();

    // When user clicks a ConnectButton we set the role they chose, then
    // wait for the wallet to actually connect (account.address becomes
    // available via the dapp-kit hook). This avoids calling the backend
    // before the wallet connection completes.
    const [pendingRole, setPendingRole] = useState<null | 'FAN' | 'ARTIST'>(null);

    useEffect(() => {
        if (!pendingRole) return; // nothing to do

        // If address not available yet, wait — the ConnectButton will open
        // the wallet and the hook should update shortly.
        if (!account?.address) {
            console.log('Waiting for wallet to connect...');
            return;
        }

        const address = account.address;
        console.log('Connected address:', address, 'role:', pendingRole);

        const endpoint =
            pendingRole === 'FAN'
                ? 'https://favebackend.onrender.com/api/signUp/Fan'
                : 'https://favebackend.onrender.com/api/signUp/Artist';

        let cancelled = false;

        (async () => {
            try {
                const payload = { walletAddress: address, role: pendingRole };
                console.log('Posting to backend:', endpoint, payload);

                const backendResponse = await axios.post(endpoint, payload);

                if (cancelled) return;

                console.log('Wallet connection successful:', backendResponse.status, backendResponse.data);
                // TODO: handle redirect/session here
            } catch (error: any) {
                if (cancelled) return;
                console.error('Backend API error:', error?.response?.status, error?.response?.data || error?.message || error);
            } finally {
                // clear pending role whether success or failure so user can try again
                if (!cancelled) setPendingRole(null);
            }
        })();

        return () => {
            cancelled = true;
        };
    }, [pendingRole, account]);

    // Manual send function: call this after wallet is connected to force the POST.
    const sendSignup = async (role: 'FAN' | 'ARTIST') => {
        const address = account?.address;
        if (!address) {
            console.error('Cannot send signup: wallet not connected');
            return;
        }

        const endpoint =
            role === 'FAN'
                ? 'https://favebackend.onrender.com/api/signUp/Fan'
                : 'https://favebackend.onrender.com/api/signUp/Artist';

        const payload = { walletAddress: address, role };
        console.log('Manual POST to backend:', endpoint, payload);

        try {
            const resp = await axios.post(endpoint, payload, {
                headers: { 'Content-Type': 'application/json' },
                timeout: 10000,
            });
            console.log('Manual POST success', resp.status, resp.data);
        } catch (err: any) {
            console.error('Manual POST error', err?.response?.status, err?.response?.data || err?.message || err);
        }
    };

    // Log and surface the raw account object so we can see its shape in the UI
    useEffect(() => {
        console.log('useCurrentAccount changed:', account);
    }, [account]);

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
                            <ConnectButton
                                connectText="Connect as Fan"
                                onClick={() => setPendingRole('FAN')}
                            />
                        </div>
                        <div className="w-full flex justify-center items-center mt-3">
                            <button
                                className="px-4 py-2 bg-green-600 text-white rounded"
                                onClick={() => sendSignup('FAN')}
                            >
                                Send signup (Fan)
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
                            <ConnectButton
                                connectText="Connect as Artist"
                                onClick={() => setPendingRole('ARTIST')}
                            />
                        </div>
                        <div className="w-full flex justify-center items-center mt-3">
                            <button
                                className="px-4 py-2 bg-green-600 text-white rounded"
                                onClick={() => sendSignup('ARTIST')}
                            >
                                Send signup (Artist)
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </main>
    );
};

export default Signup;
