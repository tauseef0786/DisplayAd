import React from 'react';

interface QuizIntroProps {
  onStart: () => void;
}

const QuizIntro: React.FC<QuizIntroProps> = ({ onStart }) => {
  return (
    <div className="relative flex flex-col items-center justify-start min-h-screen bg-cover bg-center" style={{ backgroundImage: "url('/bg.png')" }}>
      
      {/* Text at the top */}
      <div className="mt-6">
        <img src="/text1.png" alt="Welcome to the Quiz" className="w-4/5 max-w-md" />
      </div>

      {/* Stage container with relative positioning */}
      <div className="relative w-11/12 max-w-2xl mt-8">
        {/* Stage image */}
        <img src="/stage.png" alt="Stage" className="w-full z-10" />

        {/* Content inside the stage */}
        <div className="absolute inset-0 flex flex-col items-center justify-end pb-6">
          {/* People image sent to the back (behind the stage) */}
          <img src="/people.png" alt="People" className="max-w-sm mb-4 absolute z-0" />
          
          {/* Button positioned a little higher */}
          <button 
            onClick={onStart}
            className="transform transition-transform hover:scale-105 focus:outline-none mb-4 z-20"
          >
            <img style={{marginBottom: '10px'}} src="/cta.png" alt="Start Quiz" className="sm:w-48" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default QuizIntro;
