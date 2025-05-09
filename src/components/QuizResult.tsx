import React from 'react';

interface QuizResultProps {
  isCorrect: boolean;
}

const QuizResult: React.FC<QuizResultProps> = ({ isCorrect }) => {
  return (
    <div className="flex flex-col items-center justify-center h-full bg-cover bg-center" style={{ backgroundImage: "url('/bg.png')" }}>
      <img 
        src={isCorrect ? "/correct.png" : "/incorrect.png"} 
        alt={isCorrect ? "Correct!" : "Incorrect!"} 
        className="w-4/5 animate-bounce-once"
      />
      
      {isCorrect && (
        <img 
          src="/goodjob_text.png" 
          alt="Good job!" 
          className="w-4/5 mt-6 animate-fade-in"
        />
      )}
    </div>
  );
};

export default QuizResult;