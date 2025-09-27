import { Song } from '../types';

const API_BASE_URL = 'https://favebackend-fqid.onrender.com/api';

export const fetchSongs = async (): Promise<Song[]> => {
  const response = await fetch(`${API_BASE_URL}/listSong`);
  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.message || 'Failed to fetch songs.');
  }
  const data = await response.json();
  // The API returns an object with a `songs` property which is the array
  return data.songs || [];
};

export const addSong = async (percentage: number, imageFile: File): Promise<any> => {
  const userId = localStorage.getItem('userId');
  if (!userId) {
    throw new Error('User ID not found in local storage.');
  }

  const formData = new FormData();
  formData.append('userId', userId);
  formData.append('percentage', String(Math.round(percentage)));
  formData.append('coverArt', imageFile);


  const response = await fetch(`${API_BASE_URL}/listSong`, {
    method: 'POST',
    body: formData, // Let the browser set the Content-Type header for multipart/form-data
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.message || 'Failed to submit data.');
  }

  return response.json();
};