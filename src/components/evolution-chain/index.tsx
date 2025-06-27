import React from 'react';
import { View, Text, TouchableOpacity, Image } from 'react-native';
import styled from 'styled-components/native';
import { PokemonDTO } from '../../services/pokemon/DTO';
import { useTheme } from 'styled-components/native';

const EvolutionContainer = styled.View`
  margin-top: 16px;
`;

const EvolutionTitle = styled.Text`
  font-size: 18px;
  font-weight: bold;
  color: ${({ theme }) => theme.colors.primary};
  margin-bottom: 8px;
`;

const EvolutionRow = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: space-around;
  margin-vertical: 8px;
`;

const EvolutionItem = styled.TouchableOpacity`
  align-items: center;
  padding: 8px;
`;

const EvolutionName = styled.Text`
  margin-top: 4px;
  text-transform: capitalize;
`;

interface Props {
  evolutionChain: PokemonDTO.EvolutionChain;
  currentPokemonId: number;
  onEvolutionPress: (pokemonId: string) => void;
}

export const EvolutionChain = ({
  evolutionChain,
  currentPokemonId,
  onEvolutionPress,
}: Props) => {
  const theme = useTheme();

  const renderEvolutionChain = (chain: PokemonDTO.ChainLink) => {
    const pokemonId = chain.species.url.split('/').filter(Boolean).pop();

    return (
      <View key={chain.species.name}>
        {chain.species.name && (
          <EvolutionItem
            onPress={() => onEvolutionPress(chain.species.name)}
            disabled={currentPokemonId.toString() === pokemonId}
          >
            <Image
              source={{
                uri: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokemonId}.png`,
              }}
              style={{ width: 80, height: 80 }}
            />
            <EvolutionName style={{ color: theme.colors.text }}>
              {chain.species.name}
            </EvolutionName>
          </EvolutionItem>
        )}

        {chain.evolves_to.map(nextChain => renderEvolutionChain(nextChain))}
      </View>
    );
  };

  return (
    <EvolutionContainer>
      <EvolutionTitle>Evolution Chain</EvolutionTitle>
      {renderEvolutionChain(evolutionChain.chain)}
    </EvolutionContainer>
  );
};
