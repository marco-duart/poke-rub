import React from 'react';
import { PokemonDTO } from '../../services/pokemon/DTO';
import * as S from './styles';

interface Props {
  pokemon: PokemonDTO.GetPokemonList.Response['results'][0];
  onPress: () => void;
}

export function PokemonCard({ pokemon, onPress }: Props) {
  const pokemonId = pokemon.url.split('/').slice(-2, -1)[0];

  return (
    <S.CardContainer onPress={onPress}>
      <S.PokemonImage
        source={{
          uri: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokemonId}.png`,
        }}
      />
      <S.PokemonName>{pokemon.name}</S.PokemonName>
    </S.CardContainer>
  );
}
