import React from 'react';
import styled from 'styled-components/native';
import { PokemonDTO } from '../../services/pokemon/DTO';

const CardContainer = styled.TouchableOpacity`
  flex-direction: row;
  align-items: center;
  padding: 12px;
  margin: 4px 16px;
  border-radius: 8px;
  background-color: ${({ theme }) => theme.colors.secondary + '20'};
`;

const PokemonImage = styled.Image`
  width: 64px;
  height: 64px;
`;

const PokemonName = styled.Text`
  margin-left: 12px;
  font-size: 16px;
  color: ${({ theme }) => theme.colors.text};
  text-transform: capitalize;
`;

interface Props {
  pokemon: PokemonDTO.GetPokemonList.Response['results'][0];
  onPress: () => void;
}

export function PokemonCard({ pokemon, onPress }: Props) {
  const pokemonId = pokemon.url.split('/').slice(-2, -1)[0];

  return (
    <CardContainer onPress={onPress}>
      <PokemonImage
        source={{
          uri: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokemonId}.png`,
        }}
      />
      <PokemonName>{pokemon.name}</PokemonName>
    </CardContainer>
  );
}
