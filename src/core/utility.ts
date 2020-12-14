let utility = {
	onTransform: function(word: string){
		let begin: string = "on";
		let upCharacter: string = word.charAt(0).toLocaleUpperCase();
		return begin + upCharacter + word.substr(1);
	}
}

export { utility }