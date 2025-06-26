import { api } from '../api';
import { PokemonDTO } from './DTO';

export const PokemonService = {
  async getPokemonList(limit = 20, offset = 0) {
    const response = await api.get<PokemonDTO.GetPokemonList.Response>(
      `/pokemon?limit=${limit}&offset=${offset}`
    );
    return response.data;
  },

  async getPokemonDetails(params: PokemonDTO.GetPokemonDetails.Params) {
    const identifier = 'id' in params ? params.id : params.name?.toLowerCase();
    if (!identifier) throw new Error('ID or name is required');
    
    const response = await api.get<PokemonDTO.Model>(`/pokemon/${identifier}`);
    return response.data;
  },

  async getEvolutionChain(id: number) {
    const response = await api.get(`/evolution-chain/${id}`);
    return response.data;
  },

  async getPokemonSpecies(id: number) {
    const response = await api.get(`/pokemon-species/${id}`);
    return response.data;
  }
};