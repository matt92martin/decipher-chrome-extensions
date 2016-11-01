(function(){

	function TellMeItsReal(e){
		console.log("It's real");
		console.log(e);
	}

	var TellMe = document.querySelector('#TellMeItsReal');
	TellMe.onclick = TellMeItsReal;

});
