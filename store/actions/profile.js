export const UPDATE_PROFILE = 'UPDATE_PROFILE';
export const CREATE_PROFILE = 'CREATE_PROFILE'
export const SET_PROFILE = 'SET_PROFILE'

export const updateProfile = (name, age, imageUrl, coverImageUrl) => {
    
    return async (dispatch, getState) => {
        const userId = getState().auth.userId;
        const userEmail = getState().profile.email;

        const response = await fetch(
            `https://speechboard-api.herokuapp.com/profiles/${userId}`,
            {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    email: userEmail,
                    name,
                    age,
                    imageUrl,
                    coverImageUrl
                })
            });

        dispatch({
            type: UPDATE_PROFILE,
            profileData: {
                email: userEmail,
                name,
                age,
                imageUrl,
                coverImageUrl,
                ownerId: userId
            }
        });
    }
};

export const fetchProfile = () => {
    return async (dispatch, getState) => {
      const userId = getState().auth.userId;
      try {
        //any async code you want!
  
        const response = await fetch(`https://speechboard-api.herokuapp.com/profiles/${userId}`);
  
        if (!response.ok) {
          throw new Error('Something went wrong');
        }
  
        const resData = await response.json();
        
        dispatch({
            type: SET_PROFILE,
            profileData: {
                name,
                age,
                imageUrl,
                ownerId: userId
            }
        });
      } catch (err) {
        throw err;
      }
    }
  }

export const createProfile = (email) => {
    return async (dispatch, getState) => {
        // const token = getState().auth.token;
        const userId = getState().auth.userId;
        //any async code you want!
        const response = await fetch(
            'https://speechboard-api.herokuapp.com/profiles/',
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    email: email,
                    userId: userId
                })
            });
        // const resData = await response.json();

        dispatch({
            type: CREATE_PROFILE,
            profileData: {
                email,
                ownerId: userId
            }
        });
    };
};