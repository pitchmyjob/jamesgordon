import React, { Component } from 'react';
import { Image } from 'react-native';
import {connect} from 'react-redux';
import { actions } from 'react-native-navigation-redux-helpers'

const splashscreen = require('../../../images/splashscreen.png');

const { replaceAt } = actions;

class SplashScreen extends Component {
   static propTypes = {
    replaceAt: React.PropTypes.func,
    navigation: React.PropTypes.shape({
      key: React.PropTypes.string,
    }),
  }

  componentWillMount() {
    const navigator = this.props.navigator;

    setTimeout (() => {
      this.props.replaceAt('splashscreen', { key: 'home' }, this.props.navigation.key);
    }, 2000);
  }

  render() { // eslint-disable-line class-methods-use-this
    return (
      <Image source={splashscreen} style={{ flex: 1, height: null, width: null }} />
    );
  }
}

const mapStateToProps = state => ({
  navigation: state.cardNavigation,
});

function mapDispatchToProps(dispatch) {
  return {
    replaceAt: (routeKey, route, key) => dispatch(replaceAt(routeKey, route, key)),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(SplashScreen);
