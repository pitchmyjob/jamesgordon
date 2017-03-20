import React, { Component } from 'react';
import { Image, View } from 'react-native';
import { connect } from 'react-redux';
import { actions } from 'react-native-navigation-redux-helpers';
import { Icon, Button, Left, Right, Body, Header } from 'native-base';

import styles from './styles';

const { popRoute } = actions;

const headerLogo = require('../../../images/header-logo.png');

class HeaderContent extends Component {

  static propTypes = {
    popRoute: React.PropTypes.func,
    navigation: React.PropTypes.shape({
      key: React.PropTypes.string,
    }),
  }

  constructor(props) {
    super(props);

    this.popRoute = this.popRoute.bind(this);
  }

  popRoute() {
    this.props.popRoute(this.props.navigation.key);
  }

  render() {
    const { hasBackButton } = this.props

    return (
      <Header>
        {
          hasBackButton &&
          <Left>
            <Button transparent onPress={() => this.popRoute()}>
              <Icon active name="arrow-back" />
            </Button>
          </Left>
        }
        <Body>
          <Image source={headerLogo} style={styles.imageHeader} />
        </Body>
        {hasBackButton && <Right />}
      </Header>
    );
  }
}

const mapStateToProps = state => ({
  navigation: state.cardNavigation,
});

function mapDispatchToProps(dispatch) {
  return {
    popRoute: key => dispatch(popRoute(key)),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(HeaderContent);
