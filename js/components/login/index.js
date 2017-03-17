
import React, { Component } from 'react';
import { Image, Platform } from 'react-native';
import { connect } from 'react-redux';
import { actions } from 'react-native-navigation-redux-helpers';
import { Container, Content, Text, Item, Input, Button, Icon, View, Left, Right } from 'native-base';

import styles from './styles';

const { replaceAtIndex, pushRoute } = actions;

const bg = require('../../../images/bg.png');
const logo = require('../../../images/logo.png');

class Login extends Component {

  static propTypes = {
    replaceAtIndex: React.PropTypes.func,
    pushRoute: React.PropTypes.func,
    navigation: React.PropTypes.shape({
      key: React.PropTypes.string,
    }),
  }

  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
    };
  }

  replaceRoute(route) {
    const navigation = this.props.navigation;

    this.props.replaceAtIndex(navigation.index, { key: route }, navigation.key);
  }

  pushRoute(route) {
    this.props.pushRoute({ key: route, index: 1 }, this.props.navigation.key);
  }

  render() {
    return (
      <Container>
        <Content scrollEnabled={false}>
          <Image source={bg} style={styles.background} >
            <Image source={logo} style={Platform.OS === 'android' ? styles.aShadow : styles.iosShadow} />
            <View style={styles.bg}>
              <Button
                light block rounded bordered
                style={styles.linkedInBtn}
                onPress={() => this.replaceRoute('home')}
              >
                <Text style={Platform.OS === 'android' ? styles.aBtnText : styles.iosBtnText}>
                  LinkedIn
                </Text>
              </Button>
              <Item rounded style={styles.inputGrp}>
                <Icon name="mail-open" />
                <Input
                  placeholder="Adresse e-mail"
                  onChangeText={email => this.setState({ email })}
                  placeholderTextColor="#fff"
                  style={styles.input}
                />
              </Item>
              <Item rounded style={styles.inputGrp}>
                <Icon name="unlock" />
                <Input
                  placeholder="Mot de passe"
                  secureTextEntry
                  placeholderTextColor="#fff"
                  onChangeText={password => this.setState({ password })}
                  style={styles.input}
                />
              </Item>
              <Button
                light block rounded bordered
                style={styles.loginBtn}
                onPress={() => this.replaceRoute('home')}
              >
                <Text style={Platform.OS === 'android' ? styles.aBtnText : styles.iosBtnText}>
                  Connexion
                </Text>
              </Button>
              <View style={styles.otherLinksContainer}>
                <Left>
                  <Button transparent style={{ alignSelf: 'flex-start' }} onPress={() => this.pushRoute('register')}>
                    <Text style={styles.helpBtns}>
                      Inscription
                    </Text>
                  </Button>
                </Left>
                <Right>
                  <Button transparent style={{ alignSelf: 'flex-end' }} onPress={() => this.pushRoute('forgetPassword')}>
                    <Text style={{...styles.helpBtns, textAlign: 'right'}}>
                      Mot de passe oublié ?
                    </Text>
                  </Button>
                </Right>
              </View>
            </View>
          </Image>
        </Content>
      </Container>
    );
  }
}

const mapStateToProps = state => ({
  navigation: state.cardNavigation,
});

function mapDispatchToProps(dispatch) {
  return {
    replaceAtIndex: (index, route, key) => dispatch(replaceAtIndex(index, route, key)),
    pushRoute: (route, key) => dispatch(pushRoute(route, key)),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Login);
