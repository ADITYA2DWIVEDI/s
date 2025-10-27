import React from 'react';
import { HashRouter, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import Dashboard from './pages/Dashboard';
import AIStudio from './pages/AIStudio';
import Login from './pages/Login';
import Signup from './pages/Signup';
import VoicePage from './pages/VoicePage';
import ImagePage from './pages/ImagePage';
import VideoPage from './pages/VideoPage';

const App: React.FC = () => {
  return (
    <HashRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route
          path="/*"
          element={
            <Layout>
              <Routes>
                <Route index element={<Dashboard />} />
                <Route path="/ai-studio" element={<AIStudio />} />
                <Route path="/voice" element={<VoicePage />} />
                <Route path="/image" element={<ImagePage />} />
                <Route path="/video" element={<VideoPage />} />
              </Routes>
            </Layout>
          }
        />
      </Routes>
    </HashRouter>
  );
};

export default App;