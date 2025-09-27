import React from 'react';
import ProfileUploader from './ProfileUploader';
import SongList from './SongList';
import { Song } from '../types';

interface FanDashboardProps {
  songs: Song[];
}

const FanDashboard: React.FC<FanDashboardProps> = ({ songs }) => {
  return (
    <div 
      className="min-h-screen bg-cover bg-center bg-fixed text-white" 
      style={{ backgroundImage: "url('https://images.unsplash.com/photo-1579546929518-9e396f3cc809?auto=format&fit=crop&w=2000&q=80')" }}
    >
      <div className="min-h-screen bg-black/60 backdrop-blur-sm">
        <main className="container mx-auto p-4 sm:p-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            <aside className="lg:col-span-4 xl:col-span-3 p-6 bg-black/30 border border-white/20 rounded-2xl flex flex-col items-center space-y-8 h-fit">
              <ProfileUploader 
                storageKey="fan_dashboard_profile_image"
                defaultImage="https://picsum.photos/seed/fan/200"
                title="Fan Profile"
              />
            </aside>

            <section className="lg:col-span-8 xl:col-span-9">
              <div className="p-6 bg-black/30 border border-white/20 rounded-2xl">
                <h1 className="text-3xl font-bold mb-6 tracking-wide">Fresh Tracks</h1>
                <SongList songs={songs} isLoading={false} error={null} />
              </div>
            </section>
          </div>
        </main>
      </div>
    </div>
  );
};

export default FanDashboard;
