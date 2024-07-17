//declaring variables i'll use
const diffForm=document.getElementById('diff-form');
const questionForm=document.getElementById('question-form');
var diff;
const easy=document.getElementById('easy');
const medium=document.getElementById('medium');
const hard=document.getElementById('hard');
const question=document.getElementById('question');
const remainingQues=document.getElementById('remaining-ques');
const scoreContainer=document.getElementById('score');
var option1=document.getElementById('option1');
var option2=document.getElementById('option2');
var option3=document.getElementById('option3');
var option4=document.getElementById('option4');
// var timer=document.getElementById('timer');
const next=document.getElementById('next');
let questions;
var currentQuestion;
var score=0;

function declareDiff(event,difficulty){
    score=0;
    event.preventDefault();
    diff=difficulty;
    diffForm.style.display="none";
    questionForm.style.display="flex";
    if(difficulty=="easy")
        loadQuestions("easyQ.json");
    else if(difficulty=="medium")
        loadQuestions("mediumQ.json");
    else if(difficulty=="hard")
        loadQuestions("hardQ.json");
}
function loadQuestions(fileName) {
    fetch(fileName)
        .then(response => response.json())
        .then(data => {
            questions = data;
            displayQuestion(0);
        })
        .catch(error => console.error('Error loading questions:', error));
}

function displayQuestion(index) {
    if (index < questions.length) {
        remainingQues.textContent ="Remaining questions: " + (questions.length - index);
        currentQuestion = questions[index];
        question.textContent = currentQuestion.question;
        option1.textContent = currentQuestion.options[0];
        option2.textContent = currentQuestion.options[1];
        option3.textContent = currentQuestion.options[2];
        option4.textContent = currentQuestion.options[3];
    } else {
        alert('All questions answered!');
        questionForm.style.display="none";
        diffForm.style.display="flex";
    }
}

function checkAnswer(event) {
    event.preventDefault();
    if(event.target.textContent==currentQuestion.answer){
        event.target.style.backgroundColor='green';
        score++;
        scoreContainer.textContent = "Score: " + score;
    }
    else
        event.target.style.backgroundColor='red';
    disableOptions();
}

function disableOptions() {
    option1.removeEventListener('click', checkAnswer);
    option2.removeEventListener('click', checkAnswer);
    option3.removeEventListener('click', checkAnswer);
    option4.removeEventListener('click', checkAnswer);
    option1.style.pointerEvents = 'none';
    option2.style.pointerEvents = 'none';
    option3.style.pointerEvents = 'none';
    option4.style.pointerEvents = 'none';
}

function resetOptions() {
    option1.style.backgroundColor='';
    option2.style.backgroundColor='';
    option3.style.backgroundColor='';
    option4.style.backgroundColor='';
    option1.style.pointerEvents = 'auto';
    option2.style.pointerEvents = 'auto';
    option3.style.pointerEvents = 'auto';
    option4.style.pointerEvents = 'auto';
    option1.addEventListener('click', checkAnswer);
    option2.addEventListener('click', checkAnswer);
    option3.addEventListener('click', checkAnswer);
    option4.addEventListener('click', checkAnswer);
    remainingQues.textContent=questions.length-questions.indexOf(currentQuestion);
}
function nextQuestion(event) {
    resetOptions()  
    event.preventDefault();
    index=questions.indexOf(currentQuestion)+1;
    if(index>questions.length){
        alert('No more questions, you scored:'+score+' points out of '+questions.length);
        questionForm.display='none';
        diffForm.display='block';
    }
    else{
        displayQuestion(index);
    }
}

easy.addEventListener('click',(event) => declareDiff(event,'easy'));
medium.addEventListener('click',(event) => declareDiff(event,'medium'));
hard.addEventListener('click',(event) => declareDiff(event,'hard'));

option1.addEventListener('click',(event) => checkAnswer(event));
option2.addEventListener('click',(event) => checkAnswer(event));
option3.addEventListener('click',(event) => checkAnswer(event));
option4.addEventListener('click',(event) => checkAnswer(event));

next.addEventListener('click',(event) => (nextQuestion(event)));