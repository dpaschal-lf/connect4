


function Player(name, avatar){
	this.name = name;
	this.image = avatar;
	this.avatar = avatar;
	this.domElements = {
		container: null,
		name: null,
		imageContainer: null,
		image: null
	}
	this.getName = function(){
		return this.name;
	}
	this.setName = function( newName ){
		if(typeof newName !=='string' || newName.length<1){
			console.error('newname must be a string and be longer than 0');
			return false;
		}
		this.domElements.name.innerText = newName;
		this.name = newName;
	}
	Object.defineProperties(this, {
		image: {
			get: function(){
				return this.avatar;
			},
			set: function( newAvatar ) {
				if(typeof newName !=='string' || newName.length<1){
					console.error('image must be a string and be longer than 0');
					return false;
				}
				this.domElements.image.src = this.newAvatar;
				avatar = this.newAvatar;
			}
		}
	})
	this.makeActive = function(){
		this.domElements.container.addClass('active');
		//this.domElements.container[0].classList.add('active')
	}
	this.makeInactive = function(){
		this.domElements.container.removeClass('active');
	}
	this.render = function(){
/*
		<div class="playerDisplay active">
			<div class="playerName">Dan</div>
			<div class="playerImage"><img src="images/bluechip.png"></div>
		</div>
*/
		this.domElements.container = $("<div>",{
			'class': 'playerDisplay'
		});
		this.domElements.name = $("<div>",{
			'class': 'playerName',
			text: this.getName()
		});
		this.domElements.imageContainer = $("<div>",{
			'class': 'playerImage',
		});
		this.domElements.image = $("<img>",{
			'src': this.image
		});
		this.domElements.imageContainer.append(this.domElements.image);
		this.domElements.container.append(this.domElements.name, this.domElements.imageContainer);
		return this.domElements.container;
	}
}









