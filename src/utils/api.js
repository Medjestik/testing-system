import { API_URL } from './config.js';

function handleResponse (res) {
    if (res.ok) {
      return res.json()
    } else {
      return Promise.reject(res)
    }
}

export const login = ({ login, password }) => {
  return fetch(`${API_URL}/login`, {
    method: 'POST', 
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ login, password })
  })
  .then(res => handleResponse(res));
};

export const loginUser = ({ name, code }) => {
  return fetch(`${API_URL}/test_login`, {
    method: 'POST', 
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ name, code })
  })
  .then(res => handleResponse(res));
};

export const logout = ({ token }) => {
  return fetch(`${API_URL}/logout`, {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
    }
  })
  .then(res => handleResponse(res))
};

export const getMe = ({ token }) => {
  return fetch(`${API_URL}/user`, {
    method: 'GET',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
    }
  })
  .then(res => handleResponse(res))
};

export const getTests = ({ token }) => {
  return fetch(`${API_URL}/my_tests`, {
    method: 'GET',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
    }
  })
  .then(res => handleResponse(res))
};

export const getControlUsers = ({ token }) => {
  return fetch(`${API_URL}/control`, {
    method: 'GET',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
    }
  })
  .then(res => handleResponse(res))
};

export const getControlTests = ({ token }) => {
  return fetch(`${API_URL}/tests`, {
    method: 'GET',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
    }
  })
  .then(res => handleResponse(res))
};

export const getControlFilials = ({ token }) => {
  return fetch(`${API_URL}/filials`, {
    method: 'GET',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
    }
  })
  .then(res => handleResponse(res))
};

export const getControlRoles = ({ token }) => {
  return fetch(`${API_URL}/roles`, {
    method: 'GET',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
    }
  })
  .then(res => handleResponse(res))
};

export const getPageData = ({ token, link }) => {
  return fetch(`${link}`, {
    method: 'GET',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
    }
  })
  .then(res => handleResponse(res))
};

export const addUser = ({ token, user }) => {
  return fetch(`${API_URL}/users`, {
    method: 'POST', 
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
    },
    body: JSON.stringify({ user })
  })
  .then(res => handleResponse(res));
};

export const editUser = ({ token, user }) => {
  return fetch(`${API_URL}/users/${user.id}`, {
    method: 'PATCH', 
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
    },
    body: JSON.stringify({ user })
  })
  .then(res => handleResponse(res));
};

export const changePassword = ({ token, password }) => {
  return fetch(`${API_URL}/users/update_password`, {
    method: 'PATCH', 
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
    },
    body: JSON.stringify({ password  })
  })
  .then(res => handleResponse(res));
};

export const resetPassword = ({ token, user }) => {
  return fetch(`${API_URL}/users/${user.id}/reset_password`, {
    method: 'POST', 
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
    },
  })
  .then(res => handleResponse(res));
};

export const addPhoto = ({ token, test, photo }) => {
  return fetch(`${API_URL}/test/${test.id}/photo`, {
    method: 'POST', 
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
    },
    body: JSON.stringify({ photo })
  })
  .then(res => handleResponse(res));
};

export const getResult = ({ token }) => {
  return fetch(`${API_URL}/result`, {
    method: 'GET',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
    }
  })
  .then(res => handleResponse(res))
};

export const getPageResult = ({ token, link }) => {
  return fetch(`${link}`, {
    method: 'GET',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
    }
  })
  .then(res => handleResponse(res))
};

export const getPage = ({ token, link }) => {
  const replace = link.replace('https://192.168.2.2/api', {API_URL})
  return fetch(`${replace}`, {
    method: 'GET',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
    }
  })
  .then(res => handleResponse(res))
};

export const searchPage = ({ token, searchText }) => {
  return fetch(`${API_URL}/control?search=${searchText}`, {
    method: 'GET',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
    }
  })
  .then(res => handleResponse(res))
};

export const getLogs = ({ token }) => {
  return fetch(`${API_URL}/logs`, {
    method: 'GET',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
    }
  })
  .then(res => handleResponse(res))
};

export const getReports = ({ token, year }) => {
  return fetch(`${API_URL}/report?year=${year}`, {
    method: 'GET',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
    }
  })
  .then(res => handleResponse(res))
};

export const getPageLogs = ({ token, link }) => {
  return fetch(`${link}`, {
    method: 'GET',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
    }
  })
  .then(res => handleResponse(res))
};

export const removeLogs = ({ token }) => {
  return fetch(`${API_URL}/logs/delete_old_logs?days=90`, {
    method: 'DELETE',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
    }
  })
  .then(res => handleResponse(res))
};

export const adminRequest = ({ token, query }) => {
  return fetch(`${API_URL}/sql`, {
    method: 'POST', 
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
    },
    body: JSON.stringify({ query })
  })
  .then(res => handleResponse(res));
};
