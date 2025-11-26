import {useEffect, useState} from 'react'
import gameData from '../data/game.json';

interface Game{
    id: number;
    name: string;
    platforms?: string[];
    genres?: string[];
    released?: string;
    background_image?: string;
    video_url?: string;
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
      // Convert the local JSON into the FetchGames shape expected by this component.
      const results: Game[] = gameData.map((g: any) => ({
        id: g.id,
        name: g.name,
        platforms: g.platforms
          ? g.platforms.map((p: any) => p.platform?.name ?? p.name ?? String(p))
          : undefined,
        genres: g.genres ? g.genres.map((gg: any) => gg.name ?? String(gg)) : undefined,
        released: g.released,
        background_image: g.background_image,
        video_url: g.video_url,
      }));

      setGames({
        count: results.length,
        results,
      });
    } catch (err) {
      setError('Failed to load games');
    }
  }, []); 





    return(
        <>
        {error && <p>{error}</p>}
        <h1>Games List ({games.count})</h1>
        <ul>
            {games.results.map(game => <li key={game.id}>
            <h2>{game.name}</h2>
            {game.platforms && <p>Platforms: {game.platforms.join(', ')}</p>}
            {game.genres && <p>Genres: {game.genres.join(', ')}</p>}
            {game.released && <p>Released: {game.released}</p>}
            {game.background_image && (
              <img src={game.background_image} alt={game.name} width={300} />
            )}
        </li>)}
        </ul>
        </>
    );

}
export default GameGrid