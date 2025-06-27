import styled from 'styled-components/native';

export const CardContainer = styled.TouchableOpacity`
  flex-direction: row;
  align-items: center;
  padding: 12px;
  margin: 4px 16px;
  border-radius: 8px;
  background-color: ${({ theme }) => theme.colors.secondary + '20'};
`;

export const PokemonImage = styled.Image`
  width: 64px;
  height: 64px;
`;

export const PokemonName = styled.Text`
  margin-left: 12px;
  font-size: 16px;
  color: ${({ theme }) => theme.colors.text};
  text-transform: capitalize;
`;
