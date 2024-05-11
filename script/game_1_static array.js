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

let questions = [
    {
        question: 'Inside which HTML element do we put the JavaScript?',
        choice1: '<script>',
        choice2: '<javascript>',
        choice3: '<js>',
        choice4: '<scripting>',
        answer: 1,
    },
    {
        question:
            "What is the correct syntax for referring to an external script called 'xxx.js'?",
        choice1: "<script href='xxx.js'>",
        choice2: "<script name='xxx.js'>",
        choice3: "<script src='xxx.js'>",
        choice4: "<script file='xxx.js'>",
        answer: 3,
    },
    {
        question: " How do you write 'Hello World' in an alert box?",
        choice1: "msgBox('Hello World');",
        choice2: "alertBox('Hello World');",
        choice3: "msg('Hello World');",
        choice4: "alert('Hello World');",
        answer: 4,
    },
];

// CONSTANTS
const CORRECT_BONUS = 10;
const MAX_QUESTIONS = 3;

// Start Game Function
let startGame = () => {
    // Reset
    questionCounter = 0; score = 0;
    // Get Copy From Questions
    availableQuestions = [...questions];
    // Generate New Question
    getNewQuestion();    
}

let getNewQuestion = () => {    
    // Navigate To End Page When No More Questions Available
    if (availableQuestions.length == 0 || questionCounter >= MAX_QUESTIONS){
        localStorage.setItem("mostRecentScore", score);
        return window.location.assign("/end.html");
    }
    questionCounter++;
    questionCounterText.innerText = `${questionCounter}/${MAX_QUESTIONS}`;
    // Add A Question To HTML
    const questionIndex =  Math.floor(Math.random() * availableQuestions.length);
    currentQuestion = availableQuestions[questionIndex];
    question.innerText = currentQuestion["question"];
    // Remove currentQuestion From availableQuestions To Avoid Duplication
    availableQuestions.splice(questionIndex, 1);
    // Add The Choices To HTML
    choices.forEach(choice => {
        const number = choice.dataset.number;
        choice.innerText = currentQuestion[`choice${number}`];
    });
    // Start Accepting Answers
    acceptingAnswers = true;
}

// Handle Click On Choices
choices.forEach((choice) => {
    choice.addEventListener("click", (e)=>{
        if (!acceptingAnswers) return; acceptingAnswers = false;
        const selectedChoice = e.target; 
        const selectedAnswer = selectedChoice.dataset.number;        
        const classToApply = selectedAnswer == currentQuestion.answer ? "correct" : "incorrect";
        selectedChoice.parentElement.classList.add(classToApply);
        if (classToApply ===  "correct"){incrementScore(CORRECT_BONUS);}
        setTimeout(()=>{
            selectedChoice.parentElement.classList.remove(classToApply);
            getNewQuestion();
        }, 700);        
    });
});

// Keep Track of Score
let incrementScore = bonus => {
    score += bonus;
    scoreText.innerText = score;
}

startGame();