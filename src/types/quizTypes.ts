export interface Question {
  id: number;
  text: string;
  correctAnswer: string;
}

export interface QuizState {
  stage: 'intro' | 'question' | 'result' | 'video';
  currentQuestion: number;
  lastAnswer: boolean | null;
  questions: Question[];
}