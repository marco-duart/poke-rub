import React from 'react';
import { FlatList, View, Text } from 'react-native';
import { useFavorites } from '../contexts/favorite-context';
import { PokemonCard } from '../components/cards/pokemon-card';
import { useTheme } from 'styled-components/native';

export function FavoritesScreen() {
  const { favorites } = useFavorites();
  const theme = useTheme();

  return (
    <View style={{ flex: 1, backgroundColor: theme.colors.background }}>
      {favorites.length === 0 ? (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
          <Text style={{ color: theme.colors.text }}>
            Nenhum Pokémon favoritado ainda
          </Text>
        </View>
      ) : (
        <FlatList
          data={favorites}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <PokemonCard 
              pokemon={{ name: item.name, url: `https://pokeapi.co/api/v2/pokemon/${item.id}` }}
              isFavorite
            />
          )}
          contentContainerStyle={{ padding: 16 }}
        />
      )}
    </View>
  );
}