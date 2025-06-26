import React from 'react';
import styled from 'styled-components/native';

const Badge = styled.View<{ type: string }>`
  padding: 4px 12px;
  border-radius: 12px;
  margin: 0 4px;
  background-color: ${({ theme, type }) => {
    const typeColors: Record<string, string> = {
      normal: '#A8A878',
      fire: '#F08030',
      water: '#6890F0',
      electric: '#F8D030',
      grass: '#78C850',
    };
    return typeColors[type] || theme.colors.primary;
  }};
`;

const BadgeText = styled.Text`
  color: white;
  font-weight: bold;
  text-transform: capitalize;
`;

interface Props {
  type: string;
}

export function TypeBadge({ type }: Props) {
  return (
    <Badge type={type}>
      <BadgeText>{type}</BadgeText>
    </Badge>
  );
}
