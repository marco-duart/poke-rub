import React, { useState } from 'react';
import { FlatList, TextInput, View, ActivityIndicator } from 'react-native';
import { usePokemonList } from '../hooks/use-pokemon-list';
import { PokemonCard } from '../components/cards/pokemon-card';
import { useTheme } from 'styled-components/native';
import { PokemonListScreenProps } from '../navigation/DTO';

export function PokemonListScreen({ navigation }: PokemonListScreenProps) {
  const { loading, pokemons, loadMore } = usePokemonList();
  const [searchText, setSearchText] = useState('');
  const theme = useTheme();

  const filteredPokemons = pokemons.filter(pokemon =>
    pokemon.name.toLowerCase().includes(searchText.toLowerCase()),
  );

  return (
    <View style={{ flex: 1, backgroundColor: theme.colors.background }}>
      <TextInput
        placeholder="Buscar Pokémon..."
        value={searchText}
        onChangeText={setSearchText}
        style={{
          padding: 12,
          margin: 16,
          borderRadius: 8,
          backgroundColor: theme.colors.primary + '20',
          color: theme.colors.text,
        }}
      />

      {loading && pokemons.length === 0 ? (
        <ActivityIndicator size="large" style={{ flex: 1 }} />
      ) : (
        <FlatList
          data={filteredPokemons}
          keyExtractor={item => item.name}
          renderItem={({ item }) => (
            <PokemonCard
              pokemon={item}
              onPress={() =>
                navigation.navigate('PokemonDetails', {
                  pokemonId: item.name,
                })
              }
            />
          )}
          onEndReached={loadMore}
          onEndReachedThreshold={0.5}
          ListFooterComponent={loading ? <ActivityIndicator /> : null}
        />
      )}
    </View>
  );
}
