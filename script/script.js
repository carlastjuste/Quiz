var indexQuestion = 0;
var score = 0;
var maxTime = 20;
var remainTime = 0;

//Array for list of questions and answers
var questions = [{
    question: "1. What is the longest that an elephant has ever lived? (That we know of)",
    choices: ["17 years", "49 years", "86 years", "142 years"],
    correctAnswer: 2
}, {
    question: "2. How many rings are on the Olympic flag?",
    choices: ["None", "4", "5", "7"],
    correctAnswer: 2
}, {
    question: "3. How did Spider-Man get his powers?",
    choices: ["Military experiment gone awry", "Born with them", "Woke up with them after a strange dreamh", "Bitten by a radioactive spider"],
    correctAnswer: 3
}, {
    question: "4. How many holes are on a standard bowling ball?",
    choices: ["2", "3", "5", "10"],
    correctAnswer: 1
}];


// Function to get an HTML element by ID
function get(x){
    return document.getElementById(x);
 }



 //Funtion to display the quiz questions and choices 
function showQuestion (){
        quizContent = get("content");
        quizFooter = get("quizFooter");

        var currentQuestion = questions[indexQuestion];
        if (indexQuestion === 0){
           localStorage.removeItem('result');
        }

        //remove quiz button
        quizFooter.innerHTML= "<p></p>";

        // display the question
        quizContent.innerHTML = "<h3>" + currentQuestion.question + "</h3>";
      
        // display the answer options
        for (var choice of currentQuestion.choices) {
            var currentAnswer = currentQuestion.choices.indexOf(choice);
            quizContent.innerHTML += "<label> <input type='radio' name='choices' value='A' onClick='choiceHandler(" + currentAnswer + ")'>" + choice + "</label><br><br>";
        }

        indexQuestion++;
		showPreviousAnswer();  
}


// Function to check if choice is correct or not
function choiceHandler(currentAnswer){
    var currentQuestion = questions[indexQuestion - 1];

    if (currentAnswer == currentQuestion.correctAnswer){
        score++;
        localStorage.setItem ('result', 1);
    }else{
        remainTime = remainTime - 10;
        startTimer(remainTime, display);
		localStorage.setItem ('result', 0);
    }
	
    manager();
}

// Function to show previous answer result at the bottom of each question
function showPreviousAnswer () {
    var previousResult = localStorage.getItem('result');

    if (previousResult == 1){
       quizFooter.innerHTML= "<p>Correct!</p>";
    } else if (previousResult == 0) {
       quizFooter.innerHTML = "<p>Wrong!</p>";
    }
}

//Function to handle showing next question or result
function manager() {  
  
    if (remainTime > 0 && indexQuestion < questions.length ) {
        showQuestion();
    }
    else {

        showResult();
        showPreviousAnswer();
        localStorage.removeItem('result');
    }
}

// Function to show final score
function showResult() { 
    var result = document.getElementById('result');
    var quizQuestions = document.getElementById('quizQuestions');
    quizQuestions.style.display = "none";
    result.innerHTML += "<h1>All Done!</h1> <label>Your final score is : " + score + " </label> <br><br><br>" ;
    result.innerHTML += "<label>Enter Initials :</label> &nbsp; &nbsp; &nbsp; <input id='userinfo' type='text' ></input> &nbsp; &nbsp; &nbsp; <input type='Submit'  onclick='submitScore()'></input>"
}

// Function to hide result div
function hideResult(){
    var result = document.getElementById('result');
    result.innerHTML = '';
}

//Function to show scoreboard
function showScoreBoard(){
 var scoreboard = document.getElementById('scoreboard');
 var listPers = localStorage.getItem('scoreinfo');
 var lst = JSON.parse(listPers);

 localStorage.removeItem('result');

 scoreboard.innerHTML += "<h1>Highscores</h1><br><br>";

 for (var k in lst) {
	if (lst.hasOwnProperty(k)) {
		scoreboard.innerHTML += "<label>" + k + " " + lst[k] +  " </label> <br> <br> <br>"
	}
 }
    
 scoreboard.innerHTML += "<input type='Submit' value = 'Go Back' onClick='refresh()'></input>&nbsp; &nbsp; &nbsp; <input type='Submit' value = 'Clear Highscores' onClick='clearScore()' ></input> ";
}


//Function to reintialize quiz
function refresh() {
    location.reload();
}


//Function to clear high scoreboard
function clearScore() {
    localStorage.removeItem('scoreinfo');
    var scoreboard = document.getElementById('scoreboard');
    scoreboard.innerHTML = "<h1>Highscores</h1><br><br>";
    scoreboard.innerHTML += "<input type='Submit' value = 'Go Back' onClick='refresh()'></input>&nbsp; &nbsp; &nbsp; <input type='Submit' value = 'Clear Highscores' onClick='clearScore()' ></input> ";

}

//Function to show countdown timer on the screen
function startTimer(duration, display) {
    var timer = duration, minutes, seconds;
	
    setInterval(function () {
        minutes = parseInt(timer / 60, 10);
        seconds = parseInt(timer % 60, 10);

        minutes = minutes < 10 ? "0" + minutes : minutes;
        seconds = seconds < 10 ? "0" + seconds : seconds;

        display.textContent = minutes + ":" + seconds;

        if (--timer < 0) {
            timer = 0;
        }
        remainTime=timer;
    }, 1000);
}

//Function to initialize timer for the first time and display the questions on the screen
 function startQuiz() {
    display = document.querySelector('#time');
    startTimer(maxTime, display);
    showQuestion();
}   

// Function to handle the click on the submit score button
function submitScore(){
  saveScore();
  hideResult();
  showScoreBoard();
}

//Function to save the score and the initial
function saveScore(){
  var userinfo = document.getElementById('userinfo');
  var listPers = localStorage.getItem('scoreinfo');

  if(listPers == null ){
      var lst = new Object();
      lst[userinfo.value] = score;
      localStorage.setItem("scoreinfo", JSON.stringify(lst));
  }else{
       var lst = JSON.parse(listPers);
       lst[userinfo.value] = score;
      localStorage.setItem("scoreinfo", JSON.stringify(lst));
  }
}


// Add event listener to startQuizBtn button
startQuizBtn.addEventListener("click", startQuiz);