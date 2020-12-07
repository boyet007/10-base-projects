const quizData = [
    {
        question: 'How old is Florin?',
        a: '10',
        b: '17', 
        c: '26',
        d: '110',
        correct: 'c'
    },
    {
        question: 'What is the most used programming language in 2019??',
        a: 'Java',
        b: 'C', 
        c: 'VB',
        d: 'JavaScript',
        correct: 'a'
    },
    {
        question: 'Who is the president of US?',
        a: 'Donal Trumph',
        b: 'Jokowi', 
        c: 'Cangato',
        d: 'Boris Becker',
        correct: 'a'
    },
    {
        question: '1 + 1 = ?',
        a: '1',
        b: '2', 
        c: '3',
        d: '4',
        correct: 'b'
    },
    {
        question: 'Siapa Artis terkenal?',
        a: 'Nakusa',
        b: 'Gisel', 
        c: 'Luna Maya',
        d: 'Dewi Sari',
        correct: 'c'
    },
    {
        question : 'Apa pekerjaan si Lisa?',
        a: 'Professor',
        b: 'Desainer', 
        c: 'Driver',
        d: 'Accounting',
        correct: 'b'
    }
]

const quiz = document.getElementById('quiz');
const questionEl = document.getElementById('question');
const a_text = document.getElementById("a_text");
const b_text = document.getElementById("b_text");
const c_text = document.getElementById("c_text");
const d_text = document.getElementById("d_text");
const submitBtn = document.getElementById('submit');
const answerEls = document.querySelectorAll('.answer');
let currentQuestion = 0;
let currentQuiz = 0;
let score = 0;
loadQuiz();

function getSelected() {

    let answer = undefined
    answerEls.forEach((answerEl) => {
        if (answerEl.checked) {
            answer = answerEl.id;
        }
    })
    return answer;
}

function loadQuiz() {
    deSelectAnswer();
    const currentQuizData = quizData[currentQuiz];
    questionEl.innerText = currentQuizData.question;
    a_text.innerText = currentQuizData.a;
    b_text.innerText = currentQuizData.b;
    c_text.innerText = currentQuizData.c;
    d_text.innerText = currentQuizData.d;
    console.log('score awal : ' + score)
}

submitBtn.addEventListener('click', () => {
    const answer = getSelected();
    if (answer) {
        if (answer === quizData[currentQuiz].correct) {
            score++;
        }
        currentQuiz++;

        if (currentQuiz < quizData.length) {
            loadQuiz();
        } else {
            quiz.innerHTML = `<h2>Kamu telah menjawab benar ${score} / ${quizData.length} pertanyaan</h2>`;
        }
    }
});

function deSelectAnswer() {
    answerEls.forEach((answerEl) => {
        answerEl.checked = false;
    });
}