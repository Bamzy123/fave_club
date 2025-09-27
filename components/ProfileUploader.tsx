import React, { useState, useRef } from 'react';

interface ProfileUploaderProps {
  storageKey: string;
  defaultImage: string;
  title: string;
}

const ProfileUploader: React.FC<ProfileUploaderProps> = ({ storageKey, defaultImage, title }) => {
  const [profileImage, setProfileImage] = useState<string>(() => {
    try {
      const savedImage = localStorage.getItem(storageKey);
      return savedImage || defaultImage;
    } catch (error) {
      console.error("Failed to load profile image from localStorage", error);
      return defaultImage;
    }
  });
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      const file = event.target.files[0];
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onloadend = () => {
        const base64String = reader.result as string;
        setProfileImage(base64String);
        try {
          localStorage.setItem(storageKey, base64String);
        } catch (error) {
          console.error("Failed to save profile image to localStorage", error);
        }
      };
      reader.onerror = (error) => {
        console.error("Error converting file to base64", error);
      };
    }
  };

  const handleImageClick = () => {
    fileInputRef.current?.click();
  };

  return (
    <div className="flex flex-col items-center space-y-4">
      <div className="relative group">
        <img
          src={profileImage}
          alt="Profile"
          className="w-32 h-32 rounded-full object-cover border-4 border-white/20 shadow-lg transition-transform duration-300 group-hover:scale-105"
        />
        <div
          onClick={handleImageClick}
          className="absolute inset-0 bg-black/50 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 cursor-pointer"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
          </svg>
        </div>
      </div>
      <input
        type="file"
        ref={fileInputRef}
        onChange={handleImageChange}
        className="hidden"
        accept="image/*"
      />
      <h2 className="text-xl font-bold text-white tracking-wider">{title}</h2>
    </div>
  );
};

export default ProfileUploader;
