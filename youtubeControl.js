
	
	var SpeechRecognition = SpeechRecognition || webkitSpeechRecognition;
	var SpeechGrammarList = SpeechGrammarList || webkitSpeechGrammarList
	var SpeechRecognitionEvent = SpeechRecognitionEvent || webkitSpeechRecognitionEvent

	var recognition = new SpeechRecognition();
	recognition.continuous = true;
	recognition.lang="fr-FR";
	recognition.onresult = function(event){

		
	for(var i=event.resultIndex; i<event.results.length; i++){
			var resultats = event.results[i][0].transcript;
			document.getElementById("rechercheVocale").value = resultats;

		}

	}

	


function demarer(){
	var messageEntree = new SpeechSynthesisUtterance('Que puis je faire pour vous?');
	var voices = window.speechSynthesis.getVoices();
	
	window.speechSynthesis.speak(messageEntree);
	
	
		recognition.start()

	
	setTimeout(function(){
		var demande = document.getElementById("rechercheVocale").value;
		console.log(demande);
		if(demande.includes("recherche")){
			recherche();

		}else if(demande.includes('lire')){
			lireTitres();
		}}			, 7000);


}



function recupYoutube(){
		var x = document.getElementById("rechercheVocale");
		var request = new XMLHttpRequest();
		var recherche = x.value;
		var url = "https://www.googleapis.com/youtube/v3/search?&q=" + recherche + "&part=snippet&maxResults=10&key=" + "AIzaSyD-9VMPpURE4Ng992hjjr20hlDA35kDWlo";
			
			request.open("GET", url);
			request.send();
			request.responseType = 'json';
		

			request.onload = function(){
				var tab = request.response;
				document.getElementById("listeVideos").innerHTML = "";

				for(var i=0; i<10; i++){
					var titre = tab['items'][i]['snippet']['title'];
					var urlVideo= tab['items'][1]['id']['videoId'];
					var miniature = tab['items'][i]['snippet']['thumbnails']['default']['url'];

					
					document.getElementById("listeVideos").innerHTML += "<div class='contenuVideo'><img src=" + miniature + "><br><a href=https://www.youtube.com/watch?v=" + urlVideo + "><span class='titreVideos'>" + titre + "</span></a></div>";
				}
			}}

function lireTitres(){
	recognition.stop();
	var titre= document.getElementsByClassName('titreVideos');
	var voices = window.speechSynthesis.getVoices();
	titre.lang='fr-FR';
	
	for(var i=0; i<titre.length; i++){
		var message = new SpeechSynthesisUtterance(titre[i].innerHTML);
		window.speechSynthesis.speak(message);

	}
	
	
	setTimeout("demarer()", 40000);
}

function recherche(){
	document.getElementById("rechercheVocale").value="";
	//recognition.start();
	setTimeout("recupYoutube(); recognition.stop();", 5000);
	setTimeout("demarer()", 10000);
	

}