import React, { useState } from 'react';
import QuizIntro from './QuizIntro';
import QuizQuestion from './QuizQuestion';
import QuizResult from './QuizResult';
import VideoScreen from './VideoScreen';
import { QuizState } from '../types/quizTypes';

const QuizContainer: React.FC = () => {
  const [quizState, setQuizState] = useState<QuizState>({
    stage: 'intro',
    currentQuestion: 0,
    lastAnswer: null,
    questions: [
      {
        id: 1,
        text: "Which country is known as the birthplace of pizza?",
        correctAnswer: "ITALY"
      },
      {
        id: 2,
        text: "Which country is famous for the Eiffel Tower?",
        correctAnswer: "FRANCE"
      }
    ]
  });

  const handleStart = () => {
    setQuizState(prev => ({
      ...prev,
      stage: 'question'
    }));
  };

  const handleAnswer = (selectedCountry: string) => {
    const currentQuestion = quizState.questions[quizState.currentQuestion];

    // Normalize both answers to uppercase and trim any extra spaces
    const normalizedSelectedCountry = selectedCountry.trim().toUpperCase();
    const normalizedCorrectAnswer = currentQuestion.correctAnswer.trim().toUpperCase();

    const isCorrect = normalizedSelectedCountry === normalizedCorrectAnswer;

    setQuizState(prev => ({
      ...prev,
      stage: 'result',
      lastAnswer: isCorrect
    }));

    setTimeout(() => {
      setQuizState(prev => {
        if (prev.currentQuestion < prev.questions.length - 1) {
          return {
            ...prev,
            stage: 'question',
            currentQuestion: prev.currentQuestion + 1,
            lastAnswer: null
          };
        } else {
          return {
            ...prev,
            stage: 'video'
          };
        }
      });
    }, 2000);
  };

  return (
    <div className="w-full h-full">
      {quizState.stage === 'intro' && <QuizIntro onStart={handleStart} />}
      
      {quizState.stage === 'question' && (
        <QuizQuestion 
          question={quizState.questions[quizState.currentQuestion]} 
          onAnswer={handleAnswer}
          questionNumber={quizState.currentQuestion + 1}
        />
      )}
      
      {quizState.stage === 'result' && (
        <QuizResult isCorrect={quizState.lastAnswer!} />
      )}
      
      {quizState.stage === 'video' && <VideoScreen />}
    </div>
  );
};

export default QuizContainer;
