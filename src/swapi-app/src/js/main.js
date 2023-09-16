import {
  getPeople,
  getPlanets,
  getFilms,
  getSpecies,
  getStarships,
  getVehicles,
} from './api.js';

import { renderList } from './views.js';
import { showError, hideError } from './utils.js';

const showLoader = () => {
  const loaderContainer = document.querySelector('.loader-container');
  loaderContainer.style.display = 'flex';
};

const hideLoader = () => {
  const loaderContainer = document.querySelector('.loader-container');
  loaderContainer.style.display = 'none';
};

const initApp = async () => {
  try {
    showLoader();
    const people = await getPeople();
    const planets = await getPlanets();
    const films = await getFilms();
    const species = await getSpecies();
    const starships = await getStarships();
    const vehicles = await getVehicles();

    const data = {
      people,
      planets,
      films,
      species,
      starships,
      vehicles,
    };

    hideError(); // Oculta el mensaje de error (si lo hubiera)
    renderList(data, 'people', 'people-list'); // Renderizar lista inicial
    renderList(data, 'planets', 'planets-list'); // Renderizar lista de planetas
    renderList(data, 'films', 'films-list'); // Renderizar lista de películas
    renderList(data, 'species', 'species-list'); // Renderizar lista de especies

    // Agregar opciones al select de vehicles
    const vehiclesSelect = document.getElementById('vehicles-select');
    data.vehicles.forEach(vehicle => {
      const option = document.createElement('option');
      option.value = vehicle.url;
      option.textContent = vehicle.name;
      vehiclesSelect.appendChild(option);
    });

    // Agregar opciones al select de people
    const peopleSelect = document.getElementById('people-select');
    data.people.forEach(person => {
      const option = document.createElement('option');
      option.value = person.url;
      option.textContent = person.name;
      peopleSelect.appendChild(option);
    });

    // Agregar opciones al select de planets
    const planetsSelect = document.getElementById('planets-select');
    data.planets.forEach(planet => {
      const option = document.createElement('option');
      option.value = planet.url;
      option.textContent = planet.name;
      planetsSelect.appendChild(option);
    });

    // Agregar opciones al select de films
    const filmsSelect = document.getElementById('films-select');
    data.films.forEach(film => {
      const option = document.createElement('option');
      option.value = film.url;
      option.textContent = film.title;
      filmsSelect.appendChild(option);
    });

    // Agregar opciones al select de species
    const speciesSelect = document.getElementById('species-select');
    data.species.forEach(specie => {
      const option = document.createElement('option');
      option.value = specie.url;
      option.textContent = specie.name;
      speciesSelect.appendChild(option);
    });

    // Escuchar cambios en el select de vehicles
    vehiclesSelect.addEventListener('change', async event => {
      const selectedVehicleUrl = event.target.value;
      const selectedVehicleData = await fetch(selectedVehicleUrl).then(res =>
        res.json()
      );

      // Mostrar detalles del vehículo seleccionado
      const vehicleDetails = document.getElementById('vehicle-details');
      vehicleDetails.innerHTML = `
        <h2>${selectedVehicleData.name}</h2>
        <p>Clase: ${selectedVehicleData.vehicle_class}</p>
        <p>Pasajeros: ${selectedVehicleData.passengers}</p>
        <p>Marca: ${selectedVehicleData.manufacturer}</p>
      `;
    });

    // Escuchar cambios en el select de people
    peopleSelect.addEventListener('change', async event => {
      const selectedPersonUrl = event.target.value;
      const selectedPersonData = await fetch(selectedPersonUrl).then(res =>
        res.json()
      );

      // Mostrar detalles de la persona seleccionada
      const personDetails = document.getElementById('person-details');
      personDetails.innerHTML = `
        <h2>${selectedPersonData.name}</h2>
        <p>Altura: ${selectedPersonData.height}</p>
        <p>Género: ${selectedPersonData.gender}</p>
        <h3>Películas:</h3>
        <ul>
          ${selectedPersonData.films
            .map(
              filmUrl =>
                `<li>${
                  data.films.find(film => film.url === filmUrl).title
                }</li>`
            )
            .join('')}
        </ul>
      `;
    });

    // Escuchar cambios en el select de planets
    planetsSelect.addEventListener('change', async event => {
      const selectedPlanetUrl = event.target.value;
      const selectedPlanetData = await fetch(selectedPlanetUrl).then(res =>
        res.json()
      );

      // Mostrar detalles del planeta seleccionado
      const planetDetails = document.getElementById('planet-details');
      planetDetails.innerHTML = `
        <h2>${selectedPlanetData.name}</h2>
        <p>Rotación: ${selectedPlanetData.rotation_period}</p>
        <p>Diametro: ${selectedPlanetData.diameter}</p>
        <p>Clima: ${selectedPlanetData.climate}</p>
        <p>Gravedad: ${selectedPlanetData.gravity}</p>
      `;
    });

    // Escuchar cambios en el select de films
    filmsSelect.addEventListener('change', async event => {
      const selectedFilmUrl = event.target.value;
      const selectedFilmData = await fetch(selectedFilmUrl).then(res =>
        res.json()
      );

      // Mostrar detalles de la película seleccionada
      const filmDetails = document.getElementById('film-details');
      filmDetails.innerHTML = `
  <h2>${selectedFilmData.title}</h2>
  <p>Director: ${selectedFilmData.director}</p>
  <p>Productor: ${selectedFilmData.producer}</p>
  <h3>Personajes:</h3>
  <ul>
    ${selectedFilmData.characters
      .map(characterUrl => {
        const person = data.people.find(person => person.url === characterUrl);
        return person ? `<li>${person.name}</li>` : '';
      })
      .join('')}
  </ul>
  <h3>Planetas:</h3>
  <ul>
    ${selectedFilmData.planets
      .map(planetUrl => {
        const planet = data.planets.find(planet => planet.url === planetUrl);
        return planet ? `<li>${planet.name}</li>` : '';
      })
      .join('')}
  </ul>
`;
    });

    // Mostrar detalles de la especie seleccionada
    speciesSelect.addEventListener('change', async event => {
      const selectedSpecieUrl = event.target.value;
      const selectedSpecieData = await fetch(selectedSpecieUrl).then(res =>
        res.json()
      );

      if (selectedSpecieData && selectedSpecieData.name) {
        const specieDetails = document.getElementById('specie-details');
        specieDetails.innerHTML = `
      <h2>${selectedSpecieData.name}</h2>
      <p>Clasificación: ${selectedSpecieData.classification}</p>
      <p>Designación: ${selectedSpecieData.designation}</p>
      <p>Altura promedio: ${selectedSpecieData.average_height}</p>
      <p>Lenguaje: ${selectedSpecieData.language}</p>
      <h3>Personas:</h3>
      <ul>
        ${selectedSpecieData.people
          .map(
            personUrl =>
              `<li>${
                data.people.find(person => person.url === personUrl)?.name || ''
              }</li>`
          )
          .join('')}
      </ul>
      <h3>Películas:</h3>
      <ul>
        ${selectedSpecieData.films
          .map(
            filmUrl =>
              `<li>${
                data.films.find(film => film.url === filmUrl)?.title || ''
              }</li>`
          )
          .join('')}
      </ul>
    `;
      } else {
        console.error('Datos de la especie no encontrados.');
      }
    });

    // Agregar opciones al select de starships
    const starshipsSelect = document.getElementById('starships-select');
    data.starships.forEach(starship => {
      const option = document.createElement('option');
      option.value = starship.url;
      option.textContent = starship.name;
      starshipsSelect.appendChild(option);
    });
    // Escuchar cambios en el select de starships
    starshipsSelect.addEventListener('change', async event => {
      const selectedStarshipUrl = event.target.value;
      const selectedStarshipData = await fetch(selectedStarshipUrl).then(res =>
        res.json()
      );

      if (selectedStarshipData && selectedStarshipData.name) {
        const starshipDetails = document.getElementById('starship-details');
        starshipDetails.innerHTML = `
      <h2>${selectedStarshipData.name}</h2>
      <p>Modelo: ${selectedStarshipData.model}</p>
      <p>Pasajeros: ${selectedStarshipData.passengers}</p>
      <h3>Películas:</h3>
      <ul>
        ${selectedStarshipData.films
          .map(
            filmUrl =>
              `<li>${
                data.films.find(film => film.url === filmUrl)?.title || ''
              }</li>`
          )
          .join('')}
      </ul>
     `;
      }
    });

    hideLoader(); // Ocultar el loader cuando se completa la solicitud
  } catch (error) {
    console.error('Error al cargar datos:', error);
    showError(
      'Error al cargar datos. Por favor, inténtalo de nuevo más tarde.'
    );
  }
};

document.addEventListener('DOMContentLoaded', initApp);
