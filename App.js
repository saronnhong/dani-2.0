
import React, { useState } from 'react';
import { createStore, combineReducers, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import ReduxThunk from 'redux-thunk';
import * as Font from 'expo-font';
import { AppLoading } from 'expo';
import Navigator from './navigation/Navigator';
import { enableScreens } from 'react-native-screens';
import authReducer from './store/reducers/auth';
import sentenceReducer from './store/reducers/sentenceBar';
import newWordsReducer from './store/reducers/newCards';
import settingReducer from './store/reducers/settings';
import profileReducer from './store/reducers/profile';
import NavigationContainer from './navigation/NavigationContainer';

//Optimizes memory usage for screens for each native platform (UIViewController for iOS, and FragmentActivity for Android)
enableScreens();

const rootReducer = combineReducers({
  word: newWordsReducer,
  bar: sentenceReducer,
  auth: authReducer,
  setting: settingReducer,
  profile: profileReducer
});

const store = createStore(rootReducer, applyMiddleware(ReduxThunk));

//Loads custom fonts
const fetchFonts = () => {
  return Font.loadAsync({
    'open-sans': require('./assets/fonts/OpenSans-Regular.ttf'),
    'open-sans-bold': require('./assets/fonts/OpenSans-Bold.ttf')
  });
}

export default function App() {
  const [fontLoaded, setFontLoaded] = useState(false);

  if (!fontLoaded) {
    return (
      <AppLoading
        startAsync={fetchFonts}
        onFinish={() => setFontLoaded(true)}
      />
    );
  }
  return (
    <Provider store={store}>
      <NavigationContainer />
    </Provider>
  );
}


