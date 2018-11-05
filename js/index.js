var animeRecs = {
	Personal:{
		Section:"Personal Top 10",
		Top:[
		{
			animeTitle:"Gosick",
			animeRank:1
		},{
			animeTitle:"Toradora!",
			animeRank:2
		},{
			animeTitle:"Ginga Tetsudou 999",
			animeRank:3
		},{
			animeTitle:"JoJo's Bizarre Adventure 2012",
			animeRank:4
		},{
			animeTitle:"ef: A Tale of Memories.",
			animeRank:5
		},{
			animeTitle:"Steins;Gate",
			animeRank:6
		},{
			animeTitle:"Clannad",
			animeRank:7
		},{
			animeTitle:"Detroit Metal City",
			animeRank:8
		},{
			animeTitle:"Tengen Toppa Gurren Lagann",
			animeRank:9
		},{
			animeTitle:"Hellsing Ultimate",
			animeRank:10
		}
		]
	},
	SpaceOpera:{
		Section:"Space Opera Top 10",
		Top:[
		{
			animeTitle:"Ginga Tetsudou 999",
			animeRank:1
		},{
			animeTitle:"Ginga Eiyuu Densetsu",
			animeRank:2
		},{
			animeTitle:"Interstella 5555",
			animeRank:3
		},{
			animeTitle:"Uchuu Senkan Yamato",
			animeRank:4
		},{
			animeTitle:"Uchuu Kaizoku Captain Harlock",
			animeRank:5
		},{
			animeTitle:"Ginga Tetsudou Monogatari",
			animeRank:6
		},{
			animeTitle:"Sidonia no Kishi",
			animeRank:7
		},{
			animeTitle:"Heroic Age",
			animeRank:8
		},{
			animeTitle:"Space Dandy",
			animeRank:9
		},{
			animeTitle:"Mouretsu Pirates",
			animeRank:10
		}
		]
	}
};
document.querySelector("header").innerHTML = "<h2>"+animeRecs.Personal.Section+"</h2>";
for(var i=0;i<=animeRecs.Personal.Top.length;i++){
	var request = new XMLHttpRequest();
	request.open("GET","https://api.jikan.moe/v3/search/anime?q="+animeRecs.Personal.Top[i].animeTitle);
	request.onreadystatechange = function(){
		if(this.readyState === 4){
			var data = JSON.parse(this.responseText).results[0],
					animeTitle = data.title,
					animeURL = data.url;
					animeSRC = data.image_url,
					//animeIMG = animeSRC.replace(/(\.[^.]*)$/i,'l$1');
					animeIMG = animeSRC.substring(0,animeSRC.lastIndexOf("."))+"l"+animeSRC.substring(animeSRC.lastIndexOf("."));
				console.log(animeIMG);
			document.querySelector("main").innerHTML += '<a href="'+animeURL+'" target="_blank"><figure><img src="'+animeIMG+'" alt="'+animeTitle+'"><figcaption>'+animeTitle+'</figcaption></figure></a>';
		}
	};
	request.send();
}
