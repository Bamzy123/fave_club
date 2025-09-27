import React from 'react';
import { Song } from '../types';

interface SongItemProps {
  song: Song;
}

const SongItem: React.FC<SongItemProps> = ({ song }) => (
  <div className="flex items-center justify-between p-4 bg-white/5 border border-white/10 rounded-lg backdrop-blur-sm hover:bg-white/10 transition-colors duration-300">
    <div className="flex items-center space-x-4">
       <img 
         src={song.coverArt?.url || `https://picsum.photos/seed/${song._id}/64`} 
         alt={song.title}
         className="w-12 h-12 rounded-md object-cover"
       />
      <div>
        <h3 className="font-semibold text-white">{song.title}</h3>
        <p className="text-sm text-gray-400">{song.artist || 'Unknown Artist'}</p>
      </div>
    </div>
  </div>
);


interface SongListProps {
  songs: Song[];
  isLoading: boolean;
  error: string | null;
}

const SongList: React.FC<SongListProps> = ({ songs, isLoading, error }) => {
  if (isLoading) {
    return (
        <div className="grid grid-cols-1 gap-4">
            {[...Array(3)].map((_, i) => (
                <div key={i} className="flex items-center justify-between p-4 bg-white/5 border border-white/10 rounded-lg animate-pulse">
                    <div className="flex items-center space-x-4">
                        <div className="w-12 h-12 rounded-md bg-white/10"></div>
                        <div>
                            <div className="h-4 w-32 bg-white/10 rounded"></div>
                            <div className="h-3 w-24 bg-white/10 rounded mt-2"></div>
                        </div>
                    </div>
                    <div className="w-64 h-10 bg-white/10 rounded-full"></div>
                </div>
            ))}
        </div>
    );
  }

  if (error) {
    return <div className="text-center p-8 bg-red-900/50 border border-red-500 rounded-lg text-red-300">{error}</div>;
  }

  if (songs.length === 0) {
    return <div className="text-center p-8 bg-white/5 border border-white/10 rounded-lg text-gray-300">No unreleased songs found. Add one to get started!</div>;
  }

  return (
    <div className="space-y-4">
      {songs.map(song => <SongItem key={song._id} song={song} />)}
    </div>
  );
};

export default SongList;