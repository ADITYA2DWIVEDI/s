import React, { useRef, useEffect } from 'react';
import ChatAssistant from '../components/ChatAssistant';
import CourseProgressCard from '../components/CourseProgressCard';
import { ChatMessage } from '../types';

// Data for the course cards can be managed here or fetched
const featuredCourses = [
  { icon: 'fas fa-brain', title: 'AI Fundamentals', progress: 25 },
  { icon: 'fas fa-graduation-cap', title: 'Advanced Prompting', progress: 75 },
  { icon: 'fas fa-cogs', title: 'Model Deployment', progress: 75 },
];

interface ChatAssistantHandle {
    setMessages: React.Dispatch<React.SetStateAction<ChatMessage[]>>;
}

const Dashboard: React.FC = () => {
  const chatRef = useRef<ChatAssistantHandle>(null);

  // Set initial messages for the chat components
  useEffect(() => {
    if (chatRef.current) {
        chatRef.current.setMessages([
            { role: 'model', text: 'Hello! How can I assist you with SnakeEngine AI today?' },
            { role: 'user', text: 'Hello' },
            { role: 'model', text: 'Hello! How can I assist you with SnakeEngine AI today?' },
            { role: 'user', text: 'Hello! HovskeEngine AI today?' },
        ]);
    }
  }, []);

  return (
    <div className="p-0 lg:p-8 w-full h-full flex flex-col">
      {/* Main Content Grid */}
      <div className="flex-grow grid grid-cols-1 lg:grid-cols-2 gap-8 items-start h-full">
        {/* Left Column: Course Section - HIDDEN ON MOBILE */}
        <div className="hidden lg:flex flex-col gap-6">
          <h2 className="text-2xl font-bold text-text-dark px-1">Course Section</h2>
          <div className="flex flex-col gap-4">
            {featuredCourses.map(course => (
              <CourseProgressCard 
                key={course.title}
                icon={course.icon}
                title={course.title}
                progress={course.progress}
              />
            ))}
          </div>
          <a
            href="https://snakeengine.vercel.app"
            target="_blank"
            rel="noopener noreferrer"
            className="mt-4 flex items-center justify-center gap-3 bg-sidebar-bg text-white font-semibold py-3 px-6 rounded-lg shadow-md hover:bg-gray-800 transition-all duration-300 w-full sm:w-auto self-start"
          >
            <i className="fas fa-arrow-right"></i>
            Explore All Courses
          </a>
        </div>

        {/* Right Column: Chat Assistant - FULL SCREEN ON MOBILE */}
        <div className="h-full lg:h-[75vh] min-h-[500px] w-full">
            <ChatAssistant ref={chatRef} />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;