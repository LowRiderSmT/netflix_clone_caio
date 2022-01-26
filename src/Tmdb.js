const API_KEY = ['fbb15a9f9d5f71c3e0cec53b5fac6763', 'd95891b3a0mshc9f33bea7c2d427p142e56jsn2c84db581d64'];
const API_BASE = ['https://api.themoviedb.org/3', 'https://imdb8.p.rapidapi.com/'];


/*
- originais netflix
- recomendados (trending)
- em alta (top rated)
- ação
- terror
- romance
- documentarios
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
                    info = await imdbData(`/movie/${movieId}?language=pt-BR&api_key=${API_KEY}`);
                break;
                case 'tv':
                    info = await imdbData(`/tv/${movieId}?language=pt-BR&api_key=${API_KEY}`);
                break;
                default:
                    info = null;
                break; 
            }
        }

        return info;
    }
}