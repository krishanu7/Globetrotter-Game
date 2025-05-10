import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

const useApi = () => {
    const { user, logout} = useContext(AuthContext);

    const apiCall = async (url, method= 'GET', body=null) => {
        const token = localStorage.getItem('token');
        const headers = {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        }

        try {
            const response = await fetch(`http://localhost:8080/api/v1${url}`, {
                method,
                headers,
                body: body ? JSON.stringify(body) : null
            })

            if (response.status === 401) {
                logout();
                return null;
            }
            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.error || 'Something went wrong');
            }

            return data;
        } catch (error) {
            console.error('Error:', error);
            throw error;
        }
    }

    return {
        login: (credentials) => apiCall('/auth/login', 'POST', credentials),
        signup: (credentials) => apiCall('/auth/signup', 'POST', credentials),
        getGameData: () => apiCall('/game/clues', 'GET', null),
        checkAnswer: (data) => apiCall('/game/guess', 'POST', data),
        getScore: () => apiCall('/score', 'GET', null),
        getInviteeScore: (userId) => apiCall(`/score/invitee/${userId}`),
    }
}