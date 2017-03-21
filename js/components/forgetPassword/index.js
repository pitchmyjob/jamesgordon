import React, { Component } from 'react';
import { Image, TouchableOpacity } from 'react-native';
import { connect } from 'react-redux';
import { actions } from 'react-native-navigation-redux-helpers';
import { Container, Content, Text, Button, Icon, Item, Input, View } from 'native-base';

import styles from './styles';

const { reset } = actions;

const bg = require('../../../images/bg.png');

class ForgetPassword extends Component {

  static propTypes = {
    reset: React.PropTypes.func,
    navigation: React.PropTypes.shape({
      key: React.PropTypes.string,
    }),
  }

  constructor(props) {
    super(props);

    this.state = {
      email: '',
      phone: '',
    }
  }

  render() {
    return (
      <Container>
        <Image source={bg} style={styles.background} >
          <Content padder scrollEnabled={false}>
            <Text style={styles.signupHeader}>
              Mot de passe oublié
            </Text>
            <View style={styles.signupContainer}>
              <Item rounded style={styles.inputGrp}>
                <Icon name="mail-open" />
                <Input
                  placeholder="Adresse e-mail"
                  placeholderTextColor="#fff"
                  onChangeText={email => this.setState({ email })}
                  style={styles.input}
                />
              </Item>
              <Text style={styles.separatorText}>ou</Text>
              <Item rounded style={styles.inputGrp}>
                <Icon name="phone-portrait" />
                <Input
                  placeholder="Numéro de téléphone"
                  placeholderTextColor="#fff"
                  onChangeText={phone => this.setState({ phone })}
                  style={styles.input}
                />
              </Item>
              <Button
                light block rounded bordered
                onPress={() => this.props.reset(this.props.navigation.key)}
                style={styles.signupBtn}
              >
                <Text style={{ color: '#fff' }}>Réinitialiser mon mot de passe</Text>
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

export default connect(mapStateToProps, mapDispatchToProps)(ForgetPassword);
