import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Signup: React.FC = () => {
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Simulate signup
    navigate('/');
  };

  return (
    <div className="bg-gradient-to-br from-sidebar-bg to-[#1a2333] min-h-screen flex items-center justify-center p-4 text-text-light">
      <div className="signup-container bg-black/20 backdrop-blur-lg p-10 rounded-2xl shadow-2xl text-center w-full max-w-sm border border-white/10">
        <h1 className="text-4xl font-bold mb-8 text-accent">Sign Up</h1>
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
           <input
            type="text"
            placeholder="Username"
            required
            aria-label="Username"
            className="p-3 border-2 border-transparent rounded-lg bg-white/10 text-text-light placeholder-muted-light focus:outline-none focus:border-accent transition-colors"
          />
          <input
            type="email"
            placeholder="Email"
            required
            aria-label="Email address"
            className="p-3 border-2 border-transparent rounded-lg bg-white/10 text-text-light placeholder-muted-light focus:outline-none focus:border-accent transition-colors"
          />
          <input
            type="password"
            placeholder="Password"
            required
            aria-label="Password"
            className="p-3 border-2 border-transparent rounded-lg bg-white/10 text-text-light placeholder-muted-light focus:outline-none focus:border-accent transition-colors"
          />
          <button
            type="submit"
            className="p-3 mt-4 border-none rounded-lg bg-accent text-sidebar-bg font-bold cursor-pointer transition-transform duration-200 hover:scale-105"
          >
            Create Account
          </button>
          <Link to="/login" className="mt-4 text-accent hover:underline">Already have an account?</Link>
        </form>
      </div>
    </div>
  );
};

export default Signup;
