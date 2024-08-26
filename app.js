const questions = [
    {
        question: "Which function modifier restricts access to only the contract owner in Solidity?",
        answers: [
            { text: "onlyOwner", correct: true },
            { text: "private", correct: false },
            { text: "public", correct: false },
            { text: "restricted", correct: false },
        ]
    },
    {
        question: "What is the default visibility of state variables in Solidity?",
        answers: [
            { text: "private", correct: true },
            { text: "public", correct: false },
            { text: "internal", correct: false },
            { text: "external", correct: false },
        ]
    },
    {
        question: "Which data type is used to store ether value in Solidity?",
        answers: [
            { text: "uint", correct: true },
            { text: "ether", correct: false },
            { text: "address", correct: false },
            { text: "wei", correct: false },
        ]
    },
    {
        question: "What keyword is used to define an immutable state variable in Solidity?",
        answers: [
            { text: "immutable", correct: true },
            { text: "constant", correct: false },
            { text: "final", correct: false },
            { text: "unchangeable", correct: false },
        ]
    },
    // Add more Solidity-related questions here up to 50
];

const questionElement = document.getElementById("question");
const answerButtons = document.getElementById("answer-buttons");
const nextButton = document.getElementById("next-btn");

let currentQuestionIndex = 0;
let score = 0;

function startQuiz() {
    currentQuestionIndex = 0;
    score = 0;
    nextButton.innerHTML = "Next";
    showQuestion();
}

function showQuestion() {
    resetState();
    let currentQuestion = questions[currentQuestionIndex];
    let questionNo = currentQuestionIndex + 1;
    questionElement.innerHTML = questionNo + ". " + currentQuestion.question;

    currentQuestion.answers.forEach(answer => {
        const button = document.createElement("button");
        button.innerHTML = answer.text;
        button.classList.add("btn");
        answerButtons.appendChild(button);
        if (answer.correct) {
            button.dataset.correct = answer.correct;
        }
        button.addEventListener("click", selectAnswer);
    });
}

function resetState() {
    nextButton.style.display = "none";
    while (answerButtons.firstChild) {
        answerButtons.removeChild(answerButtons.firstChild);
    }
}

function selectAnswer(e) {
    const selectedBtn = e.target;
    const isCorrect = selectedBtn.dataset.correct === "true";
    if (isCorrect) {
        selectedBtn.classList.add("correct");
        score++;
    } else {
        selectedBtn.classList.add("incorrect");
    }
    Array.from(answerButtons.children).forEach(button => {
        if (button.dataset.correct === "true") {
            button.classList.add("correct");
        }
        button.disabled = true;
    });
    nextButton.style.display = "block";
}

function showScore(){
    resetState();
    questionElement.innerHTML = `You scored ${score} out of ${questions.length}!`;
    nextButton.innerHTML = "Play Again";
    nextButton.style.display = "block";
}

function handleNextButton(){
    currentQuestionIndex++;
    if(currentQuestionIndex < questions.length){
        showQuestion();
    }else{
        showScore();
    }
}

nextButton.addEventListener("click", () => {
    if(currentQuestionIndex < questions.length) {
        handleNextButton();
    } else {
        startQuiz();
    }
});

startQuiz();
