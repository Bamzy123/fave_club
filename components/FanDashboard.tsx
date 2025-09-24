import React, { useState, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { useMarket } from '../contexts/MarketContext';

// Demo user data for when there's no authentication
const demoFanUser = {
  id: 'demo-fan-456',
  name: 'Demo Fan',
  email: 'demo@fan.com',
  role: 'fan' as const,
  profileCompleted: true
};

const FanDashboard: React.FC = () => {
  const { user, logout } = useAuth();
  const { projects, tokens, purchaseToken, getUserTokens } = useMarket();
  const [activeTab, setActiveTab] = useState<'marketplace' | 'portfolio'>('marketplace');
  const [searchTerm, setSearchTerm] = useState('');

  // Use demo user if no authenticated user
  const currentUser = user || demoFanUser;
  
  // Get user's purchased tokens
  const userTokens = getUserTokens(currentUser.id);

  // Filter available projects based on search term
  const filteredProjects = projects.filter(project => 
    project.artistId.toLowerCase().includes(searchTerm.toLowerCase()) ||
    project.song.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleLogout = () => {
    if (logout) {
      logout();
      window.location.href = '/';
    } else {
      // For demo mode, just redirect to home
      window.location.href = '/';
    }
  };

  const handleBuyToken = (projectId: string) => {
    // In a real app, this would process the purchase
    purchaseToken(projectId);
    alert(`Successfully purchased token for project ${projectId}`);
  };

  return (
    <div className="min-h-screen bg-brand-dark text-white">
      {/* Header */}
      <header className="bg-zinc-900 border-b border-zinc-800">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-brand-yellow rounded-full flex items-center justify-center">
              <span className="font-bold text-brand-dark text-xl">F</span>
            </div>
            <h1 className="text-2xl font-bold">Fan Dashboard</h1>
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
            className={`py-4 px-6 font-medium ${activeTab === 'marketplace' ? 'border-b-2 border-brand-yellow text-white' : 'text-gray-400 hover:text-white'}`}
            onClick={() => setActiveTab('marketplace')}
          >
            Token Marketplace
          </button>
          <button
            className={`py-4 px-6 font-medium ${activeTab === 'portfolio' ? 'border-b-2 border-brand-yellow text-white' : 'text-gray-400 hover:text-white'}`}
            onClick={() => setActiveTab('portfolio')}
          >
            My Portfolio
          </button>
        </div>

        {activeTab === 'marketplace' && (
          <div>
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
              <div>
                <h2 className="text-3xl font-bold">Available Tokens</h2>
                <p className="text-gray-400 mt-2">Invest in your favorite artists and earn as their music grows</p>
              </div>
              <div className="relative w-full md:w-64">
                <input
                  type="text"
                  placeholder="Search artists or songs..."
                  className="w-full bg-zinc-900 border border-zinc-700 rounded-lg pl-10 pr-4 py-2 focus:outline-none focus:ring-2 focus:ring-brand-yellow"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 absolute left-3 top-2.5 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredProjects.map((project) => (
                <div key={project.id} className="bg-zinc-900 rounded-2xl overflow-hidden border border-zinc-800 hover:border-zinc-700 transition-colors">
                  <div className="p-6">
                    <div className="flex justify-between items-start mb-4">
                      <div>
                        <h3 className="text-xl font-bold">{project.song}</h3>
                        <p className="text-brand-yellow">Artist ID: {project.artistId.substring(0, 8)}...</p>
                      </div>
                      <div className="bg-zinc-800 rounded-lg px-3 py-1">
                        <span className="font-bold">{project.percentForSale}%</span>
                        <span className="text-gray-500 text-sm"> royalty</span>
                      </div>
                    </div>
                    
                    <div className="flex justify-between items-center mb-6">
                      <div>
                        <p className="text-gray-500 text-sm">Current Value</p>
                        <p className="text-2xl font-bold">${project.percentForSale * 60}</p>
                      </div>
                      <div className="text-green-500 flex items-center">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" />
                        </svg>
                        <span className="ml-1 font-medium">20%</span>
                      </div>
                    </div>
                    
                    <div className="flex justify-between items-center mb-6">
                      <div>
                        <p className="text-gray-500 text-sm">Buy Price</p>
                        <p className="text-lg font-bold">${project.percentForSale * 50}</p>
                      </div>
                      <button 
                        onClick={() => handleBuyToken(project.id)}
                        className="bg-brand-yellow hover:bg-yellow-500 text-brand-dark font-bold py-2 px-4 rounded-full transition-colors"
                      >
                        Buy Token
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'portfolio' && (
          <div>
            <div className="mb-8">
              <h2 className="text-3xl font-bold">My Token Portfolio</h2>
              <p className="text-gray-400 mt-2">Track your investments and earnings</p>
            </div>

            {userTokens.length === 0 ? (
              <div className="bg-zinc-900 rounded-2xl p-12 text-center">
                <div className="w-16 h-16 bg-zinc-800 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h3 className="text-2xl font-bold mb-2">No Tokens Yet</h3>
                <p className="text-gray-400 mb-6">Start building your portfolio by buying artist royalty tokens</p>
                <button
                  onClick={() => setActiveTab('marketplace')}
                  className="bg-brand-yellow hover:bg-yellow-500 text-brand-dark font-bold py-3 px-6 rounded-full transition-colors"
                >
                  Browse Marketplace
                </button>
              </div>
            ) : (
              <div className="bg-zinc-900 rounded-2xl overflow-hidden">
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b border-zinc-800">
                        <th className="py-4 px-6 text-left">Token</th>
                        <th className="py-4 px-6 text-left">Percent</th>
                        <th className="py-4 px-6 text-left">Invested</th>
                        <th className="py-4 px-6 text-left">Current Value</th>
                        <th className="py-4 px-6 text-left">Change</th>
                        <th className="py-4 px-6 text-left">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {userTokens.map((token) => (
                        <tr key={token.id} className="border-b border-zinc-800">
                          <td className="py-4 px-6">
                            <div>
                              <div className="font-medium">{token.song}</div>
                              <div className="text-gray-500">{token.artistName}</div>
                            </div>
                          </td>
                          <td className="py-4 px-6">
                            <span className="bg-zinc-800 rounded-lg px-3 py-1">
                              {token.percent}%
                            </span>
                          </td>
                          <td className="py-4 px-6">${token.price}</td>
                          <td className="py-4 px-6">
                            <span className="font-bold">${token.value}</span>
                          </td>
                          <td className="py-4 px-6">
                            <span className="font-medium text-green-500">
                              +{token.change}%
                            </span>
                          </td>
                          <td className="py-4 px-6">
                            <button className="text-brand-yellow hover:text-yellow-400 font-medium mr-3">
                              Sell
                            </button>
                            <button className="text-gray-400 hover:text-white">
                              Details
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default FanDashboard;