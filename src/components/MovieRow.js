import React, { useState } from 'react';
import './MovieRow.css';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import NavigateBeforeIcon from '@mui/icons-material/NavigateBefore';

/*esse com certeza foi o maior desafio que tive sucesso em completar no projeto,
o tutorial ensinava a implementação dos @material-ui para os icones de navegação,
porem não funcionavam devido a atualização da versão, fui do 0% (desconhecimento) ao 100%(entender o porque nao ter funcionado) 
em uma tarde de segunda-feira para conseguir fazer funcionar os icones */ 

export default ({title, items}) => {
    const [scrollX, setScrollX] = useState(0);

    const handleLeftArrow = () => {
        let x = scrollX + Math.round(window.innerWidth / 2);
        if(x > 0) {
            x = 0;
        }
        setScrollX(x);
    }

    const handleRightArrow = () => {
        let x = scrollX - Math.round(window.innerWidth / 2);
        let listW = items.results.length * 150;
        if((window.innerWidth - listW) > x) {
            x = (window.innerWidth - listW) - 75;
        }
        setScrollX(x); 
    }

    return (
        <div className="movieRow">
            <h2>{title}</h2>
            <div className="movieRow--left" onClick={handleLeftArrow}>
                <NavigateBeforeIcon style={{fontSize: 50}} />
            </div>
            <div className="movieRow--right" onClick={handleRightArrow}>
                <NavigateNextIcon style={{fontSize: 50}} />
            </div>
            <div className="movieRow--listarea">
                {/* <div className="movieRow--list" style={{
                    marginLeft: scrollX,
                    width: items.results.length * 150
                }}>
                    {items.results.length > 0 && items.results.map((item, key)=>(
                        <div key={key} className="movieRow--item">
                            <img src={`https://image.tmdb.org/t/p/w300${item.poster_path} `} alt={items.original_title} />
                        </div>
                    ))}
                </div> */}
            </div>
        </div>
    );
}