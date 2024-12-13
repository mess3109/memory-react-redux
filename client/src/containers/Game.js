import React, { useEffect, useState } from 'react'
import { useHistory } from "react-router-dom";
import Cards from '../components/Cards'
import NameForm from '../components/NameForm'
import { shuffle, backupImages } from '../helpers/game'
import '../styles/Cards.css'

const Game = () => {

  const history = useHistory();
  const [props, setProps] = useState({})
  const [loading, setLoading] = useState(true)
  const [flippedCards, setFlippedCards] = useState([])
  const [cards, setCards] = useState([])
  const [counter, setCounter] = useState(0)
  const [disableClick, setDisableClick] = useState(false)
  const [isGameOver, setIsGameOver] = useState(false)

  useEffect(() => {
    fetch(`/api/artists`)
      .then(response => response.json())
      .then(data => {
        setProps({ ...props, artists: data.artists })
      }).then(() => { setLoading(false) }).catch((error) => console.log(error));
  }, [])

  useEffect(() => {
    if (flippedCards.length === 2) {
      checkMatch()
    }
  }, [JSON.stringify(cards), JSON.stringify(flippedCards), isGameOver])


  const checkMatch = () => {

    if (flippedCards[0].image !== flippedCards[1].image) {
      cards.find(card => card.id === flippedCards[0].id).isFlipped = false
      cards.find(card => card.id === flippedCards[1].id).isFlipped = false
    }

    const unflippedCard = cards.find((card) => { return card.isFlipped === false })

    if (!unflippedCard) {
      setIsGameOver(true)
    }

    setTimeout(() => {
      setCards([...cards])
      setFlippedCards([])
      setDisableClick(false)
    }, 1000);
  }

  const handleArtistSubmit = (e) => {
    e.preventDefault();

    fetch(`/api/artists/${props.artistSlug}/images`)
      .then(response => response.json())
      .then(data => setProps({ ...props, images: data.images }))
      .then(() => {
        let originalCards = backupImages;
        if (flippedCards.length !== 2) {
          if (props.images && props.images.length > 0) {
            originalCards = images.map(image => image.url)
            while (originalCards.length < 10) {
              let num = Math.floor(Math.random() * backupImages.length)
              if (!originalCards.find(image => image === backupImages[num])) {
                originalCards.push(backupImages[num])
              }
            }
          }

          //Test environment
          if (process.env.REACT_APP_MAX_CARDS > 0) {
            originalCards = originalCards.slice(0, process.env.REACT_APP_MAX_CARDS)
          }
          let images = shuffle(originalCards.concat(originalCards))

          let cards = []
          for (let i = 0; i < images.length; i++) {
            cards[i] = {
              id: i,
              image: images[i],
              isFlipped: false
            }
          }
          setCards([...cards])
        }
      })
  }

  const flipCard = (id) => {
    cards[id].isFlipped = true;

    if ((flippedCards.length === 0 || flippedCards[0].id !== id) && flippedCards.length < 2) {
      flippedCards.push(cards[id])
    }
    if (flippedCards.length === 2) {
      setCounter(counter + 1)
      setDisableClick(true)
    }

    setCards([...cards])
    setFlippedCards(flippedCards)
  }

  const handleSubmit = (e) => {
    e.preventDefault();

    const score = JSON.stringify({
      game: {
        total: counter,
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
      <div className="turn-count">Round: {counter}</div>
      {!props.loading && cards.length > 0 &&
        < Cards
          cards={cards}
          flipCard={flipCard}
          disableClick={disableClick}
        />
      }
      {isGameOver &&
        <NameForm handleSubmit={(e) => handleSubmit(e)} handleChange={(e) => setProps({ ...props, name: e.target.value })} gameOver={isGameOver} name={props.name} />
      }
    </div>
  );
}

export default Game;
