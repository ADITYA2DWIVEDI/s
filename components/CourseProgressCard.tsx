import React from 'react';

interface CourseProgressCardProps {
  icon: string;
  title: string;
  progress: number;
}

const CourseProgressCard: React.FC<CourseProgressCardProps> = ({ icon, title, progress }) => {
  return (
    <div className="bg-gradient-to-r from-course-card-start to-course-card-end p-4 rounded-xl text-white shadow-lg flex items-center gap-4 transition-transform duration-300 hover:scale-105 cursor-pointer">
      <div className="bg-white/20 w-12 h-12 rounded-lg flex items-center justify-center flex-shrink-0">
        <i className={`${icon} text-2xl`}></i>
      </div>
      <div className="flex-grow">
        <div className="flex justify-between items-center mb-1">
          <h3 className="font-bold">{title}</h3>
          {progress > 0 && <span className="text-xs font-medium">{progress}%</span>}
        </div>
        <div className="w-full bg-black/20 rounded-full h-2">
          <div 
            className="bg-white h-2 rounded-full" 
            style={{ width: `${progress}%` }}
          ></div>
        </div>
      </div>
    </div>
  );
};

export default CourseProgressCard;
