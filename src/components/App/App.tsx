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
    Authorization: '',
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
