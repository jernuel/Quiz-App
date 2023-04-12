const quizContainer = document.getElementById('quiz-container');
const questionContainer = document.getElementById('question-container');
const questionElement = document.getElementById('question');
const answerButtonsElement = document.getElementById('answer-buttons');
const startButton = document.getElementById('start-button');
const nextButton = document.getElementById('next-button');
const showButton = document.getElementById('show-button')
const startUp = document.getElementById('start-up');
const results = document.getElementById('results-page')
const nameID = document.getElementById('Name');
const number = document.getElementById('Number');
const appendTens = document.getElementById("tens");
const appendSeconds = document.getElementById("seconds");
const appendMinutes = document.getElementById("minutes");
const chartArea = document.getElementById('results-page')


let shuffledQuestions, currentQuestionIndex,validate,seconds=0,tens=0,minutes=0,Interval,correct=0,wrong=0,getNname;



startButton.addEventListener('click', startQuiz);
nextButton.addEventListener('click', () => {
currentQuestionIndex++;
  setNextQuestion();
});
showButton.addEventListener('click', showResults);

function startTimer () {
  tens++; 
  
  if(tens <= 9){
    appendTens.innerHTML = "0" + tens;
  }
  
  if (tens > 9){
    appendTens.innerHTML = tens;
    
  } 
  
  if (tens > 99) {
    console.log("seconds");
    seconds++;
    appendSeconds.innerHTML = "0" + seconds;
    tens = 0;
    appendTens.innerHTML = "0" + 0;
  }
  
  if (seconds > 9){
    appendSeconds.innerHTML = seconds;
  }

  if (seconds > 59) {
    minutes++;
    appendMinutes.innerHTML="0"+minutes;
    seconds = 0;
    appendSeconds.innerHTML="0"+0;
  }

  if (minutes > 9){
    appendMinutes.innerHTML = minutes;
  }
}


function validateForm() {
  var x = nameID.value;
  var y = number.value;
  if (x == "" || y=="" ) {
    alert("Please Fill In The Spaces Provided!!")
    validate=false;
  }
  else{
    validate=true;
  }
}

function startQuiz() {
  validateForm();
  if (validate==true) {
    getNname=nameID.value;
  clearInterval(Interval);
  Interval = setInterval(startTimer, 10);
  startTimer();
  startUp.style.display="none";
  questionContainer.style.display="block";

  startButton.style.display="none";
  nextButton.style.display="block";
  shuffledQuestions = questions.sort(() => Math.random() - 0.5);
  currentQuestionIndex = 0;
  setNextQuestion(); 
  }  
  
}

function setNextQuestion() {
    resetState();
    showQuestion(shuffledQuestions[currentQuestionIndex]);
  }
  
  function showQuestion(question) {
    questionElement.innerText = question.question;
    question.answers.forEach(answer => {
      const button = document.createElement('button');
      button.innerText = answer.text;
      button.classList.add('answer-button');
      if (answer.correct) {
        button.dataset.correct = answer.correct;
        
      }
      button.addEventListener('click', selectAnswer);
      answerButtonsElement.appendChild(button);
    });
  }
  
  function resetState() {
    clearStatusClass(document.body);
    while (answerButtonsElement.firstChild) {
      answerButtonsElement.removeChild(answerButtonsElement.firstChild);
    }
  }

  function showResults(){
    
      questionContainer.style.display="none";
      showButton.style.display="none";
      chartArea.style.display="block";
      const xValues=["Correct","Wrong"];
      const yValues=[correct,wrong];
      const barColors=["#00FF00","#FF0000"];
      chartShow(xValues,yValues,barColors);
    
  }

  
  function selectAnswer(e) {
    const selectedButton = e.target;
    const correctq = selectedButton.dataset.correct;
    setStatusClass(document.body, correctq);
    Array.from(answerButtonsElement.children).forEach(button => {
      setStatusClass(button, button.dataset.correct);
    });

    if (selectedButton.dataset.correct) {
      correct++;
    }
    else{
      wrong++;
      
    }

    if (shuffledQuestions.length > currentQuestionIndex + 1) {
    
    } else {
      clearInterval(Interval);  
      nextButton.style.display="none";
      showButton.style.display="block";
    }

  }


  
  function setStatusClass(element, correct) {
    clearStatusClass(element);
    if (correct) {
      element.classList.add('correct');
    } else {
      element.classList.add('wrong');
    }
  }
  

  function chartShow(x,y,bar){

    new Chart("myChart", {
      type: "pie",
      data: {
        labels: x,
        datasets: [{
          backgroundColor: bar,
          data: y
        }]
      },
      options: {
        title: {
          display: true,
          text: "Hello "+getNname+", these are your results"
        }
      }
    });

  }

  
  function clearStatusClass(element) {
    element.classList.remove('correct');
    element.classList.remove('wrong');
  }
  
  const questions = [  {   
     question: 'Which planet has the most moons?',   
     answers: [     
       { text: 'Saturn', correct: true },   
       { text: 'Mecury', correct: false },  
       { text: 'Earth', correct: false }, 
       { text: 'Venus', correct: false }    
      ]
     },
    {
      question: 'In what country would you find Mount Kilimanjaro?',
      answers: [
        { text: 'Tanzania', correct: true },
        { text: 'Kenya', correct: false },
        { text: 'Namibia', correct: false },
        { text: 'South Africa', correct: false }
      ]
    },
    {
      question: 'What is the only continent with land in all four hemispheres?',
      answers: [
        { text: 'Asia', correct: false },
        { text: 'Africa', correct: true },
        { text: 'Europe', correct: false },
        { text: 'Australia', correct: false }
      ]
    },
    {
      question: 'In what capital would you find The Little Mermaid statue?',
      answers: [
        { text: 'Copenhagen', correct: true },
        { text: 'Berlin', correct: false },
        { text: 'Frankfurt', correct: false },
        { text: 'Stugart', correct: false }
      ]
    },
    {
      question: 'What is the worlds best-selling stout beer? ',
      answers: [
        { text: 'Heineken', correct: false},
        { text: 'Club', correct: false },
        { text: 'Guinness', correct: true },
        { text: 'Budweiser ', correct: false }
      ]
    },
    {
      question: 'What year was Cinderella released? ',
      answers: [
        { text: '1934', correct: false },
        { text: '1921', correct: false },
        { text: '1967', correct: false },
        { text: '1950', correct: true }
      ]
    },
    {
      question: 'How many hearts does an octopus have?',
      answers: [
        { text: '1', correct: false },
        { text: '3', correct: true },
        { text: '4', correct: false },
        { text: '5', correct: false }
      ]
    },
    {
      question: 'Where is the strongest human muscle located?',
      answers: [
        { text: 'Legs', correct: false },
        { text: 'Arms', correct: false },
        { text: 'Jaw', correct: true },
        { text: 'Heart', correct: false }
      ]
    },
    {
      question: 'What is acrophobia a fear of?',
      answers: [
        { text: 'Heights', correct: true },
        { text: 'Aircraft', correct: false },
        { text: 'Cobras', correct: false },
        { text: 'Clowns', correct: false }
      ]
    },
    {
      question: 'How many dots appear on a pair of dice? ',
      answers: [
        { text: '21', correct: false },
        { text: '24', correct: false },
        { text: '48', correct: false },
        { text: '42', correct: true }
       ]
  }
  ];
  