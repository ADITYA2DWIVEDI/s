import React from 'react';
import { Link } from 'react-router-dom';

const ToolCard: React.FC<{ title: string; icon: string }> = ({ title, icon }) => (
    <div className="group bg-[#1b263b] p-8 rounded-2xl text-center cursor-pointer transition-all duration-300 hover:transform hover:-translate-y-2 hover:shadow-2xl hover:shadow-accent/20 h-full flex flex-col justify-center">
        <i className={`fas ${icon} text-5xl text-accent mb-6 transition-transform duration-300 group-hover:scale-110`}></i>
        <h3 className="text-2xl font-bold text-text-light">{title}</h3>
    </div>
);

const AIStudio: React.FC = () => {
  return (
    <div className="bg-[#0d1b2a] text-text-light min-h-screen p-4 sm:p-8">
      <header className="mb-12">
        <h1 className="text-5xl font-extrabold mb-2">AI Studio</h1>
        <p className="text-lg text-gray-400">Create and innovate with advanced AI tools.</p>
      </header>
      <section className="ai-tools grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        <Link to="/voice" className="no-underline">
          <ToolCard title="Voice Generation" icon="fa-microphone-alt" />
        </Link>
        <Link to="/image" className="no-underline">
          <ToolCard title="Image Creation" icon="fa-image" />
        </Link>
        <Link to="/video" className="no-underline">
          <ToolCard title="Video Editing" icon="fa-video" />
        </Link>
      </section>
    </div>
  );
};

export default AIStudio;