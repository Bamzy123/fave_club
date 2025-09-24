import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { useAuth } from './AuthContext';

interface Project {
  id: string;
  artistId: string;
  song: string;
  distributor: string;
  percentForSale: number;
  genre: string;
  description: string;
  releaseDate: string;
  status: 'draft' | 'pending' | 'active';
  createdAt: string;
}

interface Token {
  id: string;
  projectId: string;
  artistId: string;
  artistName: string;
  song: string;
  percent: number;
  price: number;
  value: number;
  change: number;
  purchasedAt: string;
}

// Define the project data that artists provide when creating a project
interface ProjectFormData {
  song: string;
  distributor: string;
  percentForSale: number;
  genre: string;
  description: string;
  releaseDate: string;
}

interface MarketContextType {
  projects: Project[];
  tokens: Token[];
  addProject: (projectData: ProjectFormData) => void;
  purchaseToken: (projectId: string) => void;
  getUserProjects: (artistId: string) => Project[];
  getUserTokens: (userId: string) => Token[];
}

const MarketContext = createContext<MarketContextType | undefined>(undefined);

export const MarketProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const { user } = useAuth();
  const [projects, setProjects] = useState<Project[]>(() => {
    const savedProjects = localStorage.getItem('marketplace_projects');
    return savedProjects ? JSON.parse(savedProjects) : [];
  });
  
  const [tokens, setTokens] = useState<Token[]>(() => {
    const savedTokens = localStorage.getItem('user_tokens');
    return savedTokens ? JSON.parse(savedTokens) : [];
  });

  // Save to localStorage whenever projects or tokens change
  useEffect(() => {
    localStorage.setItem('marketplace_projects', JSON.stringify(projects));
  }, [projects]);

  useEffect(() => {
    localStorage.setItem('user_tokens', JSON.stringify(tokens));
  }, [tokens]);

  const addProject = (projectData: ProjectFormData) => {
    if (!user) return;
    
    const newProject: Project = {
      ...projectData,
      id: Math.random().toString(36).substr(2, 9),
      artistId: user.id,
      status: 'pending',
      createdAt: new Date().toISOString()
    };
    
    setProjects(prev => [...prev, newProject]);
  };

  const purchaseToken = (projectId: string) => {
    if (!user) return;
    
    const project = projects.find(p => p.id === projectId);
    if (!project) return;
    
    // In a real app, this would involve payment processing
    // For now, we'll just add the token to the user's collection
    
    const newToken: Token = {
      id: Math.random().toString(36).substr(2, 9),
      projectId: project.id,
      artistId: project.artistId,
      artistName: user.name || 'Unknown Artist',
      song: project.song,
      percent: project.percentForSale,
      price: project.percentForSale * 50, // Simplified pricing model
      value: project.percentForSale * 60, // Current value
      change: 20, // Simplified change percentage
      purchasedAt: new Date().toISOString()
    };
    
    setTokens(prev => [...prev, newToken]);
  };

  const getUserProjects = (artistId: string) => {
    return projects.filter(project => project.artistId === artistId);
  };

  const getUserTokens = (userId: string) => {
    // In a real app, this would be based on userId
    // For now, we return all tokens since we don't have a real backend
    return tokens;
  };

  return (
    <MarketContext.Provider value={{
      projects,
      tokens,
      addProject,
      purchaseToken,
      getUserProjects,
      getUserTokens
    }}>
      {children}
    </MarketContext.Provider>
  );
};

export const useMarket = () => {
  const context = useContext(MarketContext);
  if (context === undefined) {
    throw new Error('useMarket must be used within a MarketProvider');
  }
  return context;
};