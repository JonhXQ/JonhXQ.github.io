import { useState, useEffect } from 'react'
import { useSearch } from '../components/SearchContext'

const Home = () => {
  /* Variables */
  const ApiUrl = 'https://api.themoviedb.org/3'
  const ImgUrl = 'https://image.tmdb.org/t/p'
  const ApiKey = 'bf8e828df71d796656a0a256bfdd255c'

  /* Variables de ESTADO */
  const [movies, setMovies] = useState([])
  const { searchTerm, setSearchTerm } = useSearch()

  /* Función para hacer petición a TMDB API */
  useEffect(() => {
    const type = searchTerm ? 'search' : 'discover'
    const URL = `${ApiUrl}/${type}/movie?api_key=${ApiKey}`

    fetch(URL)
      .then(response => response.json())
      .then(data => {
        console.log(data.results, 'data')
        setMovies(data.results)
      })
  }, [])
  return (
    <div>
      <div className='container mt-3'>
        <div className='row'>
          {
            movies.map((movie) => {
              return (
                <div key={movie.id} className='col-md-4 mb-3'>
                  <img src={`${ImgUrl}/w300${movie.poster_path}`} />
                  <h3>{movie.original_title}</h3>
                </div>
              )
            })
          }
        </div>
      </div>
    </div>
  )
}

export default Home
