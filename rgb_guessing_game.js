var colors = generateRandomColors(numSquares);
var squares = document.querySelectorAll(".square");
var goalColor = randomColor();
var colorDisplay = document.querySelector("#colorDisplay");
var messageDisplay = document.querySelector("#message");
var header = document.querySelector("h1");
var resetButton = document.querySelector("#resetButton");
var easy = document.querySelector("#easy");
var hard = document.querySelector("#hard");
var numSquares = 6;
var highScore = document.querySelector("#hscore");
var yourScore = document.querySelector("#score");
var hScore = 0;
var yScore = 0;


//clicking the easy button
easy.addEventListener("click", function(){
	highScore.textContent = 0;
	yourScore.textContent = 0;
	easy.classList.add("selected");
	hard.classList.remove("selected");
	//generate new colors
	numSquares = 3;
	colors = generateRandomColors(numSquares);
	goalColor = randomColor();
	colorDisplay.textContent = goalColor;
	for(var i =0; i< squares.length; i++) {
		if(colors[i]) {
			squares[i].style.backgroundColor = colors[i];
		} else {
			squares[i].style.display = "none";
		}
	}
});

//clicking the hard button
hard.addEventListener("click", function(){
	highScore.textContent = 0;
	yourScore.textContent = 0;
	hard.classList.add("selected");
	easy.classList.remove("selected");
	numSquares = 6;
	colors = generateRandomColors(numSquares);
	goalColor = randomColor();
	colorDisplay.textContent = goalColor;
	for(var i =0; i< squares.length; i++) {
		squares[i].style.backgroundColor = colors[i];
		squares[i].style.display = "block";
	}
});

//set the goal color
colorDisplay.textContent = goalColor;

//reset button
resetButton.addEventListener("click", function() {
	resetButton.textContent = "New Colors";
	//generate all new colors
	colors = generateRandomColors(numSquares);
	//pick a new random color from array
	goalColor = randomColor();
	//change "play again" text
	messageDisplay.textContent = "";

	//change the colors of the squares on the page
	for(var i = 0; i < squares.length; i++){
		squares[i].style.backgroundColor = colors[i];
	}
	//change colorDisplay to match picked color
	colorDisplay.textContent = goalColor;
	header.style.backgroundColor = "steelblue";
});


//game logic
for(var i = 0; i < squares.length; i++){
	//add initial colors to squares
	squares[i].style.backgroundColor = colors[i];
	//high score counter
	//add click listeners to squares
	squares[i].addEventListener("click", function() {
		//grab color of clicked square
		var chosenColor = this.style.backgroundColor;
		//compare chosenColor to goalColor
		if(chosenColor === goalColor) {
			messageDisplay.textContent =  "Correct!";
			correctAnswer(chosenColor);
			yScore++;
			if(yScore>=hScore){
				highScore.textContent = yScore;
				hScore = yScore;
			}else {
				highScore.textContent = hScore;
			}
			yourScore.textContent = yScore;
			resetButton.textContent = "Play Again?";
		} else {
			this.style.backgroundColor = "#232323";
			yScore = 0;
			yourScore.textContent = yScore;
			messageDisplay.textContent = "Try Again";
		}
	});
}

//helper function to create solution effect
function correctAnswer (color) {
		for(var i = 0; i< squares.length; i++){
			squares[i].style.backgroundColor = color;
			header.style.backgroundColor = color;
		}		
}

//pick random color as target color
function randomColor() {
	var random = Math.floor(Math.random() * colors.length);
	return colors[random];
}

//generates random color array
function generateRandomColors(num){
	//make an array
	var arr = [];
	//add num random colors to array
	for(var i = 0; i < num; i++){
		//get random color and push into array
		arr.push(randomColors())
	}
	//return that array
	return arr;
}

//generates random colors for random color array
function randomColors() {
	//pick red from 0 to 255
	var r =Math.floor(Math.random() * 256);
	//pick green from 0 to 255
	var g =Math.floor(Math.random() * 256);
	//pick blue from 0 to 255
	var b =Math.floor(Math.random() * 256);
	return "rgb(" + r + ", " + g + ", " + b + ")";
}


//function sets the html of the scores
function setScoreDisplay() {
	highScore.textContent = hScore;
	yourScore.textContent = yScore;
}