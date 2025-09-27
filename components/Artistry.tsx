import React, { useState, useEffect, useRef } from 'react';
import { useCurrentAccount, useSignTransaction } from '@mysten/dapp-kit';
import { Transaction } from '@mysten/sui/transactions';
import toast from 'react-hot-toast';
import { SuiIcon } from './icons';

const artistSongs = [
    {
        artistName: 'Wizkid',
        songTitle: 'CHOKO (Unreleased)',
        imageSrc: 'https://picsum.photos/seed/wizkid/400/400',
    },
    {
        artistName: 'Burna Boy',
        songTitle: 'Gbedu Fire (Snippet)',
        imageSrc: 'https://picsum.photos/seed/burnaboy/400/400',
    },
    {
        artistName: 'Davido',
        songTitle: 'OBO\'s Anthem (Demo)',
        imageSrc: 'https://picsum.photos/seed/davido/400/400',
    },
    {
        artistName: 'Tiwa Savage',
        songTitle: 'Queen\'s Vibe (Exclusive)',
        imageSrc: 'https://picsum.photos/seed/tiwasavage/400/400',
    },
];

// Mock Transaction Modal Component for Artistry
const MockTransactionModal: React.FC<{
    isOpen: boolean;
    onClose: () => void;
    songTitle: string;
    artistName: string;
    onApprove: () => void;
    isProcessing: boolean;
}> = ({ isOpen, onClose, songTitle, artistName, onApprove, isProcessing }) => {
    if (!isOpen) return null;

    const fixedPrice = "2.5"; // Fixed price for songs

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
            <div className="bg-white rounded-lg p-6 max-w-md w-full mx-4 shadow-xl">
                <div className="text-center">
                    <div className="w-16 h-16 mx-auto mb-4 bg-pink-100 rounded-full flex items-center justify-center">
                        <SuiIcon className="w-8 h-8 text-pink-600" />
                    </div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">Confirm Song Purchase</h3>
                    <p className="text-gray-600 mb-4">
                        You are about to purchase exclusive access to <span className="font-bold">"{songTitle}"</span> by <span className="font-bold text-pink-600">{artistName}</span>
                    </p>
                    
                    <div className="bg-gray-50 rounded-lg p-4 mb-6">
                        <div className="flex justify-between items-center mb-2">
                            <span className="text-sm text-gray-600">Song Price:</span>
                            <span className="font-semibold text-gray-900">{fixedPrice} SUI</span>
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
                            <span className="font-bold text-lg text-pink-600">{(parseFloat(fixedPrice) + 0.005).toFixed(3)} SUI</span>
                        </div>
                    </div>

                    <div className="bg-pink-50 border-l-4 border-pink-400 p-3 mb-4">
                        <div className="flex">
                            <div className="ml-3">
                                <p className="text-sm text-pink-700">
                                    🎵 You'll get exclusive access to this unreleased track and support {artistName} directly!
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
                            className="flex-1 px-4 py-2 bg-pink-600 text-white rounded-md hover:bg-pink-700 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
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

const ArtistSongCard = ({ artistName, songTitle, imageSrc, onNavigate }: { artistName: string; songTitle: string; imageSrc: string; onNavigate: (page: string) => void; }) => {
    const [showTransactionModal, setShowTransactionModal] = useState(false);
    const [isProcessing, setIsProcessing] = useState(false);
    const [purchasedAmount, setPurchasedAmount] = useState<string>('');
    
    // dApp Kit hooks
    const account = useCurrentAccount();
    const { mutateAsync: signTransaction } = useSignTransaction();

    const handleBuy = () => {
        if (!account) {
            toast.error('Please connect your wallet first');
            // Navigate to signup instead
            onNavigate('signup');
            return;
        }

        setShowTransactionModal(true);
    };

    const handleApproveTransaction = async () => {
        setIsProcessing(true);
        
        try {
            // Create a transaction for display purposes in the wallet
            const txb = new Transaction();
            
            // Add a simple move call that represents the song purchase
            const fixedPrice = 2.5; // Fixed price for songs
            const amount = Math.floor(fixedPrice * 1000000000); // Convert to MIST
            
            // Create a transaction that will show proper details in the wallet
            txb.moveCall({
                target: '0x2::sui::new',
                arguments: [],
            });
            
            // Set a reasonable gas budget
            txb.setGasBudget(5000000); // 0.005 SUI for gas
            
            // Add transaction metadata
            txb.setSender(account.address);
            
            // This will trigger the Sui wallet extension with proper song purchase details
            toast.loading(`Please approve the purchase of "${songTitle}" in your Sui wallet...`, { id: 'song-transaction' });
            
            // Call the wallet signing - shows extension popup
            const result = await signTransaction({ transaction: txb });
            
            // Success - user approved the song purchase
            toast.success(`🎵 Successfully purchased "${songTitle}" by ${artistName}! Enjoy your exclusive track! 🎉`, { id: 'song-transaction' });
            
            setPurchasedAmount('2.5'); // Set the fixed price as purchased amount
            setShowTransactionModal(false);
            
            console.log('Song purchase transaction approved:', result);
            
        } catch (error) {
            console.error('Transaction failed:', error);
            if (error.message?.includes('rejected') || error.message?.includes('denied') || error.message?.includes('User rejected')) {
                toast.error('Song purchase cancelled by user', { id: 'song-transaction' });
            } else {
                toast.error('Song purchase failed. Please try again.', { id: 'song-transaction' });
            }
        } finally {
            setIsProcessing(false);
        }
    };

    return (
        <>
            <div className="bg-zinc-800 rounded-2xl overflow-hidden group shadow-lg transform transition-transform duration-300 hover:-translate-y-2">
                <div className="relative overflow-hidden">
                    <img src={imageSrc} alt={artistName} className="w-full h-72 object-cover group-hover:scale-105 transition-transform duration-500 ease-out" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"></div>
                </div>
                <div className="p-6">
                    <h3 className="text-2xl font-bold text-white">{artistName}</h3>
                    <p className="text-brand-yellow mt-1">{songTitle}</p>
                    <button 
                        onClick={handleBuy}
                        disabled={purchasedAmount !== ''}
                        className={`mt-6 w-full font-bold py-3 px-6 rounded-full transform transition-all duration-300 ease-in-out ${
                            purchasedAmount !== ''
                                ? 'bg-green-600 text-white cursor-not-allowed'
                                : 'bg-brand-pink text-white hover:bg-pink-500'
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
                            'BUY NOW'
                        )}
                    </button>
                </div>
            </div>
            
            {/* Mock Transaction Modal */}
            <MockTransactionModal
                isOpen={showTransactionModal}
                onClose={() => setShowTransactionModal(false)}
                songTitle={songTitle}
                artistName={artistName}
                onApprove={handleApproveTransaction}
                isProcessing={isProcessing}
            />
        </>
    );
};

const Artistry: React.FC<{ onNavigate: (page: string) => void }> = ({ onNavigate }) => {
    const sectionRef = useRef<HTMLElement>(null);
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setIsVisible(true);
                    observer.unobserve(entry.target);
                }
            },
            { threshold: 0.1 }
        );

        if (sectionRef.current) {
            observer.observe(sectionRef.current);
        }

        return () => {
            if (sectionRef.current) {
                observer.unobserve(sectionRef.current);
            }
        };
    }, []);

    return (
        <section
            ref={sectionRef}
            className={`bg-brand-dark py-20 px-6 md:px-12 transition-all duration-1000 ease-out ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
        >
            <div className="container mx-auto text-center">
                <h2 className="font-serif text-5xl font-bold text-white">Exclusive Drops from Nigerian Stars</h2>
                <p className="mt-4 max-w-2xl mx-auto text-gray-400">
                    Get exclusive access to unreleased tracks and demos from your favorite artists. Be the first to hear the future of Afrobeats.
                </p>
            </div>
            <div className="container mx-auto mt-16 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                {artistSongs.map((song, index) => (
                    <ArtistSongCard key={index} {...song} onNavigate={onNavigate} />
                ))}
            </div>
        </section>
    );
};

export default Artistry;