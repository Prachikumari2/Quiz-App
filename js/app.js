const question = [
    {
        'que': 'Which of the following is a markup language?',
        'a': 'HTML',
        'b': 'CSS',
        'c': 'JavaScript',
        'd': 'Java',
        'correct': 'a'
    },
    {
        'que': 'When was JavaScript introduced?',
        'a': '1995',
        'b': '1996',
        'c': '1998',
        'd': '2000',
        'correct': 'a'
    },
    {
        'que': 'What is DOM?',
        'a': 'Document Object MediaSourceHandle',
        'b': 'Document Object Model',
        'c': 'Document Object Map',
        'd': 'None',
        'correct': 'b'
    }
];

let index = 0;
let total = question.length;
let correct = 0, wrong = 0;

const loadQuestion = () => {
    if (index === total) {
        return endQuiz();
    }

    reset();
    const data = question[index];

    document.getElementById("quesBox").innerText = `${index + 1}. ${data.que}`;
    document.querySelector('label[for="opt1"]').innerText = data.a;
    document.querySelector('label[for="opt2"]').innerText = data.b;
    document.querySelector('label[for="opt3"]').innerText = data.c;
    document.querySelector('label[for="opt4"]').innerText = data.d;
};

const submitQuiz = () => {
    const data = question[index];
    const ans = getAnswer();

    if (!ans) {
        alert("Please select an answer before proceeding.");
        return;
    }

    if (ans === data.correct) {
        correct++;
    } else {
        wrong++;
    }

    index++;
    loadQuestion();
};

const getAnswer = () => {
    let selectedAnswer = null;
    document.querySelectorAll('input[name="option"]').forEach(input => {
        if (input.checked) {
            selectedAnswer = input.value;
        }
    });
    return selectedAnswer;
};

const reset = () => {
    document.querySelectorAll('input[name="option"]').forEach(input => {
        input.checked = false;
    });
};

const endQuiz = () => {
    document.getElementById("box").innerHTML = `
        <h3>Thank you for playing!</h3>
        <h2>Score: ${correct} / ${total}</h2>
        <button class="btn" id="restart">Restart Quiz</button>
    `;

    // Add event listener to restart button
    document.getElementById("restart").addEventListener("click", restartQuiz);
};

const restartQuiz = () => {
    index = 0;
    correct = 0;
    wrong = 0;

    document.getElementById("box").innerHTML = `
        <h2 id="quesBox"></h2>
        <div>
            <input type="radio" name="option" value="a" id="opt1"><label for="opt1"></label><br>
            <input type="radio" name="option" value="b" id="opt2"><label for="opt2"></label><br>
            <input type="radio" name="option" value="c" id="opt3"><label for="opt3"></label><br>
            <input type="radio" name="option" value="d" id="opt4"><label for="opt4"></label><br>
        </div>
        <button class="btn" id="submit">Submit</button>
    `;

    // Reload the first question
    loadQuestion();

    // Reattach event listener to the new submit button
    document.getElementById("submit").addEventListener("click", submitQuiz);
};

// Load first question initially
loadQuestion();

// Attach event listener to submit button initially
document.querySelector(".btn").addEventListener("click", submitQuiz);
