document.addEventListener("DOMContentLoaded", () => {
    const startButton = document.querySelector(".start");
    const introContainer = document.querySelector("#intro-container");
    const quizContainer = document.querySelector(".quiz-container");
    const questionText = document.querySelector("#question-text");
    const optionsContainer = document.querySelector("#options-container");
    const nextButton = document.querySelector(".next");
    const currentQuestionSpan = document.querySelector("#current-question");
    const totalQuestionsSpan = document.querySelector("#total-questions");
    const scoreDisplay = document.querySelector("#score span");
    const scoreContainer = document.querySelector("#score");

    let currentQuestionIndex = 0;
    let score = 0;

    const quizQuestions = [    
        {
            question: "What will `console.log(typeof null)` return in JavaScript?",
            options: ["null", "undefined", "object", "string"],
            correctAnswer: "object"
        },
        {
            question: "Which method is used to remove the last element from an array?",
            options: ["pop()", "shift()", "slice()", "splice()"],
            correctAnswer: "pop()"
        },
        {
            question: "Which data structure uses FIFO (First In, First Out) principle?",
            options: ["Stack", "Queue", "Linked List", "Tree"],
            correctAnswer: "Queue"
        },
        {
            question: "What is the output of `print(2 ** 3)` in Python?",
            options: ["5", "6", "8", "9"],
            correctAnswer: "8"
        },
        {
            question: "Which keyword is used to define a function in Python?",
            options: ["function", "def", "define", "fn"],
            correctAnswer: "def"
        },
        {
            question: "Which of the following is an immutable data type in Python?",
            options: ["List", "Set", "Dictionary", "Tuple"],
            correctAnswer: "Tuple"
        },
        {
            question: "Which data structure follows the Last In, First Out (LIFO) principle?",
            options: ["Queue", "Stack", "Linked List", "Tree"],
            correctAnswer: "Stack"
        },
        {
            question: "Which searching algorithm has an average time complexity of O(log n)?",
            options: ["Linear Search", "Binary Search", "Bubble Sort", "Quick Sort"],
            correctAnswer: "Binary Search"
        },
        {
            question: "Which of the following is NOT a linear data structure?",
            options: ["Array", "Queue", "Stack", "Graph"],
            correctAnswer: "Graph"
        },
        {
            question: "Which sorting algorithm works by repeatedly swapping adjacent elements if they are in the wrong order?",
            options: ["Merge Sort", "Bubble Sort", "Quick Sort", "Insertion Sort"],
            correctAnswer: "Bubble Sort"
        }
    ];

    totalQuestionsSpan.textContent = quizQuestions.length; // Set total questions count

    startButton.addEventListener("click", () => {
        scoreContainer.style.display = "none";
        introContainer.style.display = "none"; // Hide intro
        quizContainer.style.display = "block"; // Show quiz
        displayQuestion(); // Load first question
    
    });

    function displayQuestion() {
        // Clear previous options
        optionsContainer.innerHTML = "";

        let currentQuestion = quizQuestions[currentQuestionIndex];
        questionText.textContent = currentQuestion.question;
        currentQuestionSpan.textContent = currentQuestionIndex + 1; // Update progress

        // Generate option buttons
        currentQuestion.options.forEach(option => {
            let optionButton = document.createElement("button");
            optionButton.textContent = option;
            optionButton.classList.add("option-button");
            optionButton.addEventListener("click", () => checkAnswer(option, optionButton));
            optionsContainer.appendChild(optionButton);
        });

        nextButton.style.display = "none"; // Hide next button initially
    }

    function checkAnswer(selectedOption, optionButton) {
        let currentQuestion = quizQuestions[currentQuestionIndex];

        if (selectedOption === currentQuestion.correctAnswer) {
            optionButton.style.backgroundColor = "lightgreen"; // Correct answer
            score++;
        } else {
            optionButton.style.backgroundColor = "lightcoral"; // Incorrect answer
        }

        // Disable all buttons after selection
        document.querySelectorAll(".option-button").forEach(btn => {
            btn.disabled = true;
        });

        nextButton.style.display = "block"; // Show next button
    }

    nextButton.addEventListener("click", () => {
        // Prevent multiple clicks
        nextButton.disabled = true;

        currentQuestionIndex++;

        if (currentQuestionIndex < quizQuestions.length) {
            displayQuestion();
            resetButtonStyles(); // Reset button styles for next question
        } else {
            showFinalScore();
        }

        nextButton.disabled = false; // Re-enable after updating question
    });

    function resetButtonStyles() {
        document.querySelectorAll(".option-button").forEach(button => {
            button.style.backgroundColor = ""; // Reset background color
            button.disabled = false; // Enable buttons again
        });
    }

    function showFinalScore() {
        scoreContainer.style.display = "block";
        quizContainer.style.display = "none";
        scoreContainer.innerHTML = `
            <h2>Quiz Completed!</h2> 
            <p>Your Score: ${score} / ${quizQuestions.length}</p>
            <button class="restart">Restart Quiz</button>
        `;

        document.querySelector(".restart").addEventListener("click", () => {
            // restartQuiz();
            score = 0;
            currentQuestionIndex = 0;
            scoreContainer.style.display = "none";
            scoreDisplay.textContent = "0"; // Reset displayed score
            quizContainer.style.display = "none";
            introContainer.style.display = "block"; // Show intro again
            });
    }
});
