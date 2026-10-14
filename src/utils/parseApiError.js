const FALLBACK = 'Не удалось выполнить запрос. Попробуйте позже.';

export async function parseApiError(err) {
  if (!err || typeof err.json !== 'function') {
    return FALLBACK;
  }

  try {
    const data = await err.json();
    if (err.status === 422 && data && data.error && typeof data.error === 'object') {
      const messages = Object.values(data.error).flat().filter(Boolean);
      if (messages.length) {
        return messages.join(' ');
      }
    }
    if (data && typeof data.message === 'string' && data.message) {
      return data.message;
    }
    if (data && typeof data.error === 'string' && data.error) {
      return data.error;
    }
  } catch (parseError) {
    return FALLBACK;
  }

  return FALLBACK;
}
