import { renderPokemon, renderError, renderSuccess } from "./dom-helpers";
import { getRandomPokemon, postDiscoveredPokemon } from "./fetch-helpers";

const discoverButton = document.querySelector("#discover-button");
const captureForm = document.querySelector("#capture-form");

const getAndRenderPokemon = async () => {
  const { data, error } = await getRandomPokemon();
  if (error) {
    renderError(error.message);
    renderSuccess("");
  } else {
    renderPokemon(data);
    renderSuccess(`${data.name} was discovered`);
    renderError("");
  }
};

const handleCaptureSubmit = async (event) => {
  event.preventDefault();

  const form = event.target;
  const formValues = {
    name: form.elements.name.value,
    types: form.elements.types.value,
    isFavorite: form.elements.isFavorite.checked,
  };

  const { data, error } = await postDiscoveredPokemon(formValues);

  if (error) {
    renderError("Error: unable to capture Pokemon. Please try again later");
    renderSuccess("");
  } else {
    renderSuccess(`${formValues.name} has been captured!`);
    renderError("");
    form.reset();
  }
};
getAndRenderPokemon();
discoverButton.addEventListener("click", getAndRenderPokemon);
captureForm.addEventListener("submit", handleCaptureSubmit);
