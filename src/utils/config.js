const urlObject = new URL(window.location.href);

// В dev фронт на :3000, а скачивания идут по <a href> — прокси CRA их не проксирует.
export const API_URL =
  process.env.REACT_APP_API_URL || `${urlObject.origin}/api`;