


class ChipCell{
	constructor(options){
		const defaults = {
			x: null, 
			y: null,
			height: null,
			width: null,
			chipClass: 'chip',
			cellClass: 'cell',
			getImageCallback: function(){},
			clickCallback: function(){}
		}
		for(let key in defaults){
			this[key] = options[key] !== undefined ? options[key] : defaults[key];
		}
	}
	render(){
		const cell = $("<div>",{
			'class': this.cellClass,
			css: {
				height: this.height,
				width: this.width
			},
			on:{
				click: this.handleClick.bind( this )
			}
		});
		const chip = $("<div>",{
			'class': this.chipClass,
		});
		cell.append(chip);
		this.domElements = {
			'chip': chip,
			'cell': cell
		};
		return cell;
	}
	handleClick(){
		console.log('CELL: I got clicked', event.currentTarget);
		this.clickCallback( this );
	}
	mark(image){
		$(this.domElements.chip).css('background-image', 'url('+image+')');
		//this.domElements.chip.style.backgroundImage = 'url(images/bluechip.png)'
	}
}















