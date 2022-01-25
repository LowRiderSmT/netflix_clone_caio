const API_KEY = 'fbb15a9f9d5f71c3e0cec53b5fac6763';
const API_BASE = 'https://api.themoviedb.org/3';

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
//     const req = await fetch (`${API_BASE}${endpoint}`);
//     const json = await req.json();
//     return json;
// }

const imdbData = async (a) => {
    fetch(`${API_BASE}?q=${a}`, {
        "method": "GET",
        "headers": {
            "x-rapidapi-host": "imdb8.p.rapidapi.com",
            "x-rapidapi-key": API_KEY
        }
    })
    .then(response => {
        console.log(response);
    })
    .catch(err => {
        console.error(err);
    });
}

export default {
    getHomeList: async () => {
        return [
            {
                slug: 'originals',
                title: 'Originais do Netflix',
                items: await basicFetch(`/discover/tv?with_network=213&language=pt-BR&api_key=${API_KEY}`)
            },
            {
                slug: 'trending',
                title: 'Recomendados para Você',
                items: await basicFetch(`/trending/all/week?language=pt-BR&api_key=${API_KEY}`)   
            },            
            {
                slug: 'Top Rated',
                title: 'Em Alta',
                items: await basicFetch(`/movie/top_rated?=language=pt-BR&api_key=${API_KEY}`)
            },
            {
                slug: 'Action',
                title: 'Ação',
                items: await basicFetch(`/discover/movie?with_genres=28&language=pt-BR&api_key=${API_KEY}`)
            },
            {
                slug: 'Comedy',
                title: 'Comédia',
                items: await basicFetch(`/discover/movie?with_genres=35&language=pt-BR&api_key=${API_KEY}`)
            },
            {
                slug: 'Horror',
                title: 'Terror',
                items: await basicFetch(`/discover/movie?with_genres=27&language=pt-BR&api_key=${API_KEY}`)
            },            
            {
                slug: 'Romance',
                title: 'Romance',
                items: await basicFetch(`/discover/movie?with_genres=10749&language=pt-BR&api_key=${API_KEY}`)
            },
            {
                slug: 'Documentary',
                title: 'Documentarios',
                items: await basicFetch(`/discover/movie?with_genres=99&language=pt-BR&api_key=${API_KEY}`)
            },
        ];
    },
    getMovieInfo: async (movieId, type) => {
        let info = {};
    
        if(movieId) {
            switch(type) {
                case 'movie':
                    info = await basicFetch(`/movie/${movieId}?language=pt-BR&api_key=${API_KEY}`);
                break;
                case 'tv':
                    info = await basicFetch(`/tv/${movieId}?language=pt-BR&api_key=${API_KEY}`);
                break;
                default:
                    info = null;
                break; 
            }
        }

        return info;
    }
}