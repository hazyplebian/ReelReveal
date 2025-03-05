import express, { Request, Response } from 'express';

const router = express.Router();

const triviaQuestions = [
  {
    question: "In which 1994 film does Samuel L. Jackson quote Ezekiel 25:17?",
    options: ["Pulp Fiction", "Jackie Brown", "Snakes on a Plane", "The Negotiator"],
    answer: "Pulp Fiction",
  },
  {
    question: "Who directed the movie 'The Dark Knight'?",
    options: ["Christopher Nolan", "Steven Spielberg", "Quentin Tarantino", "Martin Scorsese"],
    answer: "Christopher Nolan",
  },
  {
    question: "What is the highest-grossing film of all time (unadjusted for inflation)?",
    options: ["Avatar", "Avengers: Endgame", "Titanic", "Star Wars: The Force Awakens"],
    answer: "Avatar",
  },
];

let currentQuestionIndex = 0;
let userScore = 0;

router.get('/trivia/question', (_req: Request, res: Response) => {
  if (currentQuestionIndex < triviaQuestions.length) {
    const question = triviaQuestions[currentQuestionIndex];
    res.json({
      question: question.question,
      options: question.options,
      questionNumber: currentQuestionIndex + 1,
      totalQuestions: triviaQuestions.length
    });
  } else {
    res.json({ message: 'Trivia finished!' });
  }
});

router.post('/trivia/answer', (req: Request, res: Response) => {
  const userAnswer = req.body.answer;
  const question = triviaQuestions[currentQuestionIndex];

  if (question && userAnswer) {
    if (userAnswer === question.answer) {
      userScore++;
      res.json({ correct: true, score: userScore });
    } else {
      res.json({ correct: false, score: userScore, correctAnswer: question.answer });
    }
    currentQuestionIndex++;
  } else {
    res.status(400).json({ error: 'Invalid request' });
  }
});

router.get('/trivia/score', (_req: Request, res: Response) => {
    if(currentQuestionIndex >= triviaQuestions.length){
        res.json({ score: userScore, totalQuestions: triviaQuestions.length });
    } else {
        res.status(400).json({error: "Trivia not finished yet."})
    }
});

router.post('/trivia/reset', (_req: Request, res: Response) => {
    currentQuestionIndex = 0;
    userScore = 0;
    res.json({message: "Trivia game reset."})
})

export default router;