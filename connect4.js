



class Connect4Game{
	constructor(options){
		this.gameCellArray = [];
		this.playerArray = [];
		this.currentPlayer = 0;
		const defaults = {
			gameArea : '',
			playerArea : '',
			cellClass: 'cell',
			chipClass: 'chip',
			height: 6,
			width: 7, 
			playerCount: 2,
			playerTokens: ['images/bluechip.png','images/greenchip.png','images/greychip.png','images/pinkchip.png']
		}
		for(let key in defaults){
			this[key] = options[key] || defaults[key];
			// this[key] = options[key] !== undefined ? options[key] : defaults[key];

			// if(options[key] !== undefined){
			// 	this[key] = options[key];
			// } else {
			// 	this[key] = defaults[key];
			// }
		}
		this.gameArea = $(this.gameArea);
		this.playerArea = $(this.playerArea);

		//TODO: modify this for dynamic player creation from landing page
		this.addPlayer('P1', this.playerTokens.pop());
		this.addPlayer('P2', this.playerTokens.pop());
	}
	addPlayer(name, token){
		if(this.playerArray.length < this.playerCount){
			const player = new Player(name, token);
			const playerDom = player.render();
			this.playerArea.append(playerDom);
			this.playerArray.push(player);
		}
	}
	getCurrentPlayerImage(){
		const image = this.playerArray[this.currentPlayer].image;
		return image;
	}
	cycleActivePlayer(){
		if(++this.currentPlayer >= this.playerArray.length){
			this.currentPlayer=0;
		}
		//es5 for loop
		for( var i=0; i< this.playerArray.length; i++){
			this.playerArray[i].makeInactive();
		}
		//es5.5 forEach with anon function
		// this.playerArray.forEach( function( player){
		// 	player.makeInactive();
		// });
		//es6 with fat arrow function
		// this.playerArray.forEach( player => {
		// 	player.makeInactive();
		// })
		this.playerArray[this.currentPlayer].makeActive();
	}
	getCurrentPlayer(){
		return this.playerArray[this.currentPlayer];
	}
	handleCellClick( cell ){
		console.log('GAME: a cell got clicked', cell);
		var image = this.getCurrentPlayer().image;
		cell.mark(image);
		this.cycleActivePlayer();
	}

	render(){
		const cellDimensions = {
			height: 100/this.height+'%',
			width: 100/this.width+'%'
		}
		for(let row_index = 0; row_index < this.height; row_index++){
			this.gameCellArray[row_index] = [];
			for(let col_index = 0; col_index < this.width; col_index++){
				const gameCell = new ChipCell({
					x: col_index,
					y: row_index,
					height: cellDimensions.height,
					width: cellDimensions.width,
					chipClass: this.chipClass,
					cellClass: this.cellClass,
					getImageCallback: this.getCurrentPlayerImage.bind(this),
					clickCallback: this.handleCellClick.bind(this)
				});
				this.gameCellArray[row_index][col_index] = gameCell;
				var chipCellDomElement = gameCell.render();
				this.gameArea.append(chipCellDomElement);
			}
		}
	}

}












