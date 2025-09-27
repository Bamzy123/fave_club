
import React from 'react';
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
