// utils.js
export const createElement = (tagName, attributes = {}, content = '') => {
  const element = document.createElement(tagName);
  for (const key in attributes) {
    element.setAttribute(key, attributes[key]);
  }
  element.innerHTML = content;
  return element;
};

export const clearElement = element => {
  while (element.firstChild) {
    element.removeChild(element.firstChild);
  }
};

export const showError = errorMessage => {
  const errorContainer = document.getElementById('error-container');
  if (errorContainer) {
    errorContainer.textContent = errorMessage;
    errorContainer.style.display = 'block';
  }
};

export const hideError = () => {
  const errorContainer = document.getElementById('error-container');
  if (errorContainer) {
    errorContainer.style.display = 'none';
  }
};
