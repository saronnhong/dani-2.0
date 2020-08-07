import { UPDATE_PROFILE } from '../actions/profile';
// import Profile from '../../models/profile';



const initialState = {
  name: null,
  age: null,
  imageUrl: null,
  location: null,
  dateJoined: null
};
  
  export default (state = initialState, action) => {
    switch (action.type) {
      case UPDATE_PROFILE:
        return {
          name: action.profileData.name,
          age: action.profileData.age,
          imageUrl: action.profileData.imageUrl,
          location: action.profileData.location,
          dateJoined: action.profileData.dateJoined
        
        };

      default:
        return state;
    }
   
  };

