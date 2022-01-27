const API_KEY = ['fbb15a9f9d5f71c3e0cec53b5fac6763', 'd95891b3a0mshc9f33bea7c2d427p142e56jsn2c84db581d64'];
const API_BASE = ['https://api.themoviedb.org/3', 'https://imdb8.p.rapidapi.com/'];
/*infelizmente não consegui fazer a API_KEY da Imdb funcionar, porem no tutorial que vi, a key do Tmdb funciona
tentei reutilizar boa parte do codigo para implementar a key da Imdb mas não tive sucesso,
boa parte do codigo em JS eu não escrevi de cabeça, pesquisei muito no google para tentar entender e implementar,
acredito que quando estiver mais avançado no conhecimento em JS poderei voltar e conseguir sucesso em minha tentativa */

/*
- lançamentos
- populadres
- em alta (top rated)
- ação
*/


// const basicFetch = async (endpoint) => {
//     const req = await fetch (`${API_BASE[0]}${endpoint}&api_key=${API_KEY}`);
//     const json = await req.json();
//     return json;
// }

const imdbData = async (a, path) => {
    fetch(`${API_BASE[1]}${path}${a}`, 
    {
        "method": "GET",
        "headers": {
            "x-rapidapi-host": "imdb8.p.rapidapi.com",
            "x-rapidapi-key": API_KEY[1]
        }
    })
    .then(response => response.json())
    .then(result => {
      if (result !== null && result !== 404) {
        return result[0]
      } else { 
        console.log('error 404') 
      }
    })
    .catch(err => {console.error(err) })
}

const imdbFind = async(id) => {
    fetch(`${API_BASE[1]}title/find?q=${id}`, 
        {   
        "method": "GET",
	    "headers": {
		    "x-rapidapi-host": "imdb8.p.rapidapi.com",
		    "x-rapidapi-key": API_KEY[1]
	    }
    })
    .then(response => response.json())
    .then(result => {
      if (result !== null && result !== 404) {
        console.log(result)
      } else { 
        console.log('error 404') 
      }
    })
    .catch(err => {
	    console.error(err);
    });
}

export default {
    getHomeList: async () => {
        return [
            {
                slug: 'lançamentos',
                title: 'Proximos Lançamentos',
                items: await imdbData("Matrix", "auto-complete?q=")
            },
            {
                slug: 'Popular Movies',
                title: 'Filmes Populares',
                items: await imdbFind( await imdbData("", "title/get-most-popular-movies")) 
            },
            // {
            //     slug: 'Top Rated',
            //     title: 'Em Alta',
            //     items: await imdbData(`actors`)
            // },
            // {
            //     slug: 'Action',
            //     title: 'Ação',
            //     items: await imdbData(``)
            // },
        ];
    },
    getMovieInfo: async (movieId, type) => {
        let info = {};
    
        if(movieId) {
            switch(type) {
                case 'movie':
                    info = await imdbData(`${movieId}?q=${API_KEY[0]}`);
                break;
                case 'tv':
                    info = await imdbData(`${movieId}?q=${API_KEY[0]}`);
                break;
                default:
                    info = null;
                break; 
            }
        }

        return info;
    }
}