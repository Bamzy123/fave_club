
import React, { useEffect } from 'react';
import { useCurrentAccount } from '@mysten/dapp-kit';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import type { Project } from '../types';
import { View } from '../types';
import ProfileUploader from './ProfileUploader';
import ProjectCard from './ProjectCard';

interface ArtistDashboardProps {
    profilePic: string | null;
    setProfilePic: (url: string) => void;
    projects: Project[];
}

const ArtistDashboard: React.FC<ArtistDashboardProps> = ({ profilePic, setProfilePic, projects }) => {
    const account = useCurrentAccount();
    const navigate = useNavigate();

    useEffect(() => {
        // Check if wallet is connected
        if (!account) {
            toast.error('Please connect your wallet to access the Artist Dashboard');
            navigate('/signup');
            return;
        }

        // Check if user role is artist (optional check)
        const userRole = localStorage.getItem('userRole');
        if (userRole && userRole !== 'ARTIST') {
            toast.error('Access denied. This is the Artist Dashboard.');
            navigate('/signup');
            return;
        }

        // Welcome message for artists
        if (account) {
            toast.success('Welcome to your Artist Dashboard! 🎨');
        }
    }, [account, navigate]);

    // Show loading state while checking authentication
    if (!account) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="text-center">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-500 mx-auto mb-4"></div>
                    <p className="text-gray-600">Connecting to wallet...</p>
                </div>
            </div>
        );
    }
    return (
        <div className="container mx-auto">
            <div className="flex flex-col md:flex-row gap-8 items-start">
                <div className="w-full md:w-1/4 xl:w-1/5">
                    <div className="bg-gray-800 rounded-xl p-6 sticky top-8 text-center shadow-2xl">
                        <ProfileUploader profilePic={profilePic} setProfilePic={setProfilePic} />
                        <h2 className="text-2xl font-bold mt-4 text-white">The Artist</h2>
                        <p className="text-indigo-400 font-medium">Michael Producer</p>
                        <p className="text-sm text-gray-400 mt-2">
                            Welcome to your creative space. Manage your projects and connect with your audience.
                        </p>
                    </div>
                </div>
                <div className="w-full md:w-3/4 xl:w-4/5">
                    <h1 className="text-3xl font-bold mb-6 text-indigo-400 tracking-wider">My Projects</h1>
                    <div className="grid grid-cols-1 lg:grid-cols-2 2xl:grid-cols-3 gap-6">
                        {projects.map((project) => (
                            <ProjectCard key={project.id} project={project} viewType={View.Artist} />
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ArtistDashboard;
