/* @description There are four blocks. Each block is populated with either a number or a letter.
 * Click YES if the NUMBER in any of the UPPER two blocks is EVEN AND LETTER in any of the LOWER two blocks is a VOWEL.
 * Click NO if the above condition does not match.
 * Remember it is a "and" so both the conditions should be met.
 * 
 *@author Neeraj Jadhav jadhav.neeraj87@gmail.com
 *
 */

var vowelArray = ["A", "E", "I", "O", "U"];
var alphabetArray = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z"];
var divBackgroundColorsArray = ["#ff8f85", "#2dcc70", "#b1a1c6", "#ff0059", "#a500ff", "#ec26e6", "#f28e61", "#f0f261", "#61e5f2", "#4ff8bc", "#f8eb4f", "#f54ff8", "#c9f84f", "#f8cd4f", "#f8a14f"];
var letterForegroundColorsArray = ["#990000", "#420772", "#07725f", "#726a07", "#720766", "#1c0772", "#077269", "#670772", "#076e72", "#710a6d", "#710a45", "#0a5571", "#4b710a", "#71490a", "#0a5e71"];
var playerScore = 0;
var challengesPlayed = 0;
var timer = 30;
var interval;

document.addEventListener('keydown', function(event) {
    if (timer >= 0) {
        if (event.keyCode == 89) {
            playerResponse(true);
        }
        else if (event.keyCode == 78) {
            playerResponse(false);
        }
    }
}, true);

function init() {
    document.getElementById("yesBtn").style.display =  "none";
    document.getElementById("noBtn").style.display =  "none";
    document.getElementById("timeRemainingTextHeader").style.display =  "none";
    document.getElementById("table").style.visibility =  "hidden";
}

function generateChallenge() {
    assignValueToLabel("upperLeft", "upperRight");
    assignValueToLabel("lowerLeft", "lowerRight");
    randomiseDivBGColor("upperLeftDiv", "upperRightDiv");
    randomiseDivBGColor("lowerLeftDiv", "lowerRightDiv");
    randomiseLetterFGColor("upperLeft", "upperRight");
    randomiseLetterFGColor("lowerLeft", "lowerRight");
}

function assignValueToLabel(label1, label2) {
    if (modFunction(randomiser(100, 1), 2) == 0){
        document.getElementById(label1).innerHTML = alphabetArray[randomiser(25, 0)];
        document.getElementById(label2).innerHTML = randomiser(100, 1);
    } else {
        document.getElementById(label2).innerHTML = alphabetArray[randomiser(25, 0)];
        document.getElementById(label1).innerHTML = randomiser(100, 1);
    }
}

function randomiseDivBGColor(div1, div2) {
    document.getElementById(div1).style.backgroundColor = divBackgroundColorsArray[randomiser(14, 0)];
    document.getElementById(div2).style.backgroundColor = divBackgroundColorsArray[randomiser(14, 0)];
}

function randomiseLetterFGColor(label1, label2) {
    document.getElementById(label1).style.color = letterForegroundColorsArray[randomiser(14, 0)];
    document.getElementById(label2).style.color = letterForegroundColorsArray[randomiser(14, 0)];
}

function getSolutionForCurrentChallenge() {
    if (modFunction(document.getElementById("upperLeft").innerHTML, 2) == 0 || modFunction(document.getElementById("upperRight").innerHTML, 2) == 0) {
        if (vowelArray.indexOf(document.getElementById("lowerLeft").innerHTML) > -1 || vowelArray.indexOf(document.getElementById("lowerRight").innerHTML) > -1) {
            return true;
        }
    }
    
    return false;
}

function playerResponse(response) {
    challengesPlayed++;
    var conditionMatch = getSolutionForCurrentChallenge();
    if (response == true && conditionMatch == true) {
        playerScore++;
    } else if (response == false && conditionMatch == false) {
        playerScore++;
    }
    generateChallenge();
}

function start() {
    clearInterval(interval);
    playerScore = 0;
    challengesPlayed = 0;
    document.getElementById("scoreLabel").innerHTML = "";
    document.getElementById("challengesPlayedLabel").innerHTML = "";
    document.getElementById("yesBtn").style.display =  "inline";
    document.getElementById("noBtn").style.display =  "inline";
    document.getElementById("timeRemainingTextHeader").style.display =  "inline";
    document.getElementById("table").style.visibility =  "visible";
    document.getElementById("startBtn").style.visibility =  "hidden";
    document.getElementById("messageBoard").style.visibility =  "hidden";
    timer = 30;
    interval = setInterval(function(){myTimer()},1000);
    generateChallenge();
}

function displayScore() {
    document.getElementById("scoreLabel").innerHTML = "Your score is : " + playerScore;
    document.getElementById("challengesPlayedLabel").innerHTML = "Number of challenges played : " + challengesPlayed;
}

function outOfTime() {
    document.getElementById("yesBtn").style.display =  "none";
    document.getElementById("noBtn").style.display =  "none";
    document.getElementById("table").style.visibility =  "hidden";
    document.getElementById("messageBoard").style.visibility =  "visible";
    document.getElementById("startBtn").style.visibility = "visible";
    displayScore();
}

function modFunction(value1, value2) {
    return value1 % value2;
}

function randomiser(upperBound, lowerBound) {
    return Math.round(Math.random() * (upperBound - lowerBound));
}

function myTimer() {
    if (timer <= 10) {
        document.getElementById("timer").style.color = '#990000';
    }
    
    if(timer >= 0) {
        document.getElementById("timer").innerHTML = timer--;
   } else {
        clearInterval(interval);
        outOfTime();
   }
}