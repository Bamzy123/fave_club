import React, { useState, useEffect } from 'react';
import ProfileUploader from './ProfileUploader';
import SongList from './SongList';
import AddSongModal from './AddSongModal';
import { Song } from '../types';

interface ArtistDashboardProps {
  songs: Song[];
  onAddSong: (name: string, percentage: number, imageFile: File) => void;
}

const ArtistDashboard: React.FC<ArtistDashboardProps> = ({ songs, onAddSong }) => {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  useEffect(() => {
    // Ensure a userId exists in local storage for potential future use
    if (!localStorage.getItem('userId')) {
      localStorage.setItem('userId', `user_${Date.now()}_${Math.random().toString(36).substring(2, 9)}`);
    }
  }, []);

  const handleAddSongWrapper = (name: string, percentage: number, imageFile: File) => {
    setIsSubmitting(true);
    // The actual logic is now in App.tsx, we just call the prop
    onAddSong(name, percentage, imageFile);
    // Assume success and close the modal.
    setIsModalOpen(false);
    setIsSubmitting(false);
  };

  return (
    <div 
      className="min-h-screen bg-cover bg-center bg-fixed text-white" 
      style={{ backgroundImage: "url('https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?auto=format&fit=crop&w=2000&q=80')" }}
    >
      <div className="min-h-screen bg-black/60 backdrop-blur-sm">
        <main className="container mx-auto p-4 sm:p-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            <aside className="lg:col-span-4 xl:col-span-3 p-6 bg-black/30 border border-white/20 rounded-2xl flex flex-col items-center space-y-8 h-fit">
              <ProfileUploader 
                storageKey="artist_dashboard_profile_image"
                defaultImage="https://picsum.photos/seed/artist/200"
                title="Artist Profile"
              />
              <button
                onClick={() => setIsModalOpen(true)}
                className="w-full flex items-center justify-center space-x-2 bg-purple-600 text-white font-bold py-3 px-6 rounded-lg hover:bg-purple-700 transition-transform duration-300 transform hover:scale-105 shadow-lg"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                </svg>
                <span>Add Unreleased Song</span>
              </button>
            </aside>

            <section className="lg:col-span-8 xl:col-span-9">
              <div className="p-6 bg-black/30 border border-white/20 rounded-2xl">
                <h1 className="text-3xl font-bold mb-6 tracking-wide">My Project</h1>
                <SongList songs={songs} isLoading={false} error={null} />
              </div>
            </section>
          </div>
        </main>
      </div>

      <AddSongModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onAddSong={handleAddSongWrapper}
        isLoading={isSubmitting}
      />
    </div>
  );
};

export default ArtistDashboard;
