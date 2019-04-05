let animeMD = "https://raw.githubusercontent.com/RafaelDeJongh/Anime-Recommendations/master/README.md";
fetch(animeMD).then(res=>res.text()).then((data)=>{
function regMatches(group){group||(group=1);
	let matches=[],match,regex = /(?:- |\d\. )(.+?) <!-- ([^ ]+).{3}([^ ]+)/gm;
	while(match=regex.exec(data)){matches.push(match[group]);}
	return matches;
}
let animeTitle = regMatches(1),
			animeURL = regMatches(2),
			animeIMG = regMatches(3);
			animeC = 0;
	while(animeC < animeTitle.length){
			document.querySelector("main").innerHTML += '<a href="https://myanimelist.net/anime/'+animeURL[animeC]+'" target="_blank"><figure><img src="https://cdn.myanimelist.net/images/anime/'+animeIMG[animeC]+'" alt="'+animeTitle[animeC]+'"><figcaption>'+animeTitle[animeC]+'</figcaption></figure></a>';
		animeC++;
		}
}).catch(err=>{throw err});
