var colors=["red", "blue", "green", "yellow"];
var gamePattern=[];
var userClickPattern=[];
var started=false;
var level=0;

// Event listener for starting the game
$(document).keydown(function(){
    if(!started){
        nextSequence();
        started=true
    }
})

// Function to generate the random sequence
function nextSequence(){
    level++;
    $("h1").text("Level "+level);
    var randomNumber=Math.floor(Math.random()*4);
    var randomChosenColor=colors[randomNumber];
    console.log(randomChosenColor);
    gamePattern.push(randomChosenColor);
    console.log(gamePattern);
    playSound(randomChosenColor);
    $("#"+randomChosenColor).fadeIn(100).fadeOut(100).fadeIn(100);
}

// Function to handle user clicks
$(".btn").click(function(event){
    var userChoice=event.target.id;
    userClickPattern.push(userChoice);
    buttonAnimation(userChoice);
    playSound(userChoice);
    console.log(userClickPattern);
    checkAnswer(userClickPattern.length-1);
})



//Function to animate the button press
function buttonAnimation(colorToAnimate){
    $("."+colorToAnimate).addClass("pressed");
    setTimeout(function(){
        $("."+colorToAnimate).removeClass("pressed");
    },100);

}

// Function to play sound 
function playSound(criteriaToPlay){
    var audio = new Audio("sounds/"+criteriaToPlay+".mp3");
    audio.play();
}

// Function to Check if the userChoice is correct or not

function checkAnswer(userInput){
    if(userClickPattern[userInput]===gamePattern[userInput]){
        console.log("success");
        if(userClickPattern.length===gamePattern.length){
            setTimeout(function(){
                nextSequence();
                userClickPattern=[];
            },1000);
        }
    }else{
        console.log("wrong");
        endGame();
        startOver();
    }
}

// Function to End the Game

function endGame(){
    playSound("wrong");
    $("body").addClass("game-over");
    setTimeout(function(){
        $("body").removeClass("game-over");
    },100);
    $("h1").text("Game-over!!! Press Any Key to Restart.");
}

// Function to Start over

function startOver(){
    level=0;
    userClickPattern=[];
    gamePattern=[];
    started=false;
}