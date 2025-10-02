// import { useState } from 'react'
import SearchBar from '../SearchBar/SearchBar';
import MovieGrid from '../MovieGrid/MovieGrid'
import axios from 'axios';
import type { Movie } from '../../types/movie';
import toast, { Toaster } from 'react-hot-toast';

import css from './App.module.css';
import { useState } from 'react';

interface ResponseData {
  results:  Movie[],
}

function App() {

  const [ movies, setMovies] = useState<Movie[]>([]);
  
  const handleSearch = async (searchQuery: string) => {
    try {
      const options = {
  headers: {
    Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI5ZGY0ZTI3OTdhN2ZmOWEwZWYwY2I2NmM2YWViNTYwMCIsIm5iZiI6MTcyMjI0MDA1Ny43MDg5OTk5LCJzdWIiOiI2NmE3NGMzOTI2NTdiOWJiMGE2NjFjMDIiLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0.-lwmE14uQHE9eS4ney8mV0-8YKDXStqyiPPCxE1jTQ4',
    accept: 'application/json',
  }
};
      const {data: {results}} = await axios.get<ResponseData>(`https://api.themoviedb.org/3/search/movie?query=${searchQuery}`, options)
      setMovies(results);
      if (results.length === 0) {
       toast("No movies found for your request.", {
        duration: 3000,
        position: "top-center",
      });
      return;
    };
    } catch (error) {
      console.log(error)
    }
   };
  return (
    <div className={css.app}>
      <SearchBar onSubmit={handleSearch} />
      <MovieGrid movies={movies} />
      <Toaster />
    </div>
  )
}

export default App
