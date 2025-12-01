import React, { useEffect, useState } from 'react';
import apiClient from '../services/api-client';

interface Game {
  id: number,
  title: string
}

const GameGrid = () => {
  const [games, setGames] = useState<Game[]>([]);
  const [error, setError] = useState('');

  const proxyUrl = 'https://api.allorigins.win/raw?url=';
  const targetUrl = 'https://www.freetogame.com/api/games';

  useEffect(() => {
    apiClient.get<Game[]>(proxyUrl + encodeURIComponent(targetUrl))
      .then(res => setGames(res.data))
      .catch(err => setError(err.message))
  }, []);

  return (
    <div>

    <ul>
      {games.map(game => <li key={game.id}>{game.title}</li>)}
    </ul>
    </div>
  )
}

export default GameGrid
