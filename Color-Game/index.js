//Passes numSquares so that each level has the correct number of squares
var numSquares = 6;
var colors = [];
//make all the manipulatable elements into variables
var pickedColor;
var header = document.querySelector("h1");
var resetButton = document.getElementById("reset");
var squares = document.querySelectorAll(".square");
var colorDisplay = document.getElementById("colorDisplay");
var messageDisplay = document.getElementById("message");
var modeButtons = document.querySelectorAll(".mode");

//changing the span element in the h1 to show the correct color 
colorDisplay.textContent = pickedColor;

init();


function init(){
	//mode buttons event listeners 
	setupModeButtons();
	setupSquares();
	reset();
}

function setupModeButtons(){
	for(var i = 0; i < modeButtons.length; i++){
	modeButtons[i].addEventListener("click", function(){
		modeButtons[0].classList.remove("selected");
		modeButtons[1].classList.remove("selected");
		this.classList.add("selected");
		/*if(this.textContent === "Easy"){
			numSquares = 3;
		} else {
			numSquares = 6;
		}*/
		//Another way to write this simple if/else loop. Ternary operator example
		this.textContent === "Easy" ? numSquares = 3: numSquares = 6;
		reset();	
		
		})
	}
}

function setupSquares(){
	for (var i = 0; i < squares.length; i++) {
	//add initial colors to squares
	squares[i].style.backgroundColor = colors[i];
	//add click listeners to squares
	squares[i].addEventListener("click", function(){
	//grab color of clicked square
	var clickedColor = this.style.backgroundColor;
	//compare color to pickedColor
	if(clickedColor === pickedColor){
		messageDisplay.textContent = "Correct!";
		resetButton.textContent = "Play Again?";
		changeColor(clickedColor);
		header.style.backgroundColor = clickedColor;
	} else {
		//fade the incorrect color into the background
		this.style.backgroundColor = "black";
		messageDisplay.textContent = "Try Again";
	}
	});

	} 
}

function reset(){
	colors = generateRandomColors(numSquares);
	//pick a new random color from array
	pickedColor = pickColor();
	//change colorDisplay to match picked color
	colorDisplay.textContent = pickedColor;
	//reseting the game removes the correct
	resetButton.textContent = "New Colors";
	messageDisplay.textContent = "";
	//change colors of the squares
	for(var i= 0; i <squares.length; i++){
		if(colors[i]){
			squares[i].style.display = "block";
			squares[i].style.background = colors[i];
		} else {
			squares[i].style.display = "none";
		}
	}
	header.style.backgroundColor = "steelblue";
};

resetButton.addEventListener("click", function(){
	reset();
});

for (var i = 0; i < squares.length; i++) {
	//add initial colors to squares
	squares[i].style.backgroundColor = colors[i];
	//add click listeners to squares
	squares[i].addEventListener("click", function(){
	//grab color of clicked square
	var clickedColor = this.style.backgroundColor;
	//compare color to pickedColor
	if(clickedColor === pickedColor){
		messageDisplay.textContent = "Correct!";
		resetButton.textContent = "Play Again?";
		changeColor(clickedColor);
		header.style.backgroundColor = clickedColor;
	} else {
		//fade the incorrect color into the background
		this.style.backgroundColor = "black";
		messageDisplay.textContent = "Try Again";
	}
	});

} 

//if correct color is cliked, changes colors of all boxes to correct color
function changeColor(color){
	//loop through all squares
	for(var i = 0; i < squares.length; i++){
	//change each square to match given color 
	squares[i].style.backgroundColor = color;
	}
}

function pickColor(){
	//syntax to pick at random. Math.floor is how to remove the decimal
	var random = Math.floor(Math.random() * colors.length);
	return colors[random];
}


function generateRandomColors(num) {
	//make an array
	var arr = [];
	//repeat num times
	for (var i = 0; i < num; i++) {
		//get random color and push into array
		arr.push(randomColor());
	}
	//return that array
	return arr;
}

function randomColor(){
	//pick a "red" from 0 to 255
	var red = Math.floor(Math.random() * 256);
	//pick a "green" from 0 to 255
	var green = Math.floor(Math.random() * 256);
	//pick a "blue" from 0 to 255
	var blue = Math.floor(Math.random() * 256);
	//return those three random colors 
	return "rgb(" + red + ", " + green + ", " + blue + ")";
}