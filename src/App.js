import React, { useEffect, useState } from 'react';
import './App.css';
import Tmdb from './Tmdb'
import MovieRow from './components/MovieRow';
import FeaturedMovie from './components/FeaturedMovie';
import Header from './components/Header';
import { fontSize } from '@mui/system';


  export default () => {

    const [movieList, setMovieList] = useState ([])
    const [featuredData, setFeaturedData] = useState(null);
    const [blackHeader, setBlackHeader] = useState(false);

      useEffect(()=>{
        const loadAll = async () => {
          // Pegando a lista TOTAL
          let list = await Tmdb.getHomeList();
          setMovieList(list);
        

          // Pegando o Featured
          let originals = list.filter (i=>i.slug === 'originals');
          let randomChosen = Math.floor(Math.random() * (originals[0].items.results.length - 1));
          let chosen = originals[0].items.results[randomChosen];
          let chosenInfo = await Tmdb.getMovieInfo(chosen.id, 'tv');
          setFeaturedData(chosenInfo);
        }

        loadAll();
      }, []);

      useEffect(() =>{
        const scrollListener = () => {
          if(window.scrollY > 500) {
            setBlackHeader(true);
            }  else{
            setBlackHeader(false);
              }
          }

        window.addEventListener('scroll', scrollListener);
          return ()=> {
            window.removeEventListener('scroll', scrollListener);
          }
      }, []);

    return(
      <div className="page">

        <Header black={blackHeader} />

        {featuredData &&
            <FeaturedMovie item={featuredData} />
        }

        <section className="lists">
          {movieList.map((item, key)=>(
            <MovieRow key={key} title={item.title} items={item.items} />
             ))}
          </section>

          <footer>
            <div className='Gazin-footer'>
            <strong> GazinFilms </strong><br/>
            </div>
             Desenvolvido por @Caio Semensato <br/> 
          </footer>

          {movieList.length <= 0 &&
          <div className="loading">
            <img src="https://cdn-images-1.medium.com/max/1024/1*2B9jzdGvieTx98er34lZ0w.gif" alt="Carregando" />
          </div>
        }
      </div>
    );
  }