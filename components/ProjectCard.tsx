import React, { useState } from 'react';
import type { Project } from '../types';
import { View } from '../types';
import { SuiIcon } from './icons';

interface ProjectCardProps {
    project: Project;
    viewType: View;
}

const ProgressBar: React.FC<{ progress: number; isArtistView: boolean }> = ({ progress, isArtistView }) => {
    const barColor = isArtistView ? 'bg-indigo-400' : 'bg-blue-500';
    const bgColor = isArtistView ? 'bg-gray-600' : 'bg-gray-200';

    return (
        <div>
            <div className="flex justify-between items-center mb-1">
        <span className={`text-sm font-medium ${isArtistView ? 'text-gray-300' : 'text-gray-600'}`}>
          {isArtistView ? 'Progress' : 'Funding'}
        </span>
                <span className={`text-sm font-bold ${isArtistView ? 'text-indigo-300' : 'text-blue-600'}`}>
          {progress}%
        </span>
            </div>
            <div className={`w-full ${bgColor} rounded-full h-2.5`}>
                <div className={`${barColor} h-2.5 rounded-full`} style={{ width: `${progress}%` }}></div>
            </div>
        </div>
    );
};


const ProjectCard: React.FC<ProjectCardProps> = ({ project, viewType }) => {
    const isArtistView = viewType === View.Artist;
    const [suiAmount, setSuiAmount] = useState('1');

    const cardClass = isArtistView
        ? 'bg-gray-800 border border-gray-700 hover:border-indigo-500'
        : 'bg-gray-800 border border-gray-200 hover:border-blue-400 hover:shadow-xl';

    const handleBuy = () => {
        if (!suiAmount || isNaN(amount) || amount <= 0) {
            return;
        }
    };

    return (
            <div
                className={`rounded-xl overflow-hidden shadow-lg transition-all duration-300 transform hover:-translate-y-1 ${cardClass} flex flex-col`}
            >
                <img className="w-full h-56 object-cover" src={project.imageUrl} alt={project.title} />
                <div className="p-6 flex flex-col flex-grow">
                    <h3 className="font-bold text-xl mb-2 tracking-tight">{project.title}</h3>
                    <p className={`text-base mb-4 flex-grow ${isArtistView ? 'text-gray-400' : 'text-gray-600'}`}>
                        {project.description}
                    </p>
                    <div className="mt-auto">
                        <ProgressBar progress={project.progress} isArtistView={isArtistView} />
                        {!isArtistView && (
                            <div className="mt-6">
                                <label htmlFor={`sui-amount-${project.id}`} className="block text-sm font-medium text-white mb-2">
                                    Buy with SUI
                                </label>
                                <div className="flex items-center space-x-2">
                                    <div className="relative flex-grow">
                                        <div className="pointer-events-none absolute inset-y-0 left-0 pl-3 flex items-center">
                                            <SuiIcon className="h-5 w-5 text-blue-500" />
                                        </div>
                                        <input
                                            type="number"
                                            id={`sui-amount-${project.id}`}
                                            name={`sui-amount-${project.id}`}
                                            value={suiAmount}
                                            onChange={(e) => setSuiAmount(e.target.value)}
                                            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 text-black"
                                            placeholder="e.g., 10"
                                            min="0.1"
                                            step="0.1"
                                            aria-label={`SUI amount for ${project.title}`}
                                        />
                                    </div>
                                    <button
                                        onClick={handleBuy}
                                    >
                                    </button>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
    );
};

export default ProjectCard;