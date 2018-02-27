



class Connect4Game{
	constructor(options){
		this.gameCellArray = [];
		const defaults = {
			gameArea : '',
			playerArea : '',
			cellClass: 'cell',
			chipClass: 'chip',
			height: 6,
			width: 7, 
			playerCount: 2,
			playerTokens: ['images/bluechip.png','images/greenchip.png','images/cgreyhip.png','images/pinkchip.png']
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
					cellClass: this.cellClass
				});
				this.gameCellArray[row_index][col_index] = gameCell;
				var chipCellDomElement = gameCell.render();
				this.gameArea.append(chipCellDomElement);
			}
		}
	}

}












