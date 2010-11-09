//provides logic for game
//TODO--consider moving ui behavior out via events
/*
-bejumble.newWord fires new word event
-event handler in ui behavior class registers sortable
-sortable binds bejumble.guess to it
-guess fires event when guess is correct
*/
var Bejumble = new Class({
	Implements:[Events],
	
	initialize: function(element){
		this.container=$(element);
		log("Bejumble initialized");		
	},
	
	clear: function(){
		log("Bejumble.clear entered");
		this.sort.removeItems(this.container.getElements("li")).destroy();
		log("Bejumble.clear completed");
	},
	
	newWord: function(word){
		log("Bejumble.newWord entered with word: "+word);
		this.word = word;
		var li =[];
		for(i=0;i<word.length;i++) 
			li.push(new Element('li', {
				'class':'letter',
				'text':word[i]
			}));
		li.push(new Element('li', {'class':'clear'}));
		this.container.adopt(li);
		this.makeSortable();
		log("Bejumble.newWord completed");
	},
	
	guess: function(){
		var word='';
		this.container.getElements('li').each(function(element,i){
			word+=element.get('text');
		});
		log("guessed:"+ word);
		if(word == this.word){	
			this.fireEvent('word.correct');
		}
	},
	
	makeSortable: (function addSortable(){
		log("addSortable entered");
		this.sort = new Sortables(this.container, {
			snap:10,
			clone:true,
			onComplete:this.guess.bind(this) 
		});
		log("addSortable completed");
	}).protect()
});

var WordList = new Class({
	initialize: function(){
		
	},
	get: function(){
		return "PLANT";
	}
});

// Logging for bejumble -- can disable logging across the system by commenting out
function log(message){
	console.log(message)
}