import React, { useEffect, useState } from 'react'
import { useHistory } from "react-router-dom";
import Cards from '../components/Cards'
import NameForm from '../components/NameForm'
import { initiateCards, checkGameOver } from '../helpers/game'
import axios from 'axios'

const Game = () => {
  const history = useHistory();
  const [props, setProps] = useState({ counter: 0 })
  const [loading, setLoading] = useState(true)
  const [flippedCards, setFlippedCards] = useState([])
  const [cards, setCards] = useState([])
  const [disableClick, setDisableClick] = useState(false)
  const [isGameOver, setIsGameOver] = useState(false)

  useEffect(() => {
    axios.get('/api/artists')
      .then(response => {
        setProps({ ...props, artists: response.data.artists })
      })
      .then(() => { setLoading(false) })
      .catch((error) => console.log(error));
  }, [])

  useEffect(() => {
    if (flippedCards.length === 2) {
      checkMatch()
    }
  }, [JSON.stringify(flippedCards)])

  const reset = () => {
    setProps({ ...props, counter: 0 })
    setIsGameOver(false)
    setDisableClick(false)
    setFlippedCards([])
  }

  const checkMatch = () => {
    const tempCards = [...cards]
    const card0 = tempCards.find(card => card.id === flippedCards[0]);
    const card1 = tempCards.find(card => card.id === flippedCards[1]);
    if (card0.image !== card1.image) {
      card0.isFlipped = false
      card1.isFlipped = false
    }

    setTimeout(() => {
      setDisableClick(false)
      setCards(tempCards)
      setFlippedCards([])
      if (checkGameOver(cards)) {
        setIsGameOver(true)
        return;
      }
    }, 1000);
  }

  const handleArtistSubmit = (e) => {
    e.preventDefault();

    axios.get(`/api/artists/${props.artistSlug}/images`)
      .then(response => {
        setProps({ ...props, images: response.data.images })
      })
      .then(() => {
        const newCards = initiateCards(props.images)
        setCards([...newCards])
        setProps({ ...props, counter: 0 })
      })
      .then(() => { setLoading(false) })
      .catch((error) => console.log(error));
  }

  const flipCard = (id) => {
    const tempFlippedCards = [...flippedCards]

    //Do nothing is click is disabled or if a card is clicked twice
    if (disableClick || (tempFlippedCards.length > 0 && tempFlippedCards[0] === id)) {
      return;
    }

    const tempCards = [...cards];

    tempCards[id].isFlipped = true;
    tempFlippedCards.push(id)
    setCards(tempCards)
    setFlippedCards([...tempFlippedCards])

    if (tempFlippedCards.length === 2) {
      setDisableClick(true)
      setProps({ ...props, counter: props.counter + 1 })
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault();

    const score = JSON.stringify({
      game: {
        total: props.counter,
        name: props.name,
        artistSlug: props.artistSlug,
      }
    });

    fetch(`/api/games`, {
      method: "post", body: score, headers: { "Content-Type": "application/json" }
    })
      .then(response => response.json())
      .then(() => {
        history.push('/scores')
      })
  }

  const handleCancel = (e) => {
    e.preventDefault();
    reset()
  }

  if (loading) {
    return (<div>Loading...</div>)
  }

  return (
    <div className="game">
      <form value={props.artistSlug} onSubmit={(e) => handleArtistSubmit(e)}>
        <label>
          <select onChange={(e) => setProps({ ...props, artistSlug: e.target.value })}>
            <option hidden disabled selected value> -- pick an artist -- </option>
            {props.artists.map(artist => {
              return <option value={artist.slug} key={artist.slug}>{artist.name}</option>
            })}
          </select>
        </label>
        <button>Start New Game</button>
      </form>
      <div className="turn-count">Round: {props.counter}</div>
      {!props.loading && cards.length > 0 &&
        <Cards
          cards={cards}
          flipCard={flipCard}
          disableClick={disableClick}
        />
      }
      {isGameOver &&
        <NameForm
          handleSubmit={(e) => handleSubmit(e)}
          handleChange={(e) => setProps({ ...props, name: e.target.value })}
          handleCancel={(e) => handleCancel(e)}
          name={props.name}
        />
      }
    </div>
  );
}

export default Game;
