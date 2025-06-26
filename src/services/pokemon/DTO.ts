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
  }

  export namespace GetPokemonDetails {
    // Caso busque com id ou nome retorna Model ou null. Sem id e sem nome retorna lista de pokemons
    export type Params =
      | {
          // https://pokeapi.co/api/v2/pokemon/${id}
          id: number;
        }
      | {
          // https://pokeapi.co/api/v2/pokemon/${name} (Minúsculo)
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
        url: string; // https://pokeapi.co/api/v2/pokemon/30/ equivalente ao link de buscar com GetPokemon
      }[];
    };
  }
}
