import React from 'react';
import QuizContainer from './components/QuizContainer';

function App() {
  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-8">
      <div className="w-[300px] h-[600px] overflow-hidden bg-white shadow-lg rounded">
        <QuizContainer />
      </div>
    </div>
  );
}

export default App;