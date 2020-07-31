import Profile from "../../models/profile";
export const CREATE_PROFILE = 'CREATE_PROFILE';



export const createProfile = (name, age, imageUrl, location, dateJoined) => {
    return async (dispatch, getState) => {
      const token = getState().auth.token;
      const userId = getState().auth.userId;
      //any async code you want!
      const response = await fetch(
        `https://dani-2.firebaseio.com/profile.json?auth=${token}`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            name,
            age,
            imageUrl,
            location,
            dateJoined,
            ownerId: userId
          })
        });
  
      const resData = await response.json();
  
      dispatch({
        type: CREATE_PROFILE,
        profileData: {
          id: resData.name,
          name,
          age,
          location,
          imageUrl,
          dateJoined,
          ownerId: userId
        }
      });
    };
  };