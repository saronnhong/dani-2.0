export const UPDATE_PROFILE = 'UPDATE_PROFILE';
export const CREATE_PROFILE = 'CREATE_PROFILE'
export const SET_PROFILE = 'SET_PROFILE'

export const updateProfile = (name, age, imageUrl) => {
    
    return async (dispatch, getState) => {
        const userId = getState().auth.userId;
        dispatch({
            type: UPDATE_PROFILE,
            profileData: {
                name,
                age,
                imageUrl,
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
  
        const response = await fetch('https://dani-2.firebaseio.com/profile.json');
  
        if (!response.ok) {
          throw new Error('Something went wrong');
        }
  
        const resData = await response.json();
        // console.log(resData);
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

export const createProfile = (name, age, imageUrl) => {
    return async (dispatch, getState) => {
        const token = getState().auth.token;
        const userId = getState().auth.userId;
        //any async code you want!
        const response = await fetch(
            `https://dani-2.firebaseio.com/profile/${userId}.json?auth=${token}`,
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    name,
                    age,
                    imageUrl,
                    ownerId: userId
                })
            });

        const resData = await response.json();

        dispatch({
            type: CREATE_PROFILE,
            profileData: {
                name,
                age,
                imageUrl,
                ownerId: userId
            }
        });
    };
};