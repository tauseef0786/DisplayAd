import React from 'react';

interface QuizIntroProps {
  onStart: () => void;
}

const QuizIntro: React.FC<QuizIntroProps> = ({ onStart }) => {
  return (
    <div className="relative flex flex-col items-center justify-between h-full bg-cover bg-center" style={{ backgroundImage: "url('/bg.png')" }}>
      <img src="/stage.png" alt="" className="absolute top-0 left-0 w-full" />
      <img src="/text1.png" alt="Welcome to the Quiz" className="mt-16 w-4/5" />
      <img src="/people.png" alt="" className="w-4/5" />
      <button 
        onClick={onStart} 
        className="mb-10 transform transition-transform hover:scale-105"
      >
        <img src="/cta.png" alt="Start Quiz" className="w-48" />
      </button>
    </div>
  );
};

export default QuizIntro;