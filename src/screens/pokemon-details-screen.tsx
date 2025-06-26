import React from 'react';
import { ScrollView, View, Text, Image, StyleSheet } from 'react-native';
import { usePokemonDetails } from '../hooks/use-pokemon-details';
import { useTheme } from 'styled-components/native';
import { TypeBadge } from '../components/badges/type-badge';
import { ActivityIndicator } from 'react-native';
import { PokemonDetailsScreenProps } from '../navigation/DTO';

export function PokemonDetailsScreen({ route }: PokemonDetailsScreenProps) {
  const { pokemonId } = route.params;
  const { loading, error, pokemon } = usePokemonDetails(pokemonId);
  const theme = useTheme();

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
});
