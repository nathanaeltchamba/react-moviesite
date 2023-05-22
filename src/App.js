import { useEffect, useState } from "react";
import MovieCard from "./MovieCard";
import SearchIcon from './search.svg'
import './App.css'

const API_URL = 'http://www.omdbapi.com?apikey=3c379e91';

function App() {

  const [movies, setMovies] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' || e.key === 'Return') {
      searchMovies(searchTerm)
    }
  }

  const searchMovies = async (title) => {
    const response = await fetch(`${API_URL}&s=${title}`)
    const data = await response.json()

    setMovies(data.Search)
  }

  useEffect(() => {
    searchMovies('Avengers');
  }, []);


  return (
     <div className="app">
      <h1>ScreenMagnet</h1>

      <div className="search">
        <input placeholder="Search for Movies"
        value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)}/>
        <img src={SearchIcon} alt="search" onClick={() => searchMovies(searchTerm)}
        onKeyDown={handleKeyPress}/>
      </div>

      {
        movies?.length > 0
        ? (
          <div className="container">
            {movies.map((movie) => (
              <MovieCard movie={movie}/>
            ))}
          </div>    
        ) :
        (
          <div className="empty">
            <h2>No results found</h2>
          </div>
        )
      }

      
     </div>
  );
}

export default App;
