$(document).ready(initializeApplication);

var players = [
	{
		name: 'Dude',
		color: 'blue'
	},
	{
		name: 'Joe',
		color: 'red'
	}
]
var currentPlayerIndex = 0;
var boardWidth = 7;
var boardHeight = 6;
var boardArray = [];
var checkVectors = [
	[{x:0, y:1}, {x:0, y:-1}],//updown
	[{x:-1, y:0}, {x:1, y:0}],//leftright
	[{x:-1, y:-1}, {x:1, y:1}],//upleft/downright
	[{x:-1 ,y:1}, {x:1, y:-1}]//upright/downleft
];
//run this at page load
function initializeApplication(){
	var gameBoardDom = makeBoard(boardHeight, boardWidth, boardArray);
	for(var i =0; i<gameBoardDom.length; i++){
		$("#gameArea").append(gameBoardDom[i]);
	}
}

//this adds all click handlers to static page
function addEventListeners(){

}
//dynamically create the board
function makeBoard(height, width, elementArray){
	var outputArray = [];
	for(var row=0; row < height; row++){
		outputArray[row] = [];
		elementArray[row] = [];
		for(var col=0; col<width; col++){
			outputArray[row][col] = $("<div>",{
				'class': 'playerCell',
				column: col,
				row: row,
				on: {
					click: cellClickHandler
				},
				text: `x: ${col}, y: ${row}`
			});
			var marker = $("<div>",{
				'class': 'chip'
			});
			outputArray[row][col].append(marker);
			elementArray[row][col] = marker;
		}
	}
	return outputArray;
}
//this is the initial handler to each cell click
function cellClickHandler(){
	console.log('cell was clicked', this);
	var x = $(this).attr('column');
	var y = $(this).attr('row');
	console.log(x,y);
	var currentPlayer = players[currentPlayerIndex];
	var currentColor = currentPlayer.color
	
	var availableRow = findEmptySpotInColumn(x);
	if(availableRow!==false){
		boardArray[availableRow][x].css('background-color',currentColor);
		activateNextPlayer();
		var result = checkForWin(x, availableRow);
	}	
}
var checkVectors = [
	[{x:0, y:1}, {x:0, y:-1}],//updown
	[{x:-1, y:0}, {x:1, y:0}],//leftright
	[{x:-1, y:-1}, {x:1, y:1}],//upleft/downright
	[{x:-1 ,y:1}, {x:1, y:-1}]//upright/downleft
];
function checkForWin(column, row){
	debugger;
	var playerColor = getColorAtLocation(row, column);
	$(".checkingFrom").removeClass('checkingFrom');
	boardArray[row][column].parent().addClass('checkingFrom');
	for(var vectorIndex = 0; vectorIndex<checkVectors.length; vectorIndex++){
		var startingLocation = {
			x: parseInt(column), 
			y: parseInt(row)
		}
		var vector1 = checkVectors[vectorIndex][0];
		var vector2 = checkVectors[vectorIndex][1];
		var matchesInVector1 = checkForMatchesInDirection(startingLocation, vector1, playerColor);
		var matchesInVector2 = checkForMatchesInDirection(startingLocation, vector2, playerColor);
		var chipCount = 1 + matchesInVector1 + matchesInVector2;
		if(chipCount === 4){
			alert('win');
		}
	}
	$(".currentlyChecking").removeClass('currentlyChecking');
}
function checkForMatchesInDirection(location, vector, color){
	$(".currentlyChecking").removeClass('currentlyChecking');

	var nextLocation = {
		x: location.x + vector.x,
		y: location.y + vector.y
	}
	markChipParent(nextLocation.y,nextLocation.x,'currentlyChecking');
	var nextColor = getColorAtLocation(nextLocation.y, nextLocation.x);
	if(nextColor!==color){
		return 0;
	} else {
		return (1 + checkForMatchesInDirection(nextLocation, vector, color));
	}
}
function getColorAtLocation(row, column){
	if(boardArray[row]===undefined){
		return false;
	} else if(
		boardArray[row][column]===undefined){
		return false;
	}
	return boardArray[row][column].css('background-color');
}
function markChipParent(row, column, newClass){
	if(boardArray[row]!==undefined){
		boardArray[row][column].parent().addClass(newClass);
	}
}
function activateNextPlayer(){
	currentPlayerIndex = 1 - currentPlayerIndex;
}

function findEmptySpotInColumn(column){
	column = parseInt(column);
	var empty = "rgba(0, 0, 0, 0)";
	for(var y= boardArray.length-1; y>=0; y--){
		var colorAtLocation =getColorAtLocation(y, column);
		if(colorAtLocation === empty){
			return y;
		}
	}
	return false;
}



