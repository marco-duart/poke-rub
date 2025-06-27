import React from 'react';
import {
  ScrollView,
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  Alert,
} from 'react-native';
import { usePokemonDetails } from '../hooks/use-pokemon-details';
import { useTheme } from 'styled-components/native';
import { TypeBadge } from '../components/badges/type-badge';
import { ActivityIndicator } from 'react-native';
import { PokemonDetailsScreenProps } from '../navigation/DTO';
import { EvolutionChain } from '../components/evolution-chain';
import { PokemonDTO } from '../services/pokemon/DTO';
import { useFavoritePokemon } from '../hooks/use-favorite-pokemon';

export function PokemonDetailsScreen({
  route,
  navigation,
}: PokemonDetailsScreenProps) {
  const { pokemonId } = route.params;
  const { loading, error, pokemon } = usePokemonDetails(pokemonId);
  const { isFavorite, toggleFavorite } = useFavoritePokemon(pokemon);
  const theme = useTheme();

  const handleEvolutionPress = (pokemonName: string) => {
    navigation.push('PokemonDetails', { pokemonId: pokemonName });
  };

  const getNextEvolution = (
    currentPokemonId: number,
    chain: PokemonDTO.ChainLink,
  ): string | null => {
    if (chain.species.url.includes(`/${currentPokemonId}/`)) {
      if (chain.evolves_to.length > 0) {
        return chain.evolves_to[0].species.name;
      }
      return null;
    }

    for (const nextChain of chain.evolves_to) {
      const result = getNextEvolution(currentPokemonId, nextChain);
      if (result) return result;
    }

    return null;
  };

  const nextEvolution = pokemon?.evolutionChain
    ? getNextEvolution(pokemon.id, pokemon.evolutionChain.chain)
    : null;

  if (loading) return <ActivityIndicator size="large" />;
  if (error) return <Text>{error}</Text>;
  if (!pokemon) return <Text>Pokémon não encontrado</Text>;

  return (
    <ScrollView style={{ flex: 1, backgroundColor: theme.colors.background }}>
      <View style={styles.header}>
        <Image
          source={{ uri: pokemon.sprites.front_default || '' }}
          style={styles.image}
        />
        <Text style={[styles.name, { color: theme.colors.text }]}>
          {pokemon.name.toUpperCase()}
        </Text>
        <View style={styles.typesContainer}>
          {pokemon.types.map(type => (
            <TypeBadge key={type.slot} type={type.type.name} />
          ))}
        </View>
      </View>

      <View style={styles.section}>
        <Text style={[styles.sectionTitle, { color: theme.colors.primary }]}>
          Caracteristicas
        </Text>
        <Text>Altura: {pokemon.height / 10}m</Text>
        <Text>Peso: {pokemon.weight / 10}kg</Text>
      </View>

      <View style={styles.section}>
        <Text style={[styles.sectionTitle, { color: theme.colors.primary }]}>
          Habilidades
        </Text>
        {pokemon.abilities.map(ability => (
          <Text key={ability.slot}>
            {ability.ability.name}
            {ability.is_hidden ? ' (hidden)' : ''}
          </Text>
        ))}
      </View>

      {pokemon.evolutionChain && (
        <View style={styles.section}>
          <EvolutionChain
            evolutionChain={pokemon.evolutionChain}
            currentPokemonId={pokemon.id}
            onEvolutionPress={handleEvolutionPress}
          />
        </View>
      )}

      {nextEvolution && (
        <TouchableOpacity
          style={[
            styles.evolveButton,
            { backgroundColor: theme.colors.primary },
          ]}
          onPress={() => {
            Alert.alert('Evoluir Pokémon', `Deseja evoluir ${pokemon.name}?`, [
              { text: 'Cancelar' },
              {
                text: 'Evoluir',
                onPress: () => handleEvolutionPress(nextEvolution),
              },
            ]);
          }}
        >
          <Text style={styles.evolveButtonText}>Evoluir</Text>
        </TouchableOpacity>
      )}

      <TouchableOpacity
        onPress={toggleFavorite}
        style={{
          position: 'absolute',
          top: 16,
          right: 16,
          padding: 8,
        }}
      >
        <Icon
          name={isFavorite ? 'heart' : 'heart-o'}
          size={24}
          color={theme.colors.primary}
        />
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  header: {
    alignItems: 'center',
    padding: 20,
  },
  image: {
    width: 200,
    height: 200,
  },
  name: {
    fontSize: 24,
    fontWeight: 'bold',
    marginVertical: 10,
  },
  typesContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  section: {
    padding: 16,
    marginVertical: 8,
    marginHorizontal: 16,
    borderRadius: 8,
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  evolveButton: {
    padding: 16,
    margin: 16,
    borderRadius: 8,
    alignItems: 'center',
  },
  evolveButtonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16,
  },
});
