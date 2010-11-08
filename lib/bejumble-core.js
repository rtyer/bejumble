var Bejumble = new Class({
	initialize: function(element){
		this.container=$(element);
		console.info("Bejumble initialized");		
	},
	
	clear: function(){
		console.debug("Bejumble.clear entered");
		this.sort.removeItems(this.container).destroy();
		console.info("letters cleared");
		console.debug("Bejumble.clear completed");
	},
	
	newWord: function(word){
		console.debug("Bejumble.newWord entered");
		this.container.innerHTML='<li class="letter">n</li><li class="letter">o</li><li class="clear"/>';
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
	},
	
	makeSortable: (function addSortable(){
		console.debug("addSortable entered");
		this.sort = new Sortables(this.container, {
			snap:10,
			clone:true,
			revert: { duration: 750, transition: 'elastic:out' },						    
			onComplete:function(element){
				this.guess();
			}		    
		});
		console.debug("addSortable completed");
	}).protect()
	

})