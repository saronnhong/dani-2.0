import { UPDATE_PROFILE, CREATE_PROFILE, SET_PROFILE } from '../actions/profile';


const initialState = {
  email: null,
  name: null,
  age: null,
  imageUrl: null,
  coverImageUrl: null,
  userId: null
};

export default (state = initialState, action) => {
  switch (action.type) {
    // case SET_PROFILE:
    //   return {
    //     name: action.profileData.name,
    //     age: action.profileData.age,
    //     imageUrl: action.profileData.imageUrl
    //   };
    case UPDATE_PROFILE:
      return {
        name: action.profileData.name,
        age: action.profileData.age,
        imageUrl: action.profileData.imageUrl
      };
    case CREATE_PROFILE:
      return {
        email: action.profileData.email,
        imageUrl: require('../../assets/images/profileimages/starfish.png'),
        coverImageUrl: require('../../assets/images/profileimages/coverphoto.jpg'),
        userId: action.profileData.userId
      }

    default:
      return state;
  }

};

