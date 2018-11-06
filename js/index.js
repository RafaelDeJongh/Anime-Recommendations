let animeCon = "https://data.rafaeldejongh.com/data/sites/AnimeRecommendations/data/anime.json";
let jikanAPI = "https://api.jikan.moe/v3/search/anime?q=";
let animeMD = "https://raw.githubusercontent.com/RafaelDeJongh/Anime-Recommendations/master/data/anime.md";

/*fetch(animeCon).then(response => response.json()).then((animeRecs)=>{
	document.querySelector("header").innerHTML = "<h2>"+animeRecs.Action.Section+"</h2>";
		for(var i=0;i<=animeRecs.Action.Anime.length;i++){
			fetch(jikanAPI+animeRecs.Action.Anime[i].animeTitle).then(res=>res.json()).then((data)=>{
					var data = data.results[0],
							animeTitle = data.title,
							animeURL = data.url,
							animeSRC = data.image_url,
							animeIMG = animeSRC.substring(0,animeSRC.lastIndexOf("."))+"l"+animeSRC.substring(animeSRC.lastIndexOf("."));
					document.querySelector("main").innerHTML += '<a href="'+animeURL+'" target="_blank"><figure><img src="'+animeIMG+'" alt="'+animeTitle+'"><figcaption>'+animeTitle+'</figcaption></figure></a>';
			}).catch(err=>{throw err});
		}
}).catch(err=>{throw err});*/

//fetch(animeMD).then(res=>res.text()).then((data)=>{
	//var animeTitles = data.match(/(?<=- |\d\. ).*/g); //Change to a non lookbehind regex
		/*for(var i=0;i<animeTitles.length;i++){
				fetch(jikanAPI+animeTitles[i]).then(res=>res.json()).then((data)=>{
					var data = data.results[0],
							animeTitle = data.title,
							animeURL = data.url,
							animeSRC = data.image_url,
							animeIMG = animeSRC.substring(0,animeSRC.lastIndexOf("."))+"l"+animeSRC.substring(animeSRC.lastIndexOf("."));
					document.querySelector("main").innerHTML += '<a href="'+animeURL+'" target="_blank"><figure><img src="'+animeIMG+'" alt="'+animeTitle+'"><figcaption>'+animeTitle+'</figcaption></figure></a>';
			}).catch(err=>{throw err});
		}
}).catch(err=>{throw err});*/

fetch(animeMD).then(res=>res.text()).then((data)=>{
	const regex = /(?:- |\d\. )(.*)/g;
	while(animeTitles = regex.exec(data)){
		fetch(jikanAPI+animeTitles[1]).then(res=>res.json()).then((data)=>{
					var data = data.results[0],
							animeTitle = data.title,
							animeURL = data.url,
							animeSRC = data.image_url,
							animeIMG = animeSRC.substring(0,animeSRC.lastIndexOf("."))+"l"+animeSRC.substring(animeSRC.lastIndexOf("."));
					document.querySelector("main").innerHTML += '<a href="'+animeURL+'" target="_blank"><figure><img src="'+animeIMG+'" alt="'+animeTitle+'"><figcaption>'+animeTitle+'</figcaption></figure></a>';
			}).catch(err=>{throw err});
	}
}).catch(err=>{throw err});