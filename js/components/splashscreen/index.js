import React, { Component } from 'react';
import { Image } from 'react-native';

const launchscreen = require('../../../images/shadow.png');

export default class SplashPage extends Component {

  render() { // eslint-disable-line class-methods-use-this
    return (
      <Image source={launchscreen} style={{ flex: 1, height: null, width: null }} />
    );
  }
}
