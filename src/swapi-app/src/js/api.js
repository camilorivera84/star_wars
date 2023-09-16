export const getPeople = async () => {
  const response = await fetch('https://swapi.dev/api/people/');
  const data = await response.json();
  return data.results;
};

export const getPlanets = async () => {
  const response = await fetch('https://swapi.dev/api/planets/');
  const data = await response.json();
  return data.results;
};

export const getFilms = async () => {
  const response = await fetch('https://swapi.dev/api/films/');
  const data = await response.json();
  return data.results;
};

export const getSpecies = async () => {
  const response = await fetch('https://swapi.dev/api/species/');
  const data = await response.json();
  return data.results;
};

export const getStarships = async () => {
  const response = await fetch('https://swapi.dev/api/starships/');
  const data = await response.json();
  return data.results;
};

export const getVehicles = async () => {
  const response = await fetch('https://swapi.dev/api/vehicles/');
  const data = await response.json();
  return data.results;
};
