import React, { useState } from 'react';
import { generateSpeech } from '../services/geminiTTS';

const voices = ['Kore', 'Puck', 'Zephyr', 'Charon', 'Fenrir'];

const VoicePage: React.FC = () => {
    const [prompt, setPrompt] = useState('');
    const [selectedVoice, setSelectedVoice] = useState(voices[0]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [audioSrc, setAudioSrc] = useState<string | null>(null);

    const handleGenerate = async () => {
        if (!prompt.trim()) {
            setError('Please enter some text to generate audio.');
            return;
        }
        setIsLoading(true);
        setError(null);
        setAudioSrc(null);

        try {
            const audioData = await generateSpeech(prompt, selectedVoice);
            setAudioSrc(`data:audio/mpeg;base64,${audioData}`);
        } catch (err) {
            setError(err instanceof Error ? err.message : 'An unknown error occurred.');
        } finally {
            setIsLoading(false);
        }
    };
    
    return (
        <div className="bg-[#0d1b2a] text-text-light min-h-screen p-4 sm:p-8">
            <header className="mb-12">
                <h1 className="text-5xl font-extrabold mb-2">Voice Generation</h1>
                <p className="text-lg text-gray-400">Transform text into natural-sounding speech.</p>
            </header>

            <div className="max-w-2xl mx-auto bg-[#1b263b] p-8 rounded-2xl shadow-lg">
                <div className="mb-6">
                    <label htmlFor="prompt" className="block text-lg font-semibold mb-2">Your Text</label>
                    <textarea
                        id="prompt"
                        value={prompt}
                        onChange={(e) => setPrompt(e.target.value)}
                        className="w-full h-40 p-4 rounded-lg bg-[#0d1b2a] text-text-light border-2 border-transparent focus:border-accent focus:outline-none transition-colors"
                        placeholder="Enter text here..."
                    />
                </div>

                <div className="mb-8">
                    <label htmlFor="voice" className="block text-lg font-semibold mb-2">Choose a Voice</label>
                    <select
                        id="voice"
                        value={selectedVoice}
                        onChange={(e) => setSelectedVoice(e.target.value)}
                        className="w-full p-3 rounded-lg bg-[#0d1b2a] text-text-light border-2 border-transparent focus:border-accent focus:outline-none transition-colors"
                    >
                        {voices.map(voice => <option key={voice} value={voice}>{voice}</option>)}
                    </select>
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
                            <i className="fas fa-magic"></i>
                            Generate Speech
                        </>
                    )}
                </button>

                {error && <p className="text-red-400 mt-4 text-center">{error}</p>}
                
                {audioSrc && (
                    <div className="mt-8">
                        <h3 className="text-xl font-semibold mb-4 text-center">Result</h3>
                        <audio controls src={audioSrc} className="w-full">
                            Your browser does not support the audio element.
                        </audio>
                    </div>
                )}
            </div>
        </div>
    );
};

export default VoicePage;
