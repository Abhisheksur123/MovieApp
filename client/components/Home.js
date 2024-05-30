// components/Home.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Home = () => {
  const [lists, setLists] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    const fetchLists = async () => {
      try {
        const res = await axios.get('/api/movies/list', {
          headers: { 'x-auth-token': localStorage.getItem('token') },
        });
        setLists(res.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchLists();
  }, []);

  const handleSearch = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.get(`http://www.omdbapi.com/?s=${searchTerm}&apikey=YOUR_OMDB_API_KEY`);
      setMovies(res.data.Search);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <h1>Movie Lists</h1>
      {lists.map((list) => (
        <div key={list._id}>
          <h2>{list.name}</h2>
          <ul>
            {list.movies.map((movie, index) => (
              <li key={index}>{movie}</li>
            ))}
          </ul>
        </div>
      ))}

      <h2>Search Movies</h2>
      <form onSubmit={handleSearch}>
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Search for a movie..."
          required
        />
        <button type="submit">Search</button>
      </form>

      {movies.length > 0 && (
        <div>
          <h3>Results</h3>
          <ul>
            {movies.map((movie) => (
              <li key={movie.imdbID}>{movie.Title}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default Home;
