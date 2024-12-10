import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import Score from '../components/Score'
import '../styles/Scores.css'


function Scores() {

  const [scores, setScores] = useState([])
  const [fetchingScores, setFetchingScores] = useState(false)

  useEffect(() => {
    setFetchingScores(true)
    fetch(`/api/games`)
      .then(response => response.json())
      .then(data => {
        setScores(data.games)
        setFetchingScores(false)
      })
  }, [])

  if (fetchingScores) {
    return (<div>Loading Scores...</div>)
  }

  return (
    <div className="scores" >
      <div className="score-container"><span className="date"><h3>Date</h3></span><span className="name"><h3>Name</h3></span><span className="score"><h3>Rounds</h3></span></div>
      {scores.length === 0 ? '' : scores.map(score =>
        <Score
          key={score.id}
          id={score.id}
          name={score.name}
          counter={score.total}
          date={score.createdAt}
        />
      )}
    </div>
  );
}

export default Scores;

