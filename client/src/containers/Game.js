import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import Cards from '../components/Cards'
import NameForm from '../components/NameForm'
import { useSelector, useDispatch } from 'react-redux'
import { start, flipCard, checkMatch, gameOver } from '../actions/gameActions';
import { fetchImages, setLoading } from '../actions/imageActions';

const Game = () => {
  const [state, setState] = useState({})

  const images = useSelector(state => state.images);
  const game = useSelector(state => state.game);
  // const [flippedCards, setFlippedCards] = useState([])
  const [artists, setArtists] = useState([])
  const [loading, setLoading] = useState(false)

  let navigate = useNavigate();

  const dispatch = useDispatch();

  const [fetchingArtists, setFetchingArtists] = useState(false)

  useEffect(() => {
    setFetchingArtists(true)
    fetchArtists()
  }, [])

  useEffect(() => {
    if (game.flippedCards.length === 2) {
      dispatch(checkMatch())
    }
  }, [game])

  const fetchArtists = () => {
    fetch(`/api/artists`)
      .then(response => response.json())
      .then(data => {
        setArtists(data.artists)
      }).then(() => setFetchingArtists(false)).catch((error) => console.log(error));
  }

  const handleArtistChange = (artistSlug) => {
    dispatch(fetchImages(artistSlug))
    setLoading(true)
    setState({ ...state, artistSlug })
  }


  const dispatchFlipCard = (id) => {
    dispatch(flipCard(id))
  }


  const handleArtistSubmit = (event) => {
    event.preventDefault();
    if (game.flippedCards.length !== 2) {
      dispatch(start(images.images))
    }
  }

  const handleSubmit = (event) => {
    event.preventDefault();
    dispatch(gameOver(
      state.counter,
      state.name,
      state.artistSlug,
    ))
    setState({ ...state, name: '' })
    navigate('/scores')
  }

  const handleNameChange = (event) => {
    setState({ ...state, name: event.target.value })
  };

  if (artists.length === 0) {
    return (<div>Loading...</div>)
  }

  return (
    <div className="game">

      <form value={state.artistSlug} onSubmit={(e) => handleArtistSubmit(e)}>
        <label>
          <select onChange={(e) => handleArtistChange(e.target.value)}>
            <option hidden disabled selected value> -- pick an artist -- </option>
            {artists.map(artist => {
              return <option value={artist.slug} key={artist.slug}>{artist.name}</option>
            })}
          </select>
        </label>
        <button>Start New Game</button>
      </form>
      <div className="turn-count">Round: {game.counter}</div>
      {!images.loading ?
        <Cards cards={game.cards} flipCard={(id) => dispatchFlipCard(id)} disableClick={game.disableClick} />
        : ""
      }
      {game.gameOver ?
        <NameForm handleSubmit={handleSubmit} handleChange={handleNameChange} gameOver={game.gameOver} name={state.name} />
        : ""
      }
    </div>
  );
}

export default Game;
