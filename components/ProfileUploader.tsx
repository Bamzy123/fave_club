
import React, { useRef } from 'react';
import { UserIcon, UploadIcon } from './icons';

interface ProfileUploaderProps {
    profilePic: string | null;
    setProfilePic: (url: string) => void;
}

const ProfileUploader: React.FC<ProfileUploaderProps> = ({ profilePic, setProfilePic }) => {
    const fileInputRef = useRef<HTMLInputElement>(null);

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setProfilePic(reader.result as string);
            };
            reader.readAsDataURL(file);
        }
    };

    const handleUploadClick = () => {
        fileInputRef.current?.click();
    };

    return (
        <div className="relative w-32 h-32 mx-auto group">
            <input
                type="file"
                ref={fileInputRef}
                onChange={handleFileChange}
                className="hidden"
                accept="image/*"
            />
            {profilePic ? (
                <img
                    src={profilePic}
                    alt="Profile"
                    className="w-32 h-32 rounded-full object-cover border-4 border-gray-500 group-hover:border-indigo-400 transition-all duration-300"
                />
            ) : (
                <div className="w-32 h-32 rounded-full bg-gray-700 flex items-center justify-center border-4 border-gray-500 group-hover:border-blue-500 transition-all duration-300">
                    <UserIcon className="w-16 h-16 text-gray-400" />
                </div>
            )}
            <button
                onClick={handleUploadClick}
                className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-50 flex items-center justify-center rounded-full transition-opacity duration-300 opacity-0 group-hover:opacity-100"
            >
                <UploadIcon className="w-8 h-8 text-white" />
            </button>
        </div>
    );
};

export default ProfileUploader;
