var indexQuestion = 0;
var score = 0;
var maxTime = 60 * 1;

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
        // substract 10s to remaining time
    }



    manager()
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
    showQuestion();
    
    // if (timeleft ) {
    //     shownextquestion
    // }else {
    //     showscore
    // }

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
            timer = duration;
        }
    }, 1000);
}

 function startQuiz() {
    display = document.querySelector('#time');
    startTimer(maxTime, display);
    showQuestion();
        
};


      
    // Add event listener to generate button
    startQuizBtn.addEventListener("click", startQuiz);
