var madSetParagraph = {
	 text : "The world is adj01, everything verb01 . I'm running for my life from a massive, living noun01, and it's verb02 adv01 as it follows me. 'This is not a movie', I think to myself, this is the real noun02. Up ahead I spot a noun03, I want to hide inside it.. but i'm not adj02 enough. Everything is adj03, and I am adj04. 'Over Here' I hear someone shout adv02. 'Run adj05'. 'exclaim01' I think, but I do as I'm told. I see a person wearing a tshirt that reads 'noun03', standing inside an open drive-through BurgerWorld window. I leap adv03 through the gap and land hard on a the adj06 floor. The window slams shut with a loud inter01 behind me." ,
	numberOfWordsNeeded: 17,
	partsOfSpeechNeeded = [
		{ nouns : 3, complete: false, additional : "" },
		{ adj : 6, complete: false, additional : "" },
		{ verbs : 2, complete: false, additional : "" },
		{ adv : 3, complete: false, additional : "" },
		{ exclaim : 1, complete: false, additional : "" },
		{ other : 1, complete: false, additional : "" },
		{ interjection : 1, complete: false, additional : "" }
	];
	};
console.log (madSetParagraph.text);
