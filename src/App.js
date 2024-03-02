import React from 'react';
import {BrowserRouter as Router, Routes,Route,Navigate,useLocation} from 'react-router-dom';
import Home from './pages/Home';
import Movies from './pages/Movies';
import TvShows from './pages/TvShows';
import Genre from './pages/Genre';
import GenreShow from './pages/ShowGenre';
import { QueryClient, QueryClientProvider, useQuery } from "react-query";
import './App.css';

function App() {

  const queryClient = new QueryClient();


  return (

    <QueryClientProvider client={queryClient}>
    <Router>

      <Routes>
      <Route path={'/movie/:code/:id'} Exact  element={<Genre />} />
      <Route path={'/show/:code/:id'} Exact  element={<GenreShow />} />
      <Route path={'/movies'} Exact  element={<Movies />} />
      <Route path={'/tvshows'} Exact  element={<TvShows />} />
      <Route path={'/'} Exact  element={<Home />} />




      </Routes>

    </Router>
    </QueryClientProvider>
  );
}



export default App;
