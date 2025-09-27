
import React from 'react';
import type { Project } from '../types';
import { View } from '../types';
import ProfileUploader from './ProfileUploader';
import ProjectCard from './ProjectCard';

interface FanDashboardProps {
    profilePic: string | null;
    setProfilePic: (url: string) => void;
    projects: Project[];
}

const FanDashboard: React.FC<FanDashboardProps> = ({ profilePic, setProfilePic, projects }) => {
    return (
        <div className="container mx-auto">
            <div className="flex flex-col md:flex-row gap-8 items-start">
                <aside className="w-full md:w-1/4 xl:w-1/5">
                    <div className="bg-white rounded-xl p-6 sticky top-8 text-center shadow-lg border border-gray-200">
                        <ProfileUploader profilePic={profilePic} setProfilePic={setProfilePic} />
                        <h2 className="text-2xl font-bold mt-4 text-gray-800">Music Fan</h2>
                        <p className="text-blue-600 font-medium">Stephen</p>
                        <p className="text-sm text-gray-500 mt-2">
                            Invest in your favorite artists.
                        </p>
                    </div>
                </aside>
                <section className="w-full md:w-3/4 xl:w-4/5">
                    <h1 className="text-3xl font-bold mb-6 text-blue-600 tracking-wider">Artist Unreleases</h1>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-6">
                        {projects.map((project) => (
                            <ProjectCard key={project.id} project={project} viewType={View.Fan} />
                        ))}
                    </div>
                </section>
            </div>
        </div>
    );
};

export default FanDashboard;