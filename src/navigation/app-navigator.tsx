import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import { PokemonListScreen } from '../screens/pokemon-list-screen';
import { PokemonDetailsScreen } from '../screens/pokemon-details-screen';
import { RootStackParamList } from './DTO';

const Stack = createStackNavigator<RootStackParamList>();

export function AppNavigator() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="PokemonList"
        screenOptions={{
          headerStyle: {
            backgroundColor: '#FF5350',
          },
          headerTintColor: '#fff',
        }}
      >
        <Stack.Screen
          name="PokemonList"
          component={PokemonListScreen}
          options={{ title: 'Pokédex' }}
        />
        <Stack.Screen
          name="PokemonDetails"
          component={PokemonDetailsScreen}
          options={({ route }) => ({
            title: route.params.pokemonId.toString().toUpperCase(),
          })}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
