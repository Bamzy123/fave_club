import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from './Header';
import Footer from './Footer';
import axios from 'axios';

interface SongData {
    percentage: number;
}

const LoadingSpinner: React.FC = () => (
    <svg
        className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
    >
        <circle
            className="opacity-25"
            cx="12"
            cy="12"
            r="10"
            stroke="currentColor"
            strokeWidth="4"
        ></circle>
        <path
            className="opacity-75"
            fill="currentColor"
            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2
        5.291A7.962 7.962 0 014 12H0c0 
        3.042 1.135 5.824 3 7.938l3-2.647z"
        ></path>
    </svg>
);

const ArtistDashboard: React.FC = () => {
    const [formData, setFormData] = useState<SongData>({
        percentage: 0, // Initialize with 0 (number)
    });

    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);
    const [successMessage, setSuccessMessage] = useState<string | null>(null);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;

        // Only allow numbers, empty string, or minus sign at start
        if (value) {
            setFormData(prev => ({
                ...prev,
                percentage: value === '' ? 0 : parseInt(value) || 0
            }));
        }
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setIsLoading(true);
        setError(null);
        setSuccessMessage(null);

        // Check if percentage is 0 or empty
        if (formData.percentage === 0) {
            setError('Please input a percentage.');
            setIsLoading(false);
            return;
        }

        const percentage = Number(formData.percentage);
        console.log(percentage);

        // Validate percentage range (1-100 as per your input constraints)
        if (percentage < 1 || percentage > 100) {
            setError('Percentage must be between 1 and 100.');
            setIsLoading(false);
            return;
        }

        const userId = localStorage.getItem('userId');
        console.log('Submitting data for userId:', userId);

        try {
            const response = await axios.post('https://favebackend-fqid.onrender.com/api/listSong', {
                artistId: userId,
                percentage: percentage,
            });

            setSuccessMessage(response.data?.message || 'Upload successful 🎉');

            // Reset form
            setFormData({
                percentage: 0,
            });
        } catch (err: any) {
            setError(
                err?.response?.data?.message ||
                err.message ||
                'An unexpected error occurred.'
            );
        } finally {
            setIsLoading(false);
        }
    };

    const bgStyle: React.CSSProperties = {
        backgroundImage:
            "linear-gradient(rgba(2,6,23,0.6), rgba(2,6,23,0.6)), url('https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?auto=format&fit=crop&w=2000&q=80')",
        backgroundSize: 'cover',
        backgroundPosition: 'center',
    };

    return (
        <>
            <main style={bgStyle} className="min-h-screen flex items-center justify-center px-4 sm:px-6 lg:px-8 bg-fixed">
                <div className="w-full max-w-2xl mx-auto bg-gray-800/50 backdrop-blur-sm rounded-2xl shadow-2xl shadow-blue-500/10 p-8 border border-gray-700">
                    <div className="text-center mb-8">
                        <h1 className="text-4xl font-bold text-white tracking-tight">Artist Dashboard</h1>
                        <p className="text-gray-400 mt-2">Submit your new song or album details.</p>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div>
                            <label htmlFor="percentage" className="block text-sm font-medium text-gray-300 mb-2">
                                Percentage
                            </label>
                            <input
                                type="text" // Changed to text to have better control
                                inputMode="numeric" // Shows numeric keyboard on mobile
                                pattern="[0-9]*" // HTML5 pattern for numbers only
                                id="percentage"
                                name="percentage"
                                value={formData.percentage}
                                onChange={handleInputChange}
                                placeholder="e.g., 10"
                                min="1"
                                max="100"
                                className="w-full px-4 py-2 text-white bg-gray-900/50 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                        </div>
                        {error && (
                            <div className="p-4 text-sm text-red-300 bg-red-800/50 rounded-lg" role="alert">
                                {error}
                            </div>
                        )}
                        {successMessage && (
                            <div className="p-4 text-sm text-green-300 bg-green-800/50 rounded-lg" role="alert">
                                {successMessage}
                            </div>
                        )}

                        <div>
                            <button
                                type="submit"
                                disabled={isLoading}
                                className="w-full flex items-center justify-center px-6 py-3 text-base font-semibold text-white rounded-full shadow-lg transform-gpu transition-all duration-200 bg-gradient-to-r from-pink-500 via-purple-600 to-indigo-600 hover:scale-[1.02] hover:shadow-xl focus:outline-none focus:ring-4 focus:ring-pink-400/30 disabled:opacity-60 disabled:cursor-not-allowed"
                            >
                                {isLoading ? (
                                    <>
                                        <LoadingSpinner /> Processing...
                                    </>
                                ) : (
                                    'Submit Details'
                                )}
                            </button>
                        </div>
                    </form>
                </div>
            </main>
            <Footer />
        </>
    );
};

export default ArtistDashboard;