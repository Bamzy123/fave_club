import React, { useEffect, useState } from 'react';
import { ConnectButton, useCurrentAccount } from '@mysten/dapp-kit';
import axios from 'axios';
import toast, { Toaster } from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import Header from './Header';

const Signup: React.FC = () => {
    const account = useCurrentAccount();
    const [pendingRole, setPendingRole] = useState<null | 'FAN' | 'ARTIST'>(null);
    const [loading, setLoading] = useState(false);
    const Navigate = useNavigate();

    const postSignup = async (address: string, role: 'FAN' | 'ARTIST') => {
        // console.log('postSignup called with', { address, role });
        const endpoint =
            role === 'FAN'
                ? 'https://favebackend-fqid.onrender.com/api/login/Fan'
                : 'https://favebackend-fqid.onrender.com/api/login/Artist';

        try {
            setLoading(true);
            const backendResponse = await axios.post(endpoint, {
               address: address,
                role: role,
            });

            toast.success(`Signed up as ${role} 🎉`);
            console.log('Wallet connection successful:', backendResponse.data);

            // Save only the backend user id to localStorage (key: 'userId')
            try {
                const data = backendResponse?.data || {};
                const id = data?.user._id;

                if (id) {
                    // store as plain string for easy reading elsewhere
                    localStorage.setItem('userId', String(id));
                    localStorage.setItem('userRole', role); // Also save the role
                    console.log('saved userId to localStorage:', id);

                    // Add a small delay to ensure state is settled before navigation
                    setTimeout(() => {
                        // Navigate to the proper dashboard after successful save
                        if (role === 'ARTIST') {
                            Navigate('/artist/dashboard');
                        } else {
                            Navigate('/fan/dashboard');
                        }
                    }, 500);
                } else {
                    console.warn('No user id found in backend response to save');
                    // Navigate anyway since wallet connection was successful
                    setTimeout(() => {
                        if (role === 'ARTIST') {
                            Navigate('/artist/dashboard');
                        } else {
                            Navigate('/fan/dashboard');
                        }
                    }, 500);
                }
            } catch (e) {
                console.warn('Could not save userId to localStorage', e);
                // Navigate anyway since wallet connection was successful
                setTimeout(() => {
                    if (role === 'ARTIST') {
                        Navigate('/artist/dashboard');
                    } else {
                        Navigate('/fan/dashboard');
                    }
                }, 500);
            }
        } catch (err: any) {
            console.error('Backend API error:', {
                message: err?.message,
                responseData: err?.response?.data,
                status: err?.response?.status,
                headers: err?.response?.headers,
            });
            
            // Even if backend fails, wallet is connected so navigate to dashboard
            toast.success(`Wallet connected as ${role}! 🔗`);
            localStorage.setItem('userRole', role); // Save role even if backend fails
            
            setTimeout(() => {
                if (role === 'ARTIST') {
                    Navigate('/artist/dashboard');
                } else {
                    Navigate('/fan/dashboard');
                }
            }, 500);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        if (!pendingRole) return;

        let cancelled = false;

        const run = async () => {
            const deadline = Date.now() + 8000;
            while (!cancelled && Date.now() < deadline) {
                if (account?.address) break;
                await new Promise((r) => setTimeout(r, 300));
            }

            if (cancelled) return;

            // if (!account?.address) {
            //     toast.error('Wallet connection timed out ⏳');
            //     setPendingRole(null);
            //     return;
            // }

            console.log('Connected address (effect):', account.address, 'role:', pendingRole);
            await postSignup(account.address, pendingRole);
            setPendingRole(null);
        };

        run();

        return () => {
            cancelled = true;
        };
    }, [pendingRole, account?.address]);

    return (
        <main className="relative min-h-screen flex items-center justify-center py-24 px-4 sm:px-6 lg:px-8 overflow-hidden">
            <Header onNavigate={(page: string) => {
                if (page === 'home') {
                    Navigate('/');
                } else {
                    // default to home for now; expand routing as needed
                    Navigate('/');
                }
            }} />
            <Toaster position="top-right" />
            <div
                className="absolute inset-0 bg-cover bg-center bg-no-repeat"
                style={{
                    // Updated to a concert/fans image for a "fans entry" vibe
                    backgroundImage: `url(https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?auto=format&fit=crop&w=2000&q=80)`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
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
                                connectText={loading && pendingRole === 'FAN' ? "Connecting..." : "Connect as Fan"}
                                disabled={loading}
                                onClick={() => setPendingRole('FAN')}
                            />
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
                                connectText={loading && pendingRole === 'ARTIST' ? "Connecting..." : "Connect as Artist"}
                                disabled={loading}
                                onClick={() => setPendingRole('ARTIST')}
                            />
                        </div>
                    </div>
                </div>
            </div>
        </main>
    );
};

export default Signup;