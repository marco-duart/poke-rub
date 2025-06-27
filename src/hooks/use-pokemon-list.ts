import { useState, useEffect, useCallback } from 'react';
import { PokemonService } from '../services/pokemon';
import { PokemonDTO } from '../services/pokemon/DTO';

export function usePokemonList(initialLimit = 20) {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [pokemons, setPokemons] = useState<
    PokemonDTO.GetPokemonList.Response['results']
  >([]);
  const [limit, setLimit] = useState(initialLimit);

  const fetchPokemons = useCallback(async () => {
    try {
      setLoading(true);
      const data = await PokemonService.getPokemonList(limit);
      setPokemons(data.results);
    } catch (err) {
      setError('Falha ao carregar a lista de Pokémon');
    } finally {
      setLoading(false);
    }
  }, [limit]);

  const loadMore = () => {
    setLimit(prev => prev + 20);
  };

  useEffect(() => {
    fetchPokemons();
  }, [fetchPokemons]);

  return {
    loading,
    error,
    pokemons,
    loadMore,
    refetch: fetchPokemons,
  };
}
