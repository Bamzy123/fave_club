import React, { useState, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { useMarket } from '../contexts/MarketContext';

interface ProjectFormData {
  song: string;
  distributor: string;
  percentForSale: number;
  genre: string;
  description: string;
  releaseDate: string;
}

// Demo user data for when there's no authentication
const demoArtistUser = {
  id: 'demo-artist-123',
  name: 'Demo Artist',
  email: 'demo@artist.com',
  role: 'artist' as const,
  profileCompleted: true,
  verified: false
};

const ArtistDashboard: React.FC = () => {
  const { user, logout } = useAuth();
  const { addProject, getUserProjects } = useMarket();
  const [activeTab, setActiveTab] = useState<'verification' | 'projects'>('verification');
  const [newProject, setNewProject] = useState<ProjectFormData>({
    song: '',
    distributor: '',
    percentForSale: 5,
    genre: '',
    description: '',
    releaseDate: ''
  });
  const [isVerified, setIsVerified] = useState(user?.verified || false);
  
  // Use demo user if no authenticated user
  const currentUser = user || demoArtistUser;
  
  // Get user's projects
  const userProjects = getUserProjects(currentUser.id);

  // Update verification status when user changes
  useEffect(() => {
    setIsVerified(currentUser.verified || false);
  }, [currentUser]);

  const handleLogout = () => {
    if (logout) {
      logout();
      window.location.href = '/';
    } else {
      // For demo mode, just redirect to home
      window.location.href = '/';
    }
  };

  const handleVerifyArtist = () => {
    // In a real app, this would call an API
    setIsVerified(true);
    // Update user in context if authenticated
    if (user && logout) {
      const updatedUser = { ...user, verified: true };
      localStorage.setItem('user', JSON.stringify(updatedUser));
    }
  };

  const handleProjectChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setNewProject(prev => ({
      ...prev,
      [name]: name === 'percentForSale' ? Number(value) : value
    }));
  };

  const handleCreateProject = (e: React.FormEvent) => {
    e.preventDefault();
    addProject(newProject);
    setNewProject({
      song: '',
      distributor: '',
      percentForSale: 5,
      genre: '',
      description: '',
      releaseDate: ''
    });
  };

  return (
    <div className="min-h-screen bg-brand-dark text-white">
      {/* Header */}
      <header className="bg-zinc-900 border-b border-zinc-800">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-brand-pink rounded-full flex items-center justify-center">
              <span className="font-bold text-brand-dark text-xl">A</span>
            </div>
            <h1 className="text-2xl font-bold">Artist Dashboard</h1>
          </div>
          <div className="flex items-center space-x-4">
            <span className="text-gray-300">Hello, {currentUser.name}</span>
            <button 
              onClick={handleLogout}
              className="bg-brand-pink hover:bg-pink-600 text-white font-bold py-2 px-4 rounded-full transition-colors"
            >
              {user ? 'Logout' : 'Exit Demo'}
            </button>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        <div className="flex border-b border-zinc-800 mb-8">
          <button
            className={`py-4 px-6 font-medium ${activeTab === 'verification' ? 'border-b-2 border-brand-pink text-white' : 'text-gray-400 hover:text-white'}`}
            onClick={() => setActiveTab('verification')}
          >
            Verification
          </button>
          <button
            className={`py-4 px-6 font-medium ${activeTab === 'projects' ? 'border-b-2 border-brand-pink text-white' : 'text-gray-400 hover:text-white'}`}
            onClick={() => setActiveTab('projects')}
          >
            My Projects
          </button>
        </div>

        {activeTab === 'verification' && (
          <div className="bg-zinc-900 rounded-2xl p-8 mb-8">
            <h2 className="text-3xl font-bold mb-6">Artist Verification</h2>
            
            {isVerified ? (
              <div className="text-center py-12">
                <div className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <h3 className="text-2xl font-bold mb-2">Verified Artist</h3>
                <p className="text-gray-400 mb-6">Your artist account has been successfully verified!</p>
                <button
                  onClick={() => setActiveTab('projects')}
                  className="bg-brand-pink hover:bg-pink-600 text-white font-bold py-3 px-6 rounded-full transition-colors"
                >
                  Create Your First Project
                </button>
              </div>
            ) : (
              <div className="max-w-2xl">
                <p className="text-gray-400 mb-6">
                  To list your music projects and sell royalty tokens, you need to verify your artist identity.
                </p>
                
                <div className="space-y-6">
                  <div>
                    <label className="block text-lg font-medium mb-2">Artist Name</label>
                    <input
                      type="text"
                      className="w-full bg-zinc-800 border border-zinc-700 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-brand-pink"
                      placeholder="Enter your artist name"
                      value={currentUser.name}
                      readOnly
                    />
                  </div>
                  
                  <div>
                    <label className="block text-lg font-medium mb-2">Verification Documents</label>
                    <div className="border-2 border-dashed border-zinc-700 rounded-lg p-8 text-center">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 mx-auto text-gray-500 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                      </svg>
                      <p className="text-gray-400 mb-2">Drag and drop files here</p>
                      <p className="text-sm text-gray-500">or</p>
                      <button className="mt-2 text-brand-pink hover:text-pink-400 font-medium">
                        Browse files
                      </button>
                    </div>
                    <p className="text-sm text-gray-500 mt-2">Upload ID, proof of artist registration, or other verification documents</p>
                  </div>
                  
                  <div className="flex items-center">
                    <input
                      id="terms"
                      type="checkbox"
                      className="w-4 h-4 text-brand-pink bg-zinc-800 border-zinc-700 rounded focus:ring-brand-pink"
                    />
                    <label htmlFor="terms" className="ml-2 text-gray-400">
                      I agree to the <a href="#" className="text-brand-pink hover:text-pink-400">Terms of Service</a> and <a href="#" className="text-brand-pink hover:text-pink-400">Privacy Policy</a>
                    </label>
                  </div>
                  
                  <button
                    onClick={handleVerifyArtist}
                    className="w-full bg-brand-pink hover:bg-pink-600 text-white font-bold py-4 px-6 rounded-full transition-colors"
                  >
                    Submit for Verification
                  </button>
                </div>
              </div>
            )}
          </div>
        )}

        {activeTab === 'projects' && (
          <div>
            {!isVerified ? (
              <div className="bg-zinc-900 rounded-2xl p-8 text-center">
                <h3 className="text-2xl font-bold mb-4">Verification Required</h3>
                <p className="text-gray-400 mb-6">You need to verify your artist identity before creating projects.</p>
                <button
                  onClick={() => setActiveTab('verification')}
                  className="bg-brand-pink hover:bg-pink-600 text-white font-bold py-3 px-6 rounded-full transition-colors"
                >
                  Go to Verification
                </button>
              </div>
            ) : (
              <>
                <div className="bg-zinc-900 rounded-2xl p-8 mb-8">
                  <h2 className="text-3xl font-bold mb-6">Create New Project</h2>
                  
                  <form onSubmit={handleCreateProject} className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-lg font-medium mb-2">Song Name</label>
                        <input
                          type="text"
                          name="song"
                          value={newProject.song}
                          onChange={handleProjectChange}
                          className="w-full bg-zinc-800 border border-zinc-700 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-brand-pink"
                          placeholder="Enter song name"
                          required
                        />
                      </div>
                      
                      <div>
                        <label className="block text-lg font-medium mb-2">Distributor</label>
                        <input
                          type="text"
                          name="distributor"
                          value={newProject.distributor}
                          onChange={handleProjectChange}
                          className="w-full bg-zinc-800 border border-zinc-700 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-brand-pink"
                          placeholder="Enter distributor name"
                          required
                        />
                      </div>
                      
                      <div>
                        <label className="block text-lg font-medium mb-2">Percent for Sale</label>
                        <div className="relative">
                          <input
                            type="range"
                            name="percentForSale"
                            min="1"
                            max="100"
                            value={newProject.percentForSale}
                            onChange={handleProjectChange}
                            className="w-full h-2 bg-zinc-700 rounded-lg appearance-none cursor-pointer"
                          />
                          <span className="absolute right-0 top-0 bg-brand-pink text-white text-sm font-bold py-1 px-2 rounded">
                            {newProject.percentForSale}%
                          </span>
                        </div>
                        <p className="text-sm text-gray-500 mt-1">Percentage of royalties to sell as tokens</p>
                      </div>
                      
                      <div>
                        <label className="block text-lg font-medium mb-2">Genre</label>
                        <select
                          name="genre"
                          value={newProject.genre}
                          onChange={handleProjectChange}
                          className="w-full bg-zinc-800 border border-zinc-700 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-brand-pink"
                          required
                        >
                          <option value="">Select a genre</option>
                          <option value="Afrobeats">Afrobeats</option>
                          <option value="Hip Hop">Hip Hop</option>
                          <option value="Pop">Pop</option>
                          <option value="R&B">R&B</option>
                          <option value="Rock">Rock</option>
                          <option value="Jazz">Jazz</option>
                          <option value="Electronic">Electronic</option>
                        </select>
                      </div>
                      
                      <div>
                        <label className="block text-lg font-medium mb-2">Release Date</label>
                        <input
                          type="date"
                          name="releaseDate"
                          value={newProject.releaseDate}
                          onChange={handleProjectChange}
                          className="w-full bg-zinc-800 border border-zinc-700 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-brand-pink"
                          required
                        />
                      </div>
                    </div>
                    
                    <div>
                      <label className="block text-lg font-medium mb-2">Description</label>
                      <textarea
                        name="description"
                        value={newProject.description}
                        onChange={handleProjectChange}
                        rows={4}
                        className="w-full bg-zinc-800 border border-zinc-700 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-brand-pink"
                        placeholder="Describe your project and what fans will get..."
                        required
                      ></textarea>
                    </div>
                    
                    <button
                      type="submit"
                      className="bg-brand-pink hover:bg-pink-600 text-white font-bold py-4 px-6 rounded-full transition-colors"
                    >
                      Create Project
                    </button>
                  </form>
                </div>
                
                {userProjects.length > 0 && (
                  <div className="bg-zinc-900 rounded-2xl p-8">
                    <h2 className="text-3xl font-bold mb-6">My Projects</h2>
                    
                    <div className="overflow-x-auto">
                      <table className="w-full">
                        <thead>
                          <tr className="border-b border-zinc-800">
                            <th className="py-3 text-left">Song</th>
                            <th className="py-3 text-left">Distributor</th>
                            <th className="py-3 text-left">Percent</th>
                            <th className="py-3 text-left">Status</th>
                            <th className="py-3 text-left">Fans</th>
                          </tr>
                        </thead>
                        <tbody>
                          {userProjects.map((project) => (
                            <tr key={project.id} className="border-b border-zinc-800">
                              <td className="py-4">
                                <div className="font-medium">{project.song}</div>
                                <div className="text-sm text-gray-500">{project.genre}</div>
                              </td>
                              <td className="py-4">{project.distributor}</td>
                              <td className="py-4">{project.percentForSale}%</td>
                              <td className="py-4">
                                <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                                  project.status === 'active' ? 'bg-green-900 text-green-300' :
                                  project.status === 'pending' ? 'bg-yellow-900 text-yellow-300' :
                                  'bg-gray-700 text-gray-300'
                                }`}>
                                  {project.status.charAt(0).toUpperCase() + project.status.slice(1)}
                                </span>
                              </td>
                              <td className="py-4">
                                <div className="flex items-center">
                                  <div className="w-8 h-8 rounded-full bg-brand-pink flex items-center justify-center text-xs font-bold mr-2">
                                    0
                                  </div>
                                  <span>Token Holders</span>
                                </div>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                )}
              </>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default ArtistDashboard;