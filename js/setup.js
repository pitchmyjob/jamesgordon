import React, { Component } from 'react';
import { Provider } from 'react-redux';
import { StyleProvider } from 'native-base';

import App from './App';
import configureStore from './configureStore';
import getTheme from '../native-base-theme/components';
import variables from '../native-base-theme/variables/commonColor';

function setup():React.Component {
  class Root extends Component {

    constructor() {
      super();
      this.state = {
        isLoading: true,
        store: configureStore(() => this.setState({ isLoading: false })),
      };
    }

    render() {
      return (
        <StyleProvider style={getTheme(variables)}>
          <Provider store={this.state.store}>
            <App />
          </Provider>
        </StyleProvider>
      );
    }
  }

  return Root;
}

export default setup;
