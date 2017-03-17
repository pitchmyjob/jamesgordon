import React, { Component } from 'react';
import { Image, TouchableOpacity } from 'react-native';
import { connect } from 'react-redux';
import { actions } from 'react-native-navigation-redux-helpers';
import { Container, Content, Text, Button, Icon, Item, Input, View } from 'native-base';

import styles from './styles';

const { reset } = actions;

const bg = require('../../../images/bg.png');

class SignUp extends Component {

  static propTypes = {
    reset: React.PropTypes.func,
    navigation: React.PropTypes.shape({
      key: React.PropTypes.string,
    }),
  }

  constructor(props) {
    super(props);

    this.state = {
      first_name: '',
      last_name: '',
      email: '',
      phone: '',
      password: '',
    }
  }

  render() {
    return (
      <Container>
        <Image source={bg} style={styles.background} >
          <Content padder scrollEnabled={false}>
            <Text style={styles.signupHeader}>
              Inscription
            </Text>
            <View style={styles.signupContainer}>
              <Item rounded style={styles.inputGrp}>
                <Icon name="person" />
                <Input
                  placeholder="Prénom"
                  placeholderTextColor="#fff"
                  onChangeText={first_name => this.setState({ first_name })}
                  style={styles.input}
                />
              </Item>
              <Item rounded style={styles.inputGrp}>
                <Icon name="person" />
                <Input
                  placeholder="Nom"
                  placeholderTextColor="#fff"
                  onChangeText={last_name => this.setState({ last_name })}
                  style={styles.input}
                />
              </Item>
              <Item rounded style={styles.inputGrp}>
                <Icon name="mail-open" />
                <Input
                  placeholder="Adresse e-mail"
                  placeholderTextColor="#fff"
                  onChangeText={email => this.setState({ email })}
                  style={styles.input}
                />
              </Item>
              <Item rounded style={styles.inputGrp}>
                <Icon name="phone" />
                <Input
                  placeholder="Numéro de téléphone"
                  placeholderTextColor="#fff"
                  onChangeText={phone => this.setState({ phone })}
                  style={styles.input}
                />
              </Item>
              <Item rounded style={styles.inputGrp}>
                <Icon name="unlock" />
                <Input
                  placeholder="Mot de passe" secureTextEntry
                  placeholderTextColor="#fff"
                  onChangeText={password => this.setState({ password })}
                  style={styles.input}
                />
              </Item>
              <Button
                light block rounded bordered
                onPress={() => this.props.reset(this.props.navigation.key)}
                style={styles.signupBtn}
              >
                <Text style={{ color: '#fff' }}>Inscription</Text>
              </Button>
              <Button block transparent style={{ marginTop: 10 }}>
                <Text style={styles.termsText}>Conditions d'utilisation</Text>
              </Button>
            </View>
          </Content>
        </Image>
      </Container>
    );
  }
}

const mapStateToProps = state => ({
  navigation: state.cardNavigation,
});

function mapDispatchToProps(dispatch) {
  return {
    reset: key => dispatch(reset([{ key: 'login' }], key, 0)),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(SignUp);
