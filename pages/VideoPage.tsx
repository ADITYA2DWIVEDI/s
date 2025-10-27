import { GoogleGenAI } from '@google/genai';
import React, { useState, useEffect, useRef } from 'react';
import { generateVideo, getVideosOperation } from '../services/geminiVideo';

declare global {
  interface Window {
    // FIX: Quoted property name to avoid collision with the 'AIStudio' component type.
    'aistudio': {
      hasSelectedApiKey: () => Promise<boolean>;
      openSelectKey: () => Promise<void>;
    };
  }
}

const VideoPage: React.FC = () => {
    const [prompt, setPrompt] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [status, setStatus] = useState<string | null>(null);
    const [videoSrc, setVideoSrc] = useState<string | null>(null);
    const [apiKeySelected, setApiKeySelected] = useState(false);
    const pollInterval = useRef<number | null>(null);

    const checkApiKey = async () => {
        try {
            const hasKey = await window.aistudio.hasSelectedApiKey();
            setApiKeySelected(hasKey);
            return hasKey;
        } catch (e) {
            console.error("aistudio is not available.", e);
            setApiKeySelected(false); // Assume no key if aistudio is not there
            return false;
        }
    };

    useEffect(() => {
        checkApiKey();
        return () => {
            if (pollInterval.current) clearInterval(pollInterval.current);
        };
    }, []);

    const handleSelectKey = async () => {
        try {
            await window.aistudio.openSelectKey();
            // Assume key selection is successful and update state immediately
            setApiKeySelected(true);
        } catch (e) {
            setError("Could not open API key selection dialog.");
        }
    };

    const handleGenerate = async () => {
        if (!prompt.trim()) {
            setError('Please enter a prompt to generate a video.');
            return;
        }
        if (!apiKeySelected) {
            setError('Please select an API key first.');
            return;
        }

        setIsLoading(true);
        setError(null);
        setVideoSrc(null);
        setStatus('Initializing video generation...');

        try {
            // Create a new instance right before the call to ensure the latest key
            const ai = new GoogleGenAI({ apiKey: process.env.API_KEY! });
            let operation = await generateVideo(ai, prompt);
            setStatus('Processing video... this can take a few minutes.');

            pollInterval.current = window.setInterval(async () => {
                try {
                    operation = await getVideosOperation(ai, operation);

                    if (operation.done) {
                        if (pollInterval.current) clearInterval(pollInterval.current);
                        setIsLoading(false);
                        setStatus('Video generation complete!');
                        
                        const downloadLink = operation.response?.generatedVideos?.[0]?.video?.uri;
                        if (downloadLink) {
                            // Append the API key for fetching the video blob
                            const videoUrl = `${downloadLink}&key=${process.env.API_KEY}`;
                            const response = await fetch(videoUrl);
                            if (!response.ok) throw new Error('Failed to fetch video file.');
                            const videoBlob = await response.blob();
                            setVideoSrc(URL.createObjectURL(videoBlob));
                        } else {
                            throw new Error('Video generation finished, but no download link was found.');
                        }
                    } else {
                        // You could add more detailed status updates here if the API provides them
                        setStatus('Still generating... please wait.');
                    }
                } catch (err) {
                    if (pollInterval.current) clearInterval(pollInterval.current);
                    const errorMessage = err instanceof Error ? err.message : 'An unknown error occurred during polling.';
                    setError(errorMessage);
                     if (errorMessage.includes("Requested entity was not found")) {
                        setError("Your API key seems to be invalid. Please select a valid key and try again.");
                        setApiKeySelected(false);
                    }
                    setIsLoading(false);
                    setStatus(null);
                }
            }, 10000); // Poll every 10 seconds

        } catch (err) {
            if (pollInterval.current) clearInterval(pollInterval.current);
            const errorMessage = err instanceof Error ? err.message : 'An unknown error occurred.';
            setError(errorMessage);
            // Handle specific error for invalid API key
            if (errorMessage.includes("Requested entity was not found")) {
                setError("Your API key seems to be invalid. Please select a valid key and try again.");
                setApiKeySelected(false);
            }
            setIsLoading(false);
            setStatus(null);
        }
    };
    
    return (
        <div className="bg-[#0d1b2a] text-text-light min-h-screen p-4 sm:p-8">
            <header className="mb-12">
                <h1 className="text-5xl font-extrabold mb-2">Video Generation</h1>
                <p className="text-lg text-gray-400">Create short video clips from text prompts.</p>
                <a href="https://ai.google.dev/gemini-api/docs/billing" target="_blank" rel="noopener noreferrer" className="text-accent hover:underline text-sm">
                    Note: Video generation may incur billing charges. Learn more.
                </a>
            </header>

            <div className="max-w-2xl mx-auto bg-[#1b263b] p-8 rounded-2xl shadow-lg">
                {!apiKeySelected && (
                    <div className="text-center mb-6 p-4 bg-yellow-900/50 border border-yellow-700 rounded-lg">
                        <p className="mb-4">Video generation requires an API key. Please select one to proceed.</p>
                        <button onClick={handleSelectKey} className="bg-accent text-white font-bold py-2 px-4 rounded-lg">
                            Select API Key
                        </button>
                    </div>
                )}

                <div className="mb-6">
                    <label htmlFor="prompt" className="block text-lg font-semibold mb-2">Your Prompt</label>
                    <input
                        id="prompt"
                        type="text"
                        value={prompt}
                        onChange={(e) => setPrompt(e.target.value)}
                        className="w-full p-4 rounded-lg bg-[#0d1b2a] text-text-light border-2 border-transparent focus:border-accent focus:outline-none transition-colors"
                        placeholder="e.g., A neon hologram of a cat driving at top speed"
                    />
                </div>
                
                <button
                    onClick={handleGenerate}
                    disabled={isLoading || !apiKeySelected}
                    className="w-full bg-accent text-white font-bold py-3 px-6 rounded-lg shadow-md hover:bg-opacity-80 transition-all duration-300 disabled:bg-gray-500 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                >
                    {isLoading ? (
                        <>
                            <i className="fas fa-spinner fa-spin"></i>
                            Generating...
                        </>
                    ) : (
                        <>
                            <i className="fas fa-video"></i>
                            Generate Video
                        </>
                    )}
                </button>

                {error && <p className="text-red-400 mt-4 text-center">{error}</p>}
                
                <div className="mt-8 text-center">
                    {isLoading && (
                        <div>
                            <i className="fas fa-cog fa-spin text-4xl text-accent"></i>
                            <p className="mt-2 text-lg">{status || 'Please wait...'}</p>
                            <p className="text-sm text-gray-400">Video generation can take several minutes.</p>
                        </div>
                    )}
                    {videoSrc && (
                        <div>
                            <h3 className="text-xl font-semibold mb-4 text-center">Result</h3>
                            <video controls src={videoSrc} className="w-full h-auto rounded-lg shadow-lg" />
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default VideoPage;