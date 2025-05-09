import React from 'react';
import MapComponent from './MapComponent';
import { Question } from '../types/quizTypes';

interface QuizQuestionProps {
  question: Question;
  onAnswer: (country: string) => void;
  questionNumber: number;
}

const QuizQuestion: React.FC<QuizQuestionProps> = ({ question, onAnswer, questionNumber }) => {
  return (
    <div className="flex flex-col h-full bg-cover bg-center" style={{ backgroundImage: "url('/bg.png')" }}>
      <div className="p-4">
        <img 
          src={questionNumber === 1 ? "/hint_text1.png" : "/hint_text2.png"} 
          alt={`Question ${questionNumber}`} 
          className="w-4/5 mx-auto"
        />
      </div>
      
      <div className="flex-grow relative">
        <MapComponent onSelectCountry={onAnswer} correctCountry={question.correctAnswer} />
      </div>
      
      <div className="p-4 text-center">
        <img 
          src="/find_text.png" 
          alt="Find the location" 
          className="w-4/5 mx-auto"
        />
      </div>
    </div>
  );
};

export default QuizQuestion;