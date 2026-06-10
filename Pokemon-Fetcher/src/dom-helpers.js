const discoveredList = document.querySelector("#discovered-list");
const errorEl = document.querySelector("#error");
const successEl = document.querySelector("#success");

export const renderPokemon = (pokemonObj) => {
  const li = document.createElement("li");
  const name = document.createElement("h2");
  const types = document.createElement("p");
  const sprite = document.createElement("img");

  name.textContent =
    pokemonObj.name.charAt(0).toUpperCase() + pokemonObj.name.slice(1);
  types.textContent = pokemonObj.types;
  sprite.src = pokemonObj.sprite;
  sprite.alt = pokemonObj.name;

  li.append(name, types, sprite);
  discoveredList.append(li);
};

export const renderError = (msg) => {
  errorEl.textContent = msg;
};

export const renderSuccess = (msg) => {
  successEl.textContent = msg;
};
