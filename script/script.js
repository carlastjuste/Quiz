var indexQuestion = 0;
var score = 0;
var maxTime = 20;
var remainTime = 0;

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


function get(x){
    return document.getElementById(x);
  }

function showQuestion () {

        quizContent = get("content");
        quizFooter = get("quizFooter");

        var currentQuestion = questions[indexQuestion];
        if (indexQuestion === 0){
           localStorage.removeItem('result');
        }
        //remove button
        quizFooter.innerHTML= "<p></p>";

        // display the question
        quizContent.innerHTML = "<h3>" + currentQuestion.question + "</h3>";
      
        // display the answer options
        // the += appends to the data we started on the line above

        for (var choice of currentQuestion.choices) {

            var currentAnswer = currentQuestion.choices.indexOf(choice);
    
            quizContent.innerHTML += "<label> <input type='radio' name='choices' value='A' onClick='choiceHandler(" + currentAnswer + ")'>" + choice + "</label><br><br>";

          }

            indexQuestion++;

            showPreviousAnswer ();  

        
        // quizContent.innerHTML += "<button onclick='checkAnswer()'>Submit Answer</button>";
      }


// function to check if choice is correct or not
function choiceHandler(currentAnswer){

    var currentQuestion = questions[indexQuestion - 1];

    if (currentAnswer == currentQuestion.correctAnswer){
        
        score++;
        localStorage.setItem ('result', 1);
        
        
    }else{
        
        localStorage.setItem ('result', 0);
        remainTime = remainTime - 10;
        startTimer(remainTime, display);
        // substract 10s to remaining time
    }



    manager();
}

function showPreviousAnswer () {
    var previousResult = localStorage.getItem('result');

    if (previousResult == 1) 

        {
            quizFooter.innerHTML= "<p>Correct!</p>";
            

    } else if (previousResult == 0) {
        quizFooter.innerHTML = "<p>Wrong!</p>";
       
    }

    localStorage.removeItem('result');
}


function manager() {    

    
    if (remainTime>0 && indexQuestion < questions.length ) {
        showQuestion();
    }
    else {
        hideQuizQuestion();
        showResult();
     }

}

function hideQuizQuestion(){
    var quizQuestions = document.getElementById('quizQuestions');
    quizQuestions.style.display = "none";
}

function showResult() 
{ 
    var result = document.getElementById('result');
    result.innerHTML += "<h1>All Done!</h1> <label>Your final score is : " + score + " </label> <br><br><br>" ;
    result.innerHTML += "<label>Enter Initials :</label> &nbsp; &nbsp; &nbsp; <input id='userinfo' type='text' ></input> &nbsp; &nbsp; &nbsp; <input type='Submit'  onclick='submitScore()'></input>"

}

function hideResult(){
    var result = document.getElementById('result');
    result.innerHTML = '';
}

function showScoreBoard(){
 var scoreboard = document.getElementById('scoreboard');
 var listPers = localStorage.getItem('scoreinfo');
 var lst = JSON.parse(listPers);

 scoreboard.innerHTML += "<h1>Highscores</h1><br><br>";


 for (var k in lst) {
        if (lst.hasOwnProperty(k)) {
            scoreboard.innerHTML += "<label>" + k + " " + lst[k] +  " </label> <br> <br> <br>"
        }
    }
    
 scoreboard.innerHTML += "<input type='Submit' value = 'Go Back' ></input>&nbsp; &nbsp; &nbsp; <input type='Submit' value = 'Clear Highscores' ></input> ";
}

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

 function startQuiz() {
    display = document.querySelector('#time');
    startTimer(maxTime, display);
    showQuestion();
        
}   

function submitScore(){
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

  hideResult();
  showScoreBoard();
}

    // Add event listener to generate button
    startQuizBtn.addEventListener("click", startQuiz);


