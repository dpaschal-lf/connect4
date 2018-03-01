

$(document).ready( initializeApp );

let game = null;
function initializeApp(){
	debugger;
	const configObject = {
		gameArea : '#gameArea',
		playerArea : document.getElementById('playerInfo'),
		height: 6
	}
	game = new Connect4Game(configObject);
	game.render();
}