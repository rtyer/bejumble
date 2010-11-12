//provides logic for game
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
	
	newWord: function(aWord){
		log("Bejumble.newWord entered with word: "+aWord);
		this.word = aWord.toUpperCase();
		var word = this.scramble(aWord);
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
		log("Bejumble.guess entered");
		var word='';
		this.container.getElements('li').each(function(element,i){
			word+=element.get('text');
		});
		log("guessed:"+ word);
		if(word == this.word){	
			this.fireEvent('word.correct');
		}
	},
	show: function(){
		return this.word;
	},
	//Based on Fisher–Yates_shuffle
	scramble: function(word){
		log("Bejumble.scramble entered for word: " + word);
		var letters = [];

		for (var i = 1; i <= word.length; i++){
		    letters[i] = word.substring((i - 1), i);
		}
		var n = letters.length;
		for(var i = n - 1; i > 0; i--) {
		    var j = Math.floor(Math.random() * (i + 1));
		    var tmp = letters[i];
		    letters[i] = letters[j];
		    letters[j] = tmp;
		}
		var scrambledWord = letters.join("");
		log("Bejumble.scramble exiting with result: " + scrambledWord);
		return scrambledWord;
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
		this.words = ['plant', 'fishing', 'science', 'element', 'vehicle', 'pillow', 'missouri', 'alarm', 'entrepreneur'];
		log("WordList initialized");
	},
	get: function(){
		var rand = (Math.round((Math.random()*this.words.length)));
		if(rand>=this.words.length) rand = this.words.length-1;
		log("getting word at position: " + rand);
		var word = this.words[rand];
		log("word: " + word);
		return word;
	}
	
});

// Logging for bejumble -- can disable logging across the system by commenting out
function log(message){
	if(console){
		console.log(message);
	}
}