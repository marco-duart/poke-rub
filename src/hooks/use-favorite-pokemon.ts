import { useFavorites } from '../contexts/favorite-context';
import { PokemonDTO } from '../services/pokemon/DTO';

export function useFavoritePokemon(pokemon: PokemonDTO.Model | null) {
  const { addFavorite, removeFavorite, isFavorite } = useFavorites();

  const toggleFavorite = async () => {
    if (!pokemon) return;

    if (isFavorite(pokemon.id)) {
      await removeFavorite(pokemon.id);
    } else {
      await addFavorite(pokemon);
    }
  };

  return {
    isFavorite: pokemon ? isFavorite(pokemon.id) : false,
    toggleFavorite,
  };
}
