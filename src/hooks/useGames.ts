import { useEffect, useState } from "react";
import apiClient from "../services/api-client";
import { CanceledError } from "axios";

export interface Game {
  id: number,
  title: string,
  thumbnail?: string,
  platform?: string,
}

const useGames = () => {
    const [games, setGames] = useState<Game[]>([]);
    const [error, setError] = useState('');
    const [isLoading, setLoading] = useState(false);

    const targetUrl = 'https://www.freetogame.com/api/games?platform=pc&category=mmorpg';
    const proxyUrl = 'https://api.allorigins.win/raw?url=';
    
    useEffect(() => {
        setLoading(true);
        const controller = new AbortController();
        apiClient.get<Game[]>(proxyUrl + encodeURIComponent(targetUrl), {signal: controller.signal})
          .then((res) => {
            setGames(res.data);
            setLoading(false);
          })
          .catch((err) => {
              if(err instanceof CanceledError) return;
              setError(err.message);
              setLoading(false);
           });

        return () => controller.abort();
    }, []);

    return {games, error, isLoading}
}
export default useGames;