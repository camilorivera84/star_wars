import { createElement, clearElement } from './utils.js';

export const renderList = (data, entityType, containerId) => {
  const entityListContainer = document.getElementById(containerId);

  if (entityListContainer) {
    clearElement(entityListContainer);

    const entityList = data[entityType];
    const entityListInner = createElement('ul');

    entityList.forEach(entity => {
      const listItem = createElement('li');
      listItem.innerHTML = `<a href="#" class="entity-link" data-entity-type="${entityType}" data-entity-id="${entity.url}">${entity.name}</a>`;
      entityListInner.appendChild(listItem);
    });

    entityListContainer.appendChild(entityListInner);
  }
};

export const renderDetail = (entityData, container) => {
  const detailElement = createElement('div');
  detailElement.innerHTML = `<h2>${entityData.name}</h2>
    <p>Población: ${entityData.population}</p>
    <p>Temperatura: ${entityData.climate}</p>
    <p>Diametro: ${entityData.diameter}</p>`;

  container.appendChild(detailElement);
};

export const renderSelect = (data, entityType, selectId, containerId) => {
  const selectElement = createElement('select', { id: selectId });
  const entityList = data[entityType];

  entityList.forEach(entity => {
    const option = createElement('option', { value: entity.url }, entity.name);
    selectElement.appendChild(option);
  });

  const container = document.getElementById(containerId);
  container.appendChild(selectElement);

  selectElement.addEventListener('change', async event => {
    const selectedEntityUrl = event.target.value;
    const selectedEntityData = await fetch(selectedEntityUrl).then(res =>
      res.json()
    );

    const entityDetailsContainer = document.getElementById(
      `${entityType}-details`
    );
    clearElement(entityDetailsContainer);
    renderDetail(selectedEntityData, entityDetailsContainer);
  });
};

export const renderRelatedEntities = relatedEntities => {
  const relatedEntityList = document.getElementById('related-entities');
  if (relatedEntityList) {
    clearElement(relatedEntityList);

    relatedEntities.forEach(entity => {
      const listItem = createElement('li');
      listItem.innerHTML = `<h3>${entity.name}</h3><p>${JSON.stringify(
        entity,
        null,
        2
      )}</p>`;
      relatedEntityList.appendChild(listItem);
    });
  }
};
