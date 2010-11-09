var Bejumble = new Class({
	Implements:[Events],
	
	initialize: function(element){
		this.container=$(element);
		console.info("Bejumble initialized");		
	},
	
	clear: function(){
		console.debug("Bejumble.clear entered");
		this.sort.removeItems(this.container.getElements("li")).destroy();
		console.info("letters cleared");
		console.debug("Bejumble.clear completed");
	},
	
	newWord: function(word){
		console.debug("Bejumble.newWord entered with word: "+word);
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
		console.info("word added");
		console.debug("Bejumble.newWord completed");
	},
	
	guess: function(){
		var word='';
		this.container.getElements('.letter').each(function(element,i){
			word+=element.get('text');
		});
		console.info("guessed:"+ word);
		if(word == this.word){	
			this.fireEvent('word.correct');
		}
	},
	
	makeSortable: (function addSortable(){
		console.debug("addSortable entered");
		this.sort = new Sortables(this.container, {
			snap:10,
			clone:true,
			onComplete:this.guess.bind(this) 
		});
		console.debug("addSortable completed");
	}).protect()
});

var WordList = new Class({
	initialize: function(){
		
	},
	get: function(){
		return "PLANT";
	}
});