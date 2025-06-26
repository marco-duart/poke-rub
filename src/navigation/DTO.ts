import { NativeStackScreenProps } from '@react-navigation/native-stack';

export type RootStackParamList = {
  PokemonList: undefined;
  PokemonDetails: { pokemonId: number | string };
  Favorites: undefined;
};

export type PokemonListScreenProps = NativeStackScreenProps<
  RootStackParamList,
  'PokemonList'
>;

export type PokemonDetailsScreenProps = NativeStackScreenProps<
  RootStackParamList,
  'PokemonDetails'
>;
