const currentUrl = window.location.href;

// Создание объекта URL
const urlObject = new URL(currentUrl);

export const API_URL = urlObject.origin + '/api';

//export const API_URL = 'https://kst.emiit.ru/api';