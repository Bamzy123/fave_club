import React, { useState } from 'react';
import { GoogleLogin, type CredentialResponse } from '@react-oauth/google';
import axios from 'axios';

const Signup: React.FC = () => {
    const [loading, setLoading] = useState<'fan' | 'artist' | null>(null);

    const onGoogleSuccess = (role: 'fan' | 'artist') => async (response: CredentialResponse) => {
        const token = response.credential;
        if (!token) {
            console.error('Google credential is missing.');
            alert('Google sign-in failed. Please try again.');
            return;
        }

        setLoading(role);

        try {
            const backendResponse = await axios.post('https://favebackend.onrender.com/auth/goggle', {
                credential: token,
                role: role
            });

            console.log('Backend response:', backendResponse.data);

            // Handle the actual backend response structure
            const { success, sessionToken, artist, fan } = backendResponse.data;

            if (!success) {
                alert('Authentication failed. Please try again.');
                return;
            }

            // Get the user data based on role
            const userData = role === 'artist' ? artist : fan;

            if (!userData) {
                alert('User data not found in response.');
                return;
            }

            // Store token and user data with correct property names
            localStorage.setItem('token', sessionToken);
            localStorage.setItem('user', JSON.stringify(userData));
            localStorage.setItem('userRole', role);

            // Check if profile is completed (adjust logic based on your backend)
            const hasProfile = userData.profile && Object.keys(userData.profile).length > 0;

            // Redirect based on profile completion
            if (hasProfile) {
                window.location.href = `/${role}/dashboard`; // or wherever you want to redirect
            } else {
                // Redirect to profile setup if profile is incomplete
                window.location.href = `/${role}/setup-profile`;
            }

        } catch (error: any) {
            console.error('Backend API error:', error);

            if (error.response?.data?.message) {
                alert(`Signup failed: ${error.response.data.message}`);
            } else if (error.response?.status === 400) {
                alert('Invalid request. Please try again.');
            } else if (error.response?.status === 500) {
                alert('Server error. Please try again later.');
            } else {
                alert('Network error. Please check your connection.');
            }
        } finally {
            setLoading(null);
        }
    };

    const onGoogleError = () => {
        console.error('Google sign-in error');
        alert('Google sign-in failed. Please try again.');
        setLoading(null);
    };

    return (
        <main className="relative min-h-screen flex items-center justify-center py-24 px-4 sm:px-6 lg:px-8 overflow-hidden">
            <div
                className="absolute inset-0 bg-cover bg-center bg-no-repeat"
                style={{ backgroundImage: `url(https://picsum.photos/seed/musicstudio/1920/1080)` }}
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
                            Discover new music, connect with artists, and be part of a vibrant community.
                        </p>
                        <div className="w-full flex justify-center items-center">
                            <GoogleLogin
                                onSuccess={onGoogleSuccess('fan')}
                                onError={onGoogleError}
                                useOneTap={false}
                                theme="outline"
                                size="large"
                                text="signup_with"
                                logo_alignment="left"
                                type="standard"
                                cancel_on_tap_outside={true}
                                itp_support={false}
                                state_cookie_domain="single_host_origin"
                            />
                            {loading === 'fan' && (
                                <div className="ml-3 flex items-center">
                                    <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-white"></div>
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Artist Signup Card */}
                    <div className="bg-zinc-800/80 backdrop-blur-sm border border-zinc-700 rounded-2xl p-8 flex-1 flex flex-col items-center text-center transform transition-transform hover:scale-105 duration-300">
                        <h3 className="text-3xl font-bold text-white">For Artists</h3>
                        <p className="mt-4 text-gray-400 flex-grow mb-8">
                            Unleash your artistry, distribute your music, and build your legacy with our powerful tools.
                        </p>
                        <div className="w-full flex justify-center items-center">
                            <GoogleLogin
                                onSuccess={onGoogleSuccess('artist')}
                                onError={onGoogleError}
                                useOneTap={false}
                                theme="outline"
                                size="large"
                                text="signup_with"
                                logo_alignment="left"
                                type="standard"
                                cancel_on_tap_outside={true}
                                itp_support={false}
                                state_cookie_domain="single_host_origin"
                            />
                            {loading === 'artist' && (
                                <div className="ml-3 flex items-center">
                                    <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-white"></div>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </main>
    );
};

export default Signup;