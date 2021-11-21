export const UPDATE_PROFILE = 'UPDATE_PROFILE';
export const CREATE_PROFILE = 'CREATE_PROFILE'
export const SET_PROFILE = 'SET_PROFILE'

export const updateProfile = (name, age, dateOfBirth, imageUrl, coverImageUrl) => {

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
                    name,
                    email: userEmail,
                    age,
                    dateOfBirth,
                    imageUrl,
                    coverImageUrl
                })
            });

        dispatch({
            type: UPDATE_PROFILE,
            profileData: {
                name,
                age,
                dateOfBirth,
                imageUrl,
                coverImageUrl
            }
        });
    }
};

export const fetchProfile = () => {
    return async (dispatch, getState) => {
        const userId = getState().auth.userId;
        try {

            const response = await fetch(`https://speechboard-api.herokuapp.com/profiles/${userId}`,
                {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json'
                    }
                });

            if (!response.ok) {
                throw new Error('Something went wrong');
            }

            const resData = await response.json();
            console.log("from the fetch here: ");
            console.log(resData);

            dispatch({
                type: SET_PROFILE,
                profileData: {
                    email: resData.email,
                    name: resData.name,
                    age: resData.age,
                    dateOfBirth: resData.dateOfBirth,
                    imageUrl: resData.imageUrl,
                    coverImageUrl: resData.coverImageUrl,
                    userId: userId
                }
            });
        } catch (err) {
            throw err;
        }
    }
}

export const createProfile = (email, name, age, dateOfBirth, imageUrl, coverImageUrl) => {
    return async (dispatch, getState) => {
        const userId = getState().auth.userId;
        const response = await fetch(
            'https://speechboard-api.herokuapp.com/profiles/',
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    name: name,
                    email: email,
                    age: age,
                    dateOfBirth: dateOfBirth,
                    imageUrl: imageUrl,
                    coverImageUrl: coverImageUrl,
                    userId: userId,

                })
            });
        const resData = await response.json();
        // console.log(resData);
        dispatch({
            type: CREATE_PROFILE,
            profileData: {
                name: name,
                email: email,
                age: age,
                imageUrl: imageUrl,
                coverImageUrl: coverImageUrl,
                dateOfBirth,
                userId: userId
            }
        });
    };
};