// Select Elements
const question = document.getElementById("question");
const choices = Array.from(document.getElementsByClassName("choice-text"));
const questionCounterText = document.getElementById("questionCounter");
const scoreText = document.getElementById("score");

// Variables
let currentQuestion = {};
let questionCounter = 0;
let availableQuestions = [];
let acceptingAnswers = false;
let score = 0;

let questions = [];
// initiates a network request to "questions.json"
fetch("questions.json") //return Promise
  // handle resolve
  // read the response body as JSON
  .then((res) => res.json())
  // receives the parsed JSON
  .then((data) => {
    questions = data;
    startGame();
  })
  // handle reject
  .catch((err) => console.error("Error:", err));

// CONSTANTS
const CORRECT_BONUS = 10;
const MAX_QUESTIONS = 3;

// Start Game Function
let startGame = () => {
  // Reset
  questionCounter = 0;
  score = 0;
  // Get Copy From Questions
  availableQuestions = [...questions];
  // Generate New Question
  getNewQuestion();
};

let getNewQuestion = () => {
  // Navigate To End Page When No More Questions Available
  if (availableQuestions.length == 0 || questionCounter >= MAX_QUESTIONS) {
    localStorage.setItem("mostRecentScore", score);
    return window.location.assign("/end.html");
  }
  questionCounter++;
  questionCounterText.innerText = `${questionCounter}/${MAX_QUESTIONS}`;
  // Add A Question To HTML
  const questionIndex = Math.floor(Math.random() * availableQuestions.length);
  currentQuestion = availableQuestions[questionIndex];
  question.innerText = currentQuestion["question"];
  // Remove currentQuestion From availableQuestions To Avoid Duplication
  availableQuestions.splice(questionIndex, 1);
  // Add The Choices To HTML
  choices.forEach((choice) => {
    const number = choice.dataset.number;
    choice.innerText = currentQuestion[`choice${number}`];
  });
  // Start Accepting Answers
  acceptingAnswers = true;
};

// Handle Click On Choices
choices.forEach((choice) => {
  choice.addEventListener("click", (e) => {
    if (!acceptingAnswers) return;
    acceptingAnswers = false;
    const selectedChoice = e.target;
    const selectedAnswer = selectedChoice.dataset.number;
    const classToApply =
      selectedAnswer == currentQuestion.answer ? "correct" : "incorrect";
    selectedChoice.parentElement.classList.add(classToApply);
    if (classToApply === "correct") {
      incrementScore(CORRECT_BONUS);
    }
    setTimeout(() => {
      selectedChoice.parentElement.classList.remove(classToApply);
      getNewQuestion();
    }, 700);
  });
});

// Keep Track of Score
let incrementScore = (bonus) => {
  score += bonus;
  scoreText.innerText = score;
};
