export namespace PokemonDTO {
  export interface Model {
    id: number;
    name: string;
    height: number;
    weight: number;
    abilities: [
      {
        is_hidden: boolean;
        slot: number;
        ability: {
          name: string;
          url: string;
        };
      },
    ];
    species: {
      name: string;
      url: string;
    };
    sprites: {
      back_default: string | null;
      back_female: string | null;
      back_shiny: string | null;
      back_shiny_female: string | null;
      front_default: string | null;
      front_female: string | null;
      front_shiny: string | null;
      front_shiny_female: string | null;
    };
    types: [
      {
        slot: number;
        type: {
          name: string;
          url: string;
        };
      },
    ];
    evolutionChain?: EvolutionChain;
    speciesData?: PokemonSpecies;
  }

  export interface PokemonSpecies {
    id: number;
    name: string;
    evolution_chain: {
      url: string;
    };
    evolves_from_species: {
      name: string;
      url: string;
    } | null;
  }

  export interface EvolutionChain {
    id: number;
    chain: ChainLink;
  }

  export interface ChainLink {
    is_baby: boolean;
    species: {
      name: string;
      url: string;
    };
    evolves_to: ChainLink[];
  }

  export namespace GetPokemonDetails {
    export type Params =
      | {
          id: number;
        }
      | {
          name: string;
        };
    export type Response = Model;
  }

  export namespace GetPokemonList {
    export type Params = {
      limit?: number;
      offset?: number;
    };
    export type Response = {
      count: number;
      next: string;
      previous: string;
      results: {
        name: string;
        url: string;
      }[];
    };
  }
}
