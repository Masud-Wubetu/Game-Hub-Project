import { useEffect, useState } from "react";
import apiClient from "../services/api-client";
import { CanceledError } from "axios";

interface Game {
  id: number,
  title: string
}

const useGames = () => {
    const [games, setGames] = useState<Game[]>([]);
    const [error, setError] = useState('');

    const targetUrl = 'https://www.freetogame.com/api/games?platform=pc&category=mmorpg';
    const proxyUrl = 'https://api.allorigins.win/raw?url=';
    
    useEffect(() => {
        const controller = new AbortController();
        apiClient.get<Game[]>(proxyUrl + encodeURIComponent(targetUrl), {signal: controller.signal})
          .then(res => setGames(res.data))
          .catch(err => {
              if(err instanceof CanceledError) return;
              setError(err.message)
           });

        return () => controller.abort();
    }, []);

    return {games, error}
}
export default useGames;