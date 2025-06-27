import { useState, useEffect } from 'react';
import { PokemonService } from '../services/pokemon';
import { PokemonDTO } from '../services/pokemon/DTO';

export function usePokemonDetails(identifier: string | number) {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [pokemon, setPokemon] = useState<PokemonDTO.Model | null>(null);

  useEffect(() => {
    const fetchPokemon = async () => {
      try {
        setLoading(true);
        const data = await PokemonService.getCompletePokemonData(identifier);
        setPokemon(data);
      } catch (err) {
        setError('Pokémon não encontrado');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchPokemon();
  }, [identifier]);

  return { loading, error, pokemon };
}
