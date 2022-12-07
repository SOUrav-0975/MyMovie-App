import React,{useState} from 'react';

import MoviesList from './components/MoviesList';
import './App.css';

function App() {
const [movies,setMovies] = useState([])

  async function moviesDataHandler() {
    try{
      const response = await fetch("https://swapi.dev/api/films/");
      const data = await response.json();
      const moviesData = data.results.map((el)=>{
        return {
          id:el.episode_id,
          title:el.title,
          openingText:el.opening_crawl,
          releaseDate:el.release_date
        }
      })
      setMovies(moviesData)
    }catch(err){
      console.log("error",err)
    }
   

  }
  return (
    <React.Fragment>
      <section>
        <button onClick={moviesDataHandler}>Fetch Movies</button>
      </section>
      <section>
        <MoviesList movies={movies} />
      </section>
    </React.Fragment>
  );
}

export default App;
