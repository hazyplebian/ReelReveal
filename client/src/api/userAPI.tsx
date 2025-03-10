import Auth from '../utils/auth';
import type { UserData } from '../interfaces/UserData';
// const retrieveUsers = async () => {
//   try {
//     const response = await fetch('/api/users', {
//       headers: {
//         'Content-Type': 'application/json',
//         Authorization: `Bearer ${Auth.getToken()}`
//       }
//     });
//     const data = await response.json();

//     if(!response.ok) {
//       throw new Error('Invalid user API response, check network tab!');
//     }

//     return data;

//   } catch (err) { 
//     console.log('Error from data retrieval:', err);
//     return [];
//   }
// }

const retrieveUserStreak = async () => {
  try {
    const response = await fetch('/api/users/', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${Auth.getToken()}`
      }
    });
    const data = await response.json();

    if(!response.ok) {
      throw new Error('Invalid user API response, check network tab!');
    }

    return data;

  } catch (err) { 
    console.log('Error from data retrieval:', err);
    return [];
  }
}

const updateUserStreak = async (userData: UserData) => {
  try {
    const response = await fetch('/api/users/', {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${Auth.getToken()}`
      },
      body: JSON.stringify(userData),
    });
    const data = await response.json();

    if(!response.ok) {
      throw new Error('Invalid user API response, check network tab!');
    }

    return data;

  } catch (err) { 
    console.log('Error from data retrieval:', err);
    return [];
  }
}

export { retrieveUserStreak, updateUserStreak };
