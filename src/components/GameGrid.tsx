import {useEffect, useState} from 'react'
import gameData from '../data/game.json';

interface Game{
    id: number;
    name: string;
}

interface FetchGames{
    count: number;
    results: Game[];
}

const GameGrid = () => {
    const [games, setGames] = useState<FetchGames>({count: 0, results: []});
    const [error, setError]  = useState<string>('');

    useEffect(() => {
    try {
      // Wrap the local JSON in a FetchGames object
      setGames({
        count: gameData.length,
        results: gameData,
      });
    } 
    catch (err) {
      setError('Failed to load games');
    }
  }, []); 





    return(
        <>
        {games.results.map(game => <li key={game.id}>{game.name}</li>)}
        </>
    );

}
export default GameGrid