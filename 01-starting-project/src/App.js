import React,{useState,useEffect,useCallback} from 'react';

import MoviesList from './components/MoviesList';
import './App.css';

function App() {
const [movies,setMovies] = useState([]);
const [isLoading,setIsLoading] = useState(false);
const [error,setError] = useState(null);

  const moviesDataHandler = useCallback(async () => {
    try{
      const response = await fetch("https://swapi.dev/api/films/");

      if(!response.ok){
        throw new Error ("somthing went wrong ...Retrying")
       }
  

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
      setIsLoading(false)
      setError(null)
    }catch(error){
      setError(error.message)
      console.log("error",error)
    }
   setIsLoading(false)

  },[]);
  
useEffect(()=>{
  moviesDataHandler();
},[moviesDataHandler]);


  return (
    <React.Fragment>
      <section>
        <button onClick={moviesDataHandler}>Fetch Movies</button>
      </section>
      <section>
      {!isLoading &&  <MoviesList movies={movies} /> }
      {isLoading && <img src="https://upload.wikimedia.org/wikipedia/commons/b/b1/Loading_icon.gif?20151024034921" alt="loading..."/>}
      {!isLoading && error && <p>{error}</p>}

      </section>
    </React.Fragment>
  );
}

export default App;
