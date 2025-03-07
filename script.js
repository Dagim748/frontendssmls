const quizData = {
    sport: [
        {
            question: "Vilket land vann fotbolls-VM 2022?",
            answers: [
                { text: "Frankrike", correct: false },
                { text: "Argentina", correct: true },
                { text: "Brasilien", correct: false },
                { text: "Spanien", correct: false }
            ]
        },
        {
            question: "Hur många spelare är på planen i ett fotbollslag?",
            answers: [
                { text: "9", correct: false },
                { text: "10", correct: false },
                { text: "11", correct: true },
                { text: "12", correct: false }
            ]
        },
        {
            question: "Vilket land är känt för att dominera inom bordtennis?",
            answers: [
                { text: "Kina", correct: true },
                { text: "Sverige", correct: false },
                { text: "Japan", correct: false },
                { text: "Indien", correct: false }
            ]
        },
        {
            question: "I vilken sport används en puck?",
            answers: [
                { text: "Fotboll", correct: false },
                { text: "Ishockey", correct: true },
                { text: "Volleyboll", correct: false },
                { text: "Handboll", correct: false }
            ]
        },
        {
            question: "Vilket land har vunnit flest olympiska guldmedaljer?",
            answers: [
                { text: "Kina", correct: false },
                { text: "Ryssland", correct: false },
                { text: "USA", correct: true },
                { text: "Tyskland", correct: false }
            ]
        }
    ],
    spel: [
        {
            question: "Vilket år lanserades Minecraft?",
            answers: [
                { text: "2009", correct: true },
                { text: "2007", correct: false },
                { text: "2011", correct: false },
                { text: "2005", correct: false }
            ]
        },
        {
            question: "Vilket företag skapade Mario?",
            answers: [
                { text: "Sony", correct: false },
                { text: "Microsoft", correct: false },
                { text: "Nintendo", correct: true },
                { text: "Sega", correct: false }
            ]
        },
        {
            question: "I vilket spel slåss karaktärer som Mario, Link och Pikachu?",
            answers: [
                { text: "Mario Kart", correct: false },
                { text: "Super Smash Bros", correct: true },
                { text: "Pokémon", correct: false },
                { text: "Legend of Zelda", correct: false }
            ]
        },
        {
            question: "Vilket land är ursprungslandet för brädspelet Monopol?",
            answers: [
                { text: "England", correct: false },
                { text: "USA", correct: true },
                { text: "Tyskland", correct: false },
                { text: "Frankrike", correct: false }
            ]
        },
        {
            question: "Vilket är det bäst säljande TV-spelet genom tiderna?",
            answers: [
                { text: "Minecraft", correct: true },
                { text: "Grand Theft Auto V", correct: false },
                { text: "Wii Sports", correct: false },
                { text: "Super Mario Bros", correct: false }
            ]
        }
    ]
};

let currentQuestions = [];
let currentQuestionIndex = 0;
let score = 0;
let userAnswers = []; // NEW: Array to store user's answers

function startQuiz(category) {
    document.getElementById('startPage').style.display = 'none';
    document.getElementById('quizPage').style.display = 'block';
    currentQuestions = quizData[category];
    currentQuestionIndex = 0;
    score = 0;
    userAnswers = []; // Reset user answers
    showQuestion();
}

function showQuestion() {
    const questionContainer = document.getElementById('questionText');
    const answerButtonsContainer = document.getElementById('answerButtons');
    const nextButtonContainer = document.getElementById('nextButtonContainer');

    // Clear previous question and buttons
    questionContainer.innerHTML = '';
    answerButtonsContainer.innerHTML = '';
    nextButtonContainer.innerHTML = '';

    // Display current question
    const currentQuestion = currentQuestions[currentQuestionIndex];
    questionContainer.textContent = currentQuestion.question;

    // Create answer buttons
    currentQuestion.answers.forEach(answer => {
        const button = document.createElement('button');
        button.textContent = answer.text;
        button.classList.add('answer-button');
        button.addEventListener('click', () => selectAnswer(answer));
        answerButtonsContainer.appendChild(button);
    });
}

function selectAnswer(selectedAnswer) {
    const buttons = document.getElementById('answerButtons').children;
    
    // Disable further selections
    for (let button of buttons) {
        button.disabled = true;
    }

    // Store user's answer
    userAnswers.push({
        question: currentQuestions[currentQuestionIndex].question,
        userAnswer: selectedAnswer.text,
        correctAnswer: currentQuestions[currentQuestionIndex].answers.find(a => a.correct).text
    });

    // Check if answer is correct
    if (selectedAnswer.correct) {
        score++;
    }

    // Move to next question or show result
    if (currentQuestionIndex < currentQuestions.length - 1) {
        const nextButton = document.createElement('button');
        nextButton.textContent = 'Nästa fråga';
        nextButton.addEventListener('click', moveToNextQuestion);
        document.getElementById('nextButtonContainer').appendChild(nextButton);
    } else {
        showResult();
    }
}

function moveToNextQuestion() {
    currentQuestionIndex++;
    showQuestion();
}

function showResult() {
    document.getElementById('quizPage').style.display = 'none';
    document.getElementById('resultPage').style.display = 'block';
    
    const scoreText = document.getElementById('scoreText');
    scoreText.textContent = `Du fick ${score} rätt av ${currentQuestions.length} möjliga.`;

    // NEW: Add answer review
    const answerReview = document.createElement('div');
    answerReview.innerHTML = '<h3>Dina svar:</h3>';
    userAnswers.forEach((answer, index) => {
        const answerDiv = document.createElement('div');
        answerDiv.innerHTML = `
            <p><strong>Fråga ${index + 1}: ${answer.question}</strong></p>
            <p>Ditt svar: ${answer.userAnswer}</p>
            <p style="color: ${answer.userAnswer === answer.correctAnswer ? 'green' : 'red'}">
                Rätt svar: ${answer.correctAnswer}
            </p>
        `;
        answerReview.appendChild(answerDiv);
    });
    document.getElementById('resultPage').appendChild(answerReview);
}

function restartQuiz() {
    document.getElementById('scoreText').innerHTML = ''; // Clear previous review
    document.getElementById('resultPage').style.display = 'none';
    document.getElementById('startPage').style.display = 'block';
}