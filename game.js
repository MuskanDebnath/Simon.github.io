var buttonColours=["red","blue","green","yellow"];
var gamePattern=[];
var userClickedPattern=[];

var level =0;

var started=false;

$(document).on("keydown",function(){
    if(!started){
        //$("#level-title").text("level"+level);
        nextSequence();
        started=true;
    }
})

$(".btn").on("click",function(){
        var userChosenColour= $(this).attr("id");
        userClickedPattern.push(userChosenColour);
        playSound(userChosenColour);
        animatePress(userChosenColour);
        checkAnswer(userClickedPattern.length-1)
});

function checkAnswer(currentColour){
    //  as Once nextSequence() is triggered, reset the userClickedPattern to an empty array ready for the next level.
    //the length of both the arrays will be same...
    if(userClickedPattern[currentColour]===gamePattern[currentColour]){
        //console.log("success");

        if (userClickedPattern.length === gamePattern.length){
            setTimeout(function () {nextSequence();
            }, 1000);
        }

    }else{
        //console.log("wrong");
        
        playSound("wrong");

        $("body").addClass("game-over")
        $("#level-title").text("Game Over, Press Any Key to Restart");
        setTimeout(function(){
            $("body").removeClass("game-over");
        },200);

        startOver();
    }
}


function nextSequence(){
    userClickedPattern=[];
    
    level++;
    $("#level-title").text("level "+level);
    var ran=Math.floor(Math.random()*4);
    var randomChosenColour=buttonColours[ran];

    gamePattern.push(randomChosenColour);

    $("#"+randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);
    playSound(randomChosenColour);
}





function playSound(name){
    var audio = new Audio("sounds/"+name+".mp3");
    audio.play();
}


function animatePress(currentColour){
    $("#"+currentColour).addClass("pressed");
    setTimeout(function(){
        $("#"+currentColour).removeClass("pressed");
    },100);
}

function startOver(){
    level=0;
    gamePattern=[];
    started=0;
}