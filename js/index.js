let animeCon ="https://data.rafaeldejongh.com/data/sites/AnimeRecommendations/data/anime.json";
let jikanAPI = "https://api.jikan.moe/v3/search/anime?q=";
fetch(animeCon).then(response => response.json()).then((animeRecs)=>{
	document.querySelector("header").innerHTML = "<h2>"+animeRecs.Personal.Section+"</h2>";
		for(var i=0;i<=animeRecs.Personal.Top.length;i++){
			fetch(jikanAPI+animeRecs.Personal.Top[i].animeTitle).then(res=>res.json()).then((data)=>{
					var data = data.results[0],
							animeTitle = data.title,
							animeURL = data.url,
							animeSRC = data.image_url,
							//animeIMG = animeSRC.replace(/(\.[^.]*)$/i,'l$1');
							animeIMG = animeSRC.substring(0,animeSRC.lastIndexOf("."))+"l"+animeSRC.substring(animeSRC.lastIndexOf("."));
					document.querySelector("main").innerHTML += '<a href="'+animeURL+'" target="_blank"><figure><img src="'+animeIMG+'" alt="'+animeTitle+'"><figcaption>'+animeTitle+'</figcaption></figure></a>';
			console.log(data);
			}).catch(err=>{ throw err});
		}
}).catch(err=>{throw err});