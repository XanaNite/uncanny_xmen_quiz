console.log("index.js attached")
//Start Quiz
//  render question
//  increase question count
//Submit Answer
//  test is answer is correct
//  display results
// update score
//Next question
//  test if question is less than 10
//  false, render next question and update count
//  true, show score
//Restart Quiz

let num = 0;
let score = 0;

function generateQuestion(){
    return `<form>
        <div class="question">
            <p>${questionData[num].question}</p>
        </div>
        <div class="multiChoice answers">
            <label>
                <input class="answer" type="radio" name="option" value="${questionData[num].A}" checked></input>
                <span>${questionData[num].A}</span>
            </label>
            <br>
            <label>
                <input class="answer" type="radio" name="option" value="${questionData[num].B}"></input>
                <span>${questionData[num].B}</span>
            </label>
            <br>
            <label>
                <input class="answer" type="radio" name="option" value="${questionData[num].C}"></input>
                <span>${questionData[num].C}</span>
            </label>
            <br>
            <label>
            <input class="answer" type="radio" name="option" value="${questionData[num].D}"></input>                    <span>${questionData[num].D}</span>
            </label>
        </div>
        <input type="submit" class ="js-submitAnswer" value="Submit Answer">
    </form>`;
}

function renderQuestion(){
    $('.formContainer').html(generateQuestion());
    console.log("Displays the question");
}

function increaseQuestionCounter(){
    num ++
    $('.questionCount').text(num);
    console.log(`Question count is ${num}`);
}

function handleStartQuiz(){
    $('form').submit(function(event){
        event.preventDefault();
        renderQuestion();
        increaseQuestionCounter();
    });
}

function isAnswerCorrect(){
    let selected = $('input:checked').val();
    let answer = `${questionData[num-1].correctAnswer}`;
    if(selected === answer){
        return true;
    } else {
        return false;
    };
}

function pickRandomResult(obj){
    return obj[Math.floor(Math.random()*obj.length)];
}

function handleScore(){
    score ++
    $('.scoreCount').text(score);
    console.log(`Score is ${score}`);
}

function generateResults(){
    let userCorrect = isAnswerCorrect();
    if(userCorrect === true){
        handleScore();
        let randomResult = pickRandomResult(correctResults);
        return `<form>
            <div class="question">
                <p>${randomResult.statement}</p>
            </div>
            <div class="multiChoice home">
                <img src="${randomResult.image}" alt="${randomResult.alt}">
            </div>
            <input type="submit" class ="js-next" value="Next">
        </form>`;
    } else {
        let randomResult = pickRandomResult(wrongResults);
        return `<form>
            <div class="question">
                <p>${randomResult.statement}</p>
                <p>The correct answer is ${questionData[num-1].correctAnswer}.</p>
            </div>
            <div class="multiChoice home">
                <img src="${randomResult.image}" alt="${randomResult.alt}">
            </div>
            <input type="submit" class ="js-next" value="Next">
        </form>`;
    }
}

function renderResults(){
    $('.formContainer').html(generateResults());
}

function handleSubmitAnswer(){
    $('.formContainer').on('click', '.js-submitAnswer', function(event){
        event.preventDefault();
        renderResults();
    });
}

function userScore(){
    return score / 10 * 100;
}

function generateScorePage(){
    let grade = userScore();
    if(grade < 70) {
        return `<form>
        <div class="question">
            <p>Looks like you need to spend more time in the Danger Room. Better luck next time.</p>
        </div>
        <div class="multiChoice home">
            <img src="https://orig00.deviantart.net/2f59/f/2018/245/7/7/the_uncanny__xmen_by_blackrocklegacies-dclswco.jpg" alt="X-Men Logo">
        </div>
        <input type="submit" class ="js-startQuiz" value="Enter the Danger Room">
        </form>`;
    }else {
        return `<form>
        <div class="question">
            <p>Congratulations! You defeated Rogue!</p>
        </div>
        <div class="multiChoice home">
            <img src="https://media1.tenor.com/images/8e38795838c0f6d79e3bff5553624207/tenor.gif?itemid=7797140" alt="Rogue image">
        </div>
        <input type="submit" class ="js-startQuiz" value="Enter the Danger Room">
        </form>`;
    }
}

function renderScorePage(){
    $('.formContainer').html(generateScorePage());
}

function handleNext(){
    $('.formContainer').on('click', '.js-next', function(event){
        event.preventDefault();
        console.log(userScore());
        if (num >= 10){
            renderScorePage();
        }else {
            renderQuestion();
            increaseQuestionCounter();
            console.log("User went to the next question");
        }
    });
}

function handleRestartQuiz(){
    $('form').submit(function(event){
        event.preventDefault();
        console.log("User restarted the quiz");
    });
}

function handleSubmits(){
    handleStartQuiz();
    handleSubmitAnswer();
    handleNext();
    handleRestartQuiz();
}

handleSubmits();
