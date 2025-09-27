import React, { useState, useEffect } from 'react';

interface AddSongModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAddSong: (name: string, percentage: number, imageFile: File) => void;
  isLoading: boolean;
}

const AddSongModal: React.FC<AddSongModalProps> = ({ isOpen, onClose, onAddSong, isLoading }) => {
  const [name, setName] = useState('');
  const [percentage, setPercentage] = useState<number>(50);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!isOpen) {
      // Reset state when modal closes
      setName('');
      setPercentage(1);
      setImageFile(null);
      if (imagePreview) {
        URL.revokeObjectURL(imagePreview);
      }
      setImagePreview(null);
      setError(null);
    }
  }, [isOpen, imagePreview]);


  if (!isOpen) return null;
  
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setImageFile(file);
      if (imagePreview) {
        URL.revokeObjectURL(imagePreview);
      }
      setImagePreview(URL.createObjectURL(file));
      setError(null);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!imageFile) {
        setError("Please upload a cover art image.");
        return;
    }
    setError(null);
    onAddSong(name, percentage, imageFile);
  };
  
  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 transition-opacity duration-300" onClick={onClose}>
      <div className="bg-white/10 border border-white/20 rounded-2xl shadow-2xl p-8 w-full max-w-md text-white transform transition-all duration-300 scale-95 hover:scale-100" onClick={e => e.stopPropagation()}>
        <h2 className="text-2xl font-bold mb-6 text-center">Add Project</h2>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-300 mb-2">Name </label>
            <input
              id="name"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full bg-black/20 border border-white/20 rounded-lg px-4 py-2 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500"
              placeholder="e.g., Your Name"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">Cover Art</label>
             <div 
                className="mt-1 flex justify-center items-center px-6 pt-5 pb-6 border-2 border-white/20 border-dashed rounded-lg cursor-pointer hover:border-purple-500 transition-colors"
                onClick={() => document.getElementById('file-upload')?.click()}
            >
                <div className="space-y-1 text-center">
                    {imagePreview ? (
                        <img src={imagePreview} alt="Cover art preview" className="mx-auto h-24 w-24 object-cover rounded-md shadow-md"/>
                    ) : (
                        <svg className="mx-auto h-12 w-12 text-gray-400" stroke="currentColor" fill="none" viewBox="0 0 48 48" aria-hidden="true">
                            <path d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                    )}
                    <div className="flex text-sm text-gray-400 justify-center">
                        <label htmlFor="file-upload" className="relative cursor-pointer rounded-md font-medium text-purple-400 hover:text-purple-300">
                            <span>Upload a file</span>
                        </label>
                        <input id="file-upload" name="file-upload" type="file" className="sr-only" onChange={handleImageChange} accept="image/*"/>
                    </div>
                    <p className="text-xs text-gray-500">PNG, JPG, GIF</p>
                </div>
            </div>
          </div>
          
          <div>
            <label htmlFor="percentage" className="block text-sm font-medium text-gray-300 mb-2">Percentage</label>
            <div className="flex items-center space-x-4">
               <input
                  id="percentage"
                  type="range"
                  min="1"
                  max="100"
                  value={percentage}
                  onChange={(e) => setPercentage(Number(e.target.value))}
                  className="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer accent-purple-500"
                />
                <span className="font-mono text-lg w-16 text-center bg-black/20 py-1 rounded-md">{percentage}%</span>
            </div>
          </div>

          {error && <p className="text-red-400 text-sm text-center bg-red-900/20 p-2 rounded-lg">{error}</p>}

          <div className="flex items-center justify-between pt-4">
            <button
              type="button"
              onClick={onClose}
              className="px-6 py-2 rounded-lg bg-gray-600/50 hover:bg-gray-500/50 transition-colors duration-300"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isLoading}
              className="px-6 py-2 rounded-lg bg-purple-600 hover:bg-purple-700 disabled:bg-purple-900 disabled:cursor-not-allowed transition-colors duration-300 font-semibold flex items-center"
            >
              {isLoading && <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg>}
              {isLoading ? 'Submitting...' : 'Submit'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddSongModal;