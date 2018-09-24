
	
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

function initLecteur(){
	
				var tag = document.createElement('script');

			      tag.src = "https://www.youtube.com/iframe_api";
			      var firstScriptTag = document.getElementsByTagName('script')[0];
			      firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
}




function demarer(){
	
	var messageEntree = new SpeechSynthesisUtterance('Que puis je faire pour vous?');
	var voices = window.speechSynthesis.getVoices();
	
	window.speechSynthesis.speak(messageEntree);
	recognition.start();

	
	setTimeout(function(){
		var demande = document.getElementById("rechercheVocale").value;
		console.log(demande);
		if(demande.includes("recherche")){
			recognition.stop();
			setTimeout("recherche()", 3000);

		}else if(demande.includes('lire')){
			messagetitreVideos = new SpeechSynthesisUtterance("Voici les titres!");
			window.speechSynthesis.speak(messagetitreVideos);
			lireTitres();
		}else if(demande.includes('lance')){
			playVid();
		}else if(demande.includes('stop')){
			stopVid();
			recognition.stop();
			setTimeout("demarer()", 4000)

		}else{
			recognition.stop();
			setTimeout("demarer()", 4000)}




	}, 8000);


}
var urlVideo=[];
var compteur = 0;

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
					urlVideo[i]= tab['items'][i]['id']['videoId'];
					var miniature = tab['items'][i]['snippet']['thumbnails']['default']['url'];

					
					document.getElementById("listeVideos").innerHTML += "<div class='contenuVideo'><div  id='video" + i + "' ></div><br> <span class='titreVideos'>" + titre + "</span></div>";
					

				} if(compteur == 0){
					console.log("test1");
					initLecteur();}
					else{
					console.log("test2");
					 onYouTubeIframeAPIReady(); }
					 compteur +=1;
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
	
	
	setTimeout("demarer()", 55000);
}

function recherche(){
	
	var messageEntree = new SpeechSynthesisUtterance('Que voulez vous rechercher');
	window.speechSynthesis.speak(messageEntree);
	setTimeout("recognition.start()", 1500);
	
	videPlayer();
	document.getElementById("rechercheVocale").value="";
	
	setTimeout("recupYoutube(); recognition.stop();", 7000);
	setTimeout("demarer()", 12000);
	

}


var player=[];



function onYouTubeIframeAPIReady() { 
		
		for(var i=0; i<10; i++){
			
		 player[i] = new YT.Player('video'+ i, {
		 	height: '200',
          width: '200',
		 	videoId: `${urlVideo[i]}`,
		 	

										});
		
		}
}


function playVid(){
	var demande = document.getElementById("rechercheVocale").value;
	var last = demande.substring(demande.length - 1);
	console.log(last);
	last = Number(last) - 1;
	
	console.log(last);
	player[last].playVideo();
	recognition.stop();


}


function compter(){
	var compte = 9;

	var horloge = window.setInterval(function (){
		compte -= 1;
		document.getElementById("compteArebourd").innerHTML = `${compte}`;
		if(compte == 0) {console.log(compte);
			clearInterval(horloge)};
		
	}, 1000)

}

function videPlayer(){
	for(var i=0; i<10; i++){
		player[i]="";


	}

}


function stopVid(){
	for(var i=0; i<10; i++){
			
		 player[i].stopVideo();}


}