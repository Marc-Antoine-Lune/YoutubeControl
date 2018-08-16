
	var SpeechRecognition = SpeechRecognition || webkitSpeechRecognition;

	var recognition = new SpeechRecognition();
	recognition.continuous = true;
	recognition.lang="fr-FR";
	recognition.onresult = function(event){

		
		for(var i=event.resultIndex; i<event.results.length; i++){
			var test = event.results[i][0].transcript;
			document.getElementById("rechercheVocale").value = test;

		}

	}

	


function demarer(){
	recognition.start();

	
	

	setTimeout("recupYoutube()", 5000);
	
		
}



function recupYoutube(){
		var x = document.getElementById("rechercheVocale");
		var request = new XMLHttpRequest();
		var recherche = x.value;
		var url = "https://www.googleapis.com/youtube/v3/search?&q=" + recherche + "&part=snippet&key=" + "AIzaSyD-9VMPpURE4Ng992hjjr20hlDA35kDWlo";
			
			request.open("GET", url);
			request.send();
			request.responseType = 'json';
		

			request.onload = function(){
				var tab = request.response;
				document.getElementById("listeVideos").innerHTML = "";

				for(var i=0; i<5; i++){
					var titre = tab['items'][i]['snippet']['title'];
					var urlVideo= tab['items'][1]['id']['videoId'];
					var miniature = tab['items'][i]['snippet']['thumbnails']['default']['url'];

					
					document.getElementById("listeVideos").innerHTML += "<li><img src=" + miniature + "><a href=https://www.youtube.com/watch?v=" + urlVideo + ">" + titre + "</a></li>";
				}
			}


}
