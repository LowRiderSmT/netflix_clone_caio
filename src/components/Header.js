import React from "react";
import './Header.css';
import SearchIcon from '@mui/icons-material/Search';


export default ({black}) => {
    return (
        <header className={black ? 'black' : ''}>
            <div className="header--Name">
               <strong>GazinFilms</strong>
            </div>
            <div className="header--SearchBar">
                <SearchIcon style={{fontSize: 30}} />
            </div>
            <div className="header--user">
                <a href="/">
                    <img src="https://avatars.githubusercontent.com/u/20944294?u=b4e26e488ca295bc7e349af221bc0b2b25ff860e&v=4" alt="Usuário" />
                </a>
            </div>
        </header>
    );
}