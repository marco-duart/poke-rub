import React, { createContext, useContext, useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { PokemonDTO } from '@services/pokemon/DTO';

type FavoritesContextData = {
  favorites: PokemonDTO.Model[];
  addFavorite: (pokemon: PokemonDTO.Model) => Promise<void>;
  removeFavorite: (pokemonId: number) => Promise<void>;
  isFavorite: (pokemonId: number) => boolean;
};

const FavoritesContext = createContext<FavoritesContextData>({} as FavoritesContextData);

export const FavoritesProvider: React.FC = ({ children }) => {
  const [favorites, setFavorites] = useState<PokemonDTO.Model[]>([]);

  useEffect(() => {
    loadFavorites();
  }, []);

  const loadFavorites = async () => {
    try {
      const stored = await AsyncStorage.getItem('@PokeRub:favorites');
      if (stored) setFavorites(JSON.parse(stored));
    } catch (error) {
      console.error('Erro carregando favoritos', error);
    }
  };

  const saveFavorites = async (newFavorites: PokemonDTO.Model[]) => {
    try {
      await AsyncStorage.setItem(
        '@PokeRub:favorites',
        JSON.stringify(newFavorites)
      );
    } catch (error) {
      console.error('Erro salvando favorito', error);
    }
  };

  const addFavorite = async (pokemon: PokemonDTO.Model) => {
    if (!isFavorite(pokemon.id)) {
      const newFavorites = [...favorites, pokemon];
      setFavorites(newFavorites);
      await saveFavorites(newFavorites);
    }
  };

  const removeFavorite = async (pokemonId: number) => {
    const newFavorites = favorites.filter(p => p.id !== pokemonId);
    setFavorites(newFavorites);
    await saveFavorites(newFavorites);
  };

  const isFavorite = (pokemonId: number) => {
    return favorites.some(p => p.id === pokemonId);
  };

  return (
    <FavoritesContext.Provider
      value={{ favorites, addFavorite, removeFavorite, isFavorite }}>
      {children}
    </FavoritesContext.Provider>
  );
};

export const useFavorites = () => useContext(FavoritesContext);