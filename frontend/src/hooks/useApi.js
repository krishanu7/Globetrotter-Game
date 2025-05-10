import { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';

const useApi = () => {
  const { user, logout } = useContext(AuthContext);

  const apiCall = async (url, method = 'GET', body = null) => {
    const token = localStorage.getItem('token');
    const headers = {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    };

    try {
      const response = await fetch(`http://localhost:8080/api/v1${url}`, {
        method,
        headers,
        body: body ? JSON.stringify(body) : null,
      });

      if (response.status === 401) {
        logout();
        throw new Error('Unauthorized');
      }

      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.error || 'Something went wrong');
      }

      return data;
    } catch (error) {
      throw error;
    }
  };

  return {
    login: (credentials) => apiCall('/auth/login', 'POST', credentials),
    signup: (credentials) => apiCall('/auth/register', 'POST', credentials),
    getGameData: () => apiCall('/game/data'),
    checkAnswer: (data) => apiCall('/game/answer', 'POST', data),
    getScores: () => apiCall('/score'),
    getInviteeScore: (userId) => apiCall(`/score/invitee/${userId}`),
  };
};

export default useApi;