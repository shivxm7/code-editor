export const toggleClass = (el, className) => {
  let elem = document.querySelector(el);
  elem.classList.toggle(className);
};

export const removeClass = (el, className) => {
  let elem = document.querySelector(el);
  elem.classList.remove(className);
};

export const api_based_url = "https://code-editor-d97h.onrender.com";
