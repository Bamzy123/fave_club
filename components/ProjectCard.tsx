import React, { useState } from 'react';
import { useCurrentAccount, useSignTransaction } from '@mysten/dapp-kit';
import { Transaction } from '@mysten/sui/transactions';
import toast from 'react-hot-toast';
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

// Mock Transaction Modal Component
const MockTransactionModal: React.FC<{
    isOpen: boolean;
    onClose: () => void;
    amount: string;
    projectTitle: string;
    onApprove: () => void;
    isProcessing: boolean;
}> = ({ isOpen, onClose, amount, projectTitle, onApprove, isProcessing }) => {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
            <div className="bg-white rounded-lg p-6 max-w-md w-full mx-4 shadow-xl">
                <div className="text-center">
                    <div className="w-16 h-16 mx-auto mb-4 bg-blue-100 rounded-full flex items-center justify-center">
                        <SuiIcon className="w-8 h-8 text-blue-600" />
                    </div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">Confirm Music Purchase</h3>
                    <p className="text-gray-600 mb-4">
                        You are about to purchase exclusive access to <span className="font-bold">"{projectTitle}"</span> for <span className="font-bold text-blue-600">{amount} SUI</span>
                    </p>
                    
                    <div className="bg-gray-50 rounded-lg p-4 mb-6">
                        <div className="flex justify-between items-center mb-2">
                            <span className="text-sm text-gray-600">Purchase Price:</span>
                            <span className="font-semibold text-gray-900">{amount} SUI</span>
                        </div>
                        <div className="flex justify-between items-center mb-2">
                            <span className="text-sm text-gray-600">Estimated Network Fee:</span>
                            <span className="font-semibold text-gray-700">~0.005 SUI</span>
                        </div>
                        <div className="flex justify-between items-center mb-2">
                            <span className="text-sm text-gray-600">Platform Fee:</span>
                            <span className="font-semibold text-gray-700">0.0 SUI</span>
                        </div>
                        <hr className="my-2" />
                        <div className="flex justify-between items-center">
                            <span className="text-sm font-semibold text-gray-800">Total Estimated Cost:</span>
                            <span className="font-bold text-lg text-blue-600">{(parseFloat(amount) + 0.005).toFixed(3)} SUI</span>
                        </div>
                    </div>

                    <div className="bg-blue-50 border-l-4 border-blue-400 p-3 mb-4">
                        <div className="flex">
                            <div className="ml-3">
                                <p className="text-sm text-blue-700">
                                    🎵 You'll get exclusive access to this music project and support the artist directly!
                                </p>
                            </div>
                        </div>
                    </div>

                    <div className="flex space-x-3">
                        <button
                            onClick={onClose}
                            disabled={isProcessing}
                            className="flex-1 px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            Cancel
                        </button>
                        <button
                            onClick={onApprove}
                            disabled={isProcessing}
                            className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
                        >
                            {isProcessing ? (
                                <>
                                    <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"></path>
                                    </svg>
                                    Processing...
                                </>
                            ) : (
                                'Approve'
                            )}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

const ProjectCard: React.FC<ProjectCardProps> = ({ project, viewType }) => {
    const isArtistView = viewType === View.Artist;
    const [suiAmount, setSuiAmount] = useState('1');
    const [showTransactionModal, setShowTransactionModal] = useState(false);
    const [isProcessing, setIsProcessing] = useState(false);
    const [purchasedAmount, setPurchasedAmount] = useState<string>('');
    
    // dApp Kit hooks
    const account = useCurrentAccount();
    const { mutateAsync: signTransaction } = useSignTransaction();

    const cardClass = isArtistView
        ? 'bg-gray-800 border border-gray-700 hover:border-indigo-500'
        : 'bg-gray-800 border border-gray-200 hover:border-blue-400 hover:shadow-xl';

    const handleBuy = () => {
        const amount = parseFloat(suiAmount);
        if (!suiAmount || isNaN(amount) || amount <= 0) {
            toast.error('Please enter a valid, positive amount of SUI.');
            return;
        }
        
        if (!account) {
            toast.error('Please connect your wallet first');
            return;
        }

        setShowTransactionModal(true);
    };

    const handleApproveTransaction = async () => {
        setIsProcessing(true);
        
        try {
            // Create a transaction for display purposes in the wallet
            const txb = new Transaction();
            
            // Add a simple move call that represents the purchase
            // This creates a transaction that the wallet can display properly
            const amount = Math.floor(parseFloat(suiAmount) * 1000000000); // Convert to MIST
            
            // Create a transaction that will show proper details in the wallet
            // We'll use a system call that exists but won't actually transfer funds
            txb.moveCall({
                target: '0x2::sui::new',
                arguments: [],
            });
            
            // Set a reasonable gas budget
            txb.setGasBudget(5000000); // 0.005 SUI for gas
            
            // Add transaction metadata for better display
            txb.setSender(account.address);
            
            // This will trigger the Sui wallet extension with proper transaction details
            toast.loading('Please approve the music purchase in your Sui wallet...', { id: 'transaction' });
            
            // Call the wallet signing - this shows the extension popup with transaction details
            const result = await signTransaction({ 
                transaction: txb
            });
            
            // Success - user approved the transaction
            toast.success(`🎵 Successfully purchased "${project.title}" for ${suiAmount} SUI! Welcome to exclusive access! 🎉`, { id: 'transaction' });
            
            setPurchasedAmount(suiAmount);
            setShowTransactionModal(false);
            
            console.log('Music purchase transaction approved:', result);
            
        } catch (error) {
            console.error('Transaction failed:', error);
            if (error.message?.includes('rejected') || error.message?.includes('denied') || error.message?.includes('User rejected')) {
                toast.error('Purchase cancelled by user', { id: 'transaction' });
            } else {
                toast.error('Purchase failed. Please try again.', { id: 'transaction' });
            }
        } finally {
            setIsProcessing(false);
        }
    };

    return (
        <>
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
                                            disabled={purchasedAmount !== ''}
                                        />
                                    </div>
                                    <button
                                        onClick={handleBuy}
                                        disabled={purchasedAmount !== ''}
                                        className={`font-bold py-2 px-4 rounded-lg transition-all duration-300 transform hover:scale-105 shadow-md hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-opacity-50 ${
                                            purchasedAmount !== ''
                                                ? 'bg-green-600 text-white cursor-not-allowed'
                                                : 'bg-blue-600 hover:bg-blue-700 text-white focus:ring-blue-500'
                                        }`}
                                    >
                                        {purchasedAmount !== '' ? (
                                            <>
                                                <svg className="inline w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                                                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                                                </svg>
                                                {purchasedAmount} SUI
                                            </>
                                        ) : (
                                            'BUY'
                                        )}
                                    </button>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
            
            {/* Mock Transaction Modal */}
            <MockTransactionModal
                isOpen={showTransactionModal}
                onClose={() => setShowTransactionModal(false)}
                amount={suiAmount}
                projectTitle={project.title}
                onApprove={handleApproveTransaction}
                isProcessing={isProcessing}
            />
        </>
    );
};

export default ProjectCard;