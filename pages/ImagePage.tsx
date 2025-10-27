import React, { useState } from 'react';
import { generateImage } from '../services/geminiImage';

const ImagePage: React.FC = () => {
    const [prompt, setPrompt] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [imageSrc, setImageSrc] = useState<string | null>(null);

    const handleGenerate = async () => {
        if (!prompt.trim()) {
            setError('Please enter a prompt to generate an image.');
            return;
        }
        setIsLoading(true);
        setError(null);
        setImageSrc(null);

        try {
            const imageData = await generateImage(prompt);
            setImageSrc(`data:image/jpeg;base64,${imageData}`);
        } catch (err) {
            setError(err instanceof Error ? err.message : 'An unknown error occurred.');
        } finally {
            setIsLoading(false);
        }
    };
    
    return (
        <div className="bg-[#0d1b2a] text-text-light min-h-screen p-4 sm:p-8">
            <header className="mb-12">
                <h1 className="text-5xl font-extrabold mb-2">Image Creation</h1>
                <p className="text-lg text-gray-400">Bring your ideas to life with AI-powered image generation.</p>
            </header>

            <div className="max-w-2xl mx-auto bg-[#1b263b] p-8 rounded-2xl shadow-lg">
                <div className="mb-6">
                    <label htmlFor="prompt" className="block text-lg font-semibold mb-2">Your Prompt</label>
                    <input
                        id="prompt"
                        type="text"
                        value={prompt}
                        onChange={(e) => setPrompt(e.target.value)}
                        className="w-full p-4 rounded-lg bg-[#0d1b2a] text-text-light border-2 border-transparent focus:border-accent focus:outline-none transition-colors"
                        placeholder="e.g., A robot holding a red skateboard"
                    />
                </div>
                
                <button
                    onClick={handleGenerate}
                    disabled={isLoading}
                    className="w-full bg-accent text-white font-bold py-3 px-6 rounded-lg shadow-md hover:bg-opacity-80 transition-all duration-300 disabled:bg-gray-500 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                >
                    {isLoading ? (
                        <>
                            <i className="fas fa-spinner fa-spin"></i>
                            Generating...
                        </>
                    ) : (
                        <>
                            <i className="fas fa-image"></i>
                            Generate Image
                        </>
                    )}
                </button>

                {error && <p className="text-red-400 mt-4 text-center">{error}</p>}
                
                <div className="mt-8">
                    {isLoading && (
                        <div className="text-center">
                            <i className="fas fa-cog fa-spin text-4xl text-accent"></i>
                            <p className="mt-2">The AI is painting your masterpiece...</p>
                        </div>
                    )}
                    {imageSrc && (
                        <div>
                            <h3 className="text-xl font-semibold mb-4 text-center">Result</h3>
                            <img src={imageSrc} alt={prompt} className="w-full h-auto rounded-lg shadow-lg" />
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default ImagePage;
