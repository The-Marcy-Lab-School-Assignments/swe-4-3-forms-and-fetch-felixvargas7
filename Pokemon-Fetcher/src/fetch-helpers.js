export const getRandomPokemon = async () => {
  try {
    const randomPokemonId = Math.floor(Math.random() * 150) + 1;
    const response = await fetch(
      `https://pokeapi.co/api/v2/pokemon/${randomPokemonId}`,
    );
    if (!response.ok) throw Error(`Fetch failed. ${response.status}`);
    const data = await response.json();
    const pokemonObj = {
      name: data.name,
      types: data.types.map((typeObj) => typeObj.type.name).join(", "),
      sprite: data.sprites.front_default,
    };
    return { data: pokemonObj, error: null };
  } catch (error) {
    return { data: null, error };
  }
};

export const postDiscoveredPokemon = async (formData) => {
  try {
    const response = await fetch(`https://formspree.io/f/xqeyezzy`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify(formData),
    });
    if (!response.ok) throw Error(`Fetch failed. ${response.status}`);
    const data = await response.json();
    return { data, error: null };
  } catch (error) {
    return { data: null, error };
  }
};
