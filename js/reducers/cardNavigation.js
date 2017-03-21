import { cardStackReducer } from 'react-native-navigation-redux-helpers';

const initialState = {
  key: 'global',
  index: 0,
  routes: [
    {
      key: 'jobs',
      index: 0,
    },
  ],
};

module.exports = cardStackReducer(initialState);
