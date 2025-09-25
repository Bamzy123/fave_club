import React, { useState, useEffect } from 'react';
import axios from 'axios';

interface SongData {
  address: string;
  imageurl: string;
  name: string;
  percentage: number;
  description: string;
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
  const [formData, setFormData] = useState<Omit<SongData, 'percentage'> & { percentage: string }>({
    address: '',
    imageurl: '',
    name: '',
    percentage: '',
    description: '',
  });

  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  // Prefill wallet address from localStorage
  useEffect(() => {
    const WALLET_KEY = 'wallet';
    const storedWalletAddress = localStorage.getItem(WALLET_KEY) || '';
    setFormData((prev) => ({ ...prev, address: storedWalletAddress }));
  }, []);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);
    setSuccessMessage(null);

    if (!formData.name || !formData.imageurl || !formData.percentage || !formData.description) {
      setError('Please fill out all fields.');
      setIsLoading(false);
      return;
    }

    const percentageValue = parseFloat(formData.percentage);
    if (isNaN(percentageValue) || percentageValue < 0 || percentageValue > 200) {
      setError('Percentage must be a number between 0 and 200.');
      setIsLoading(false);
      return;
    }

    const dataToSubmit: SongData = {
      ...formData,
      percentage: percentageValue,
    };

    try {
      const response = await axios.post('https://favebackend.onrender.com/api/artist/list', dataToSubmit
      );

      setSuccessMessage(response.data?.message || 'Upload successful 🎉');

      // Reset form except wallet
      setFormData((prev) => ({
        ...prev,
        imageurl: '',
        name: '',
        percentage: '',
        description: '',
      }));
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

  return (
    <div className="w-full max-w-2xl mx-auto bg-gray-800/50 backdrop-blur-sm rounded-2xl shadow-2xl shadow-blue-500/10 p-8 border border-gray-700">
      <div className="text-center mb-8">
        <h1 className="text-4xl font-bold text-white tracking-tight">Artist Dashboard</h1>
        <p className="text-gray-400 mt-2">Submit your new song or album details.</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label htmlFor="address" className="block text-sm font-medium text-gray-300 mb-2">
            Wallet Address
          </label>
          <input
            type="text"
            id="address"
            name="address"
            value={formData.address}
            disabled
            className="w-full px-4 py-2 text-white bg-gray-700 border border-gray-600 rounded-lg focus:outline-none disabled:bg-gray-700/50 disabled:cursor-not-allowed disabled:text-gray-400"
          />
        </div>

        <div>
          <label htmlFor="imageurl" className="block text-sm font-medium text-gray-300 mb-2">
            Image URL
          </label>
          <input
            type="text"
            id="imageurl"
            name="imageurl"
            value={formData.imageurl}
            onChange={handleInputChange}
            placeholder="https://example.com/album-art.jpg"
            className="w-full px-4 py-2 text-white bg-gray-900/50 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div>
          <label htmlFor="name" className="block text-sm font-medium text-gray-300 mb-2">
            Song/Album Name
          </label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleInputChange}
            placeholder="Enter the name"
            className="w-full px-4 py-2 text-white bg-gray-900/50 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div>
          <label htmlFor="percentage" className="block text-sm font-medium text-gray-300 mb-2">
            Percentage
          </label>
          <input
            type="number"
            id="percentage"
            name="percentage"
            value={formData.percentage}
            onChange={handleInputChange}
            placeholder="e.g., 10.5"
            step="0.01"
            min="0"
            max="100"
            className="w-full px-4 py-2 text-white bg-gray-900/50 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div>
          <label htmlFor="description" className="block text-sm font-medium text-gray-300 mb-2">
            Description
          </label>
          <textarea
            id="description"
            name="description"
            value={formData.description}
            onChange={handleInputChange}
            rows={4}
            placeholder="A short description of the song or album"
            className="w-full px-4 py-2 text-white bg-gray-900/50 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          ></textarea>
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
            className="w-full flex items-center justify-center px-6 py-3 text-base font-medium text-white bg-blue-600 border border-transparent rounded-lg shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-blue-500 disabled:bg-blue-800/50 disabled:cursor-wait transition-colors duration-200"
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
  );
};

export default ArtistDashboard;
