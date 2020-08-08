export const UPDATE_PROFILE = 'UPDATE_PROFILE';

export const updateProfile = (name, age, imageUrl) => {
    return async dispatch => {
        dispatch({
            type: UPDATE_PROFILE,
            profileData: {
              name: name,
              age: age,
              imageUrl: imageUrl
            }
        });
    }
};
