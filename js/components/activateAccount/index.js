import React, { Component } from 'react';
import { Image, TouchableOpacity } from 'react-native';
import { connect } from 'react-redux';
import { actions } from 'react-native-navigation-redux-helpers';
import { Container, Content, Text, Button, Icon, Item, Input, View } from 'native-base';

import styles from './styles';

const { replaceAtIndex } = actions;

const bg = require('../../../images/bg.png');

class ActivateAccount extends Component {

  static propTypes = {
    replaceAtIndex: React.PropTypes.func,
    navigation: React.PropTypes.shape({
      key: React.PropTypes.string,
    }),
  }

  constructor(props) {
    super(props);

    this.state = {
      activation_number: '',
    }
  }

  replaceRoute(route) {
    const navigation = this.props.navigation;

    this.props.replaceAtIndex(navigation.index, { key: route }, navigation.key);
  }

  render() {
    return (
      <Container>
        <Image source={bg} style={styles.background} >
          <Content padder scrollEnabled={false}>
            <Text style={styles.signupHeader}>
              Activation du compte
            </Text>
            <View style={styles.signupContainer}>
              <Item rounded style={styles.inputGrp}>
                <Icon name="person" />
                <Input
                  placeholder="Numéro d'activation"
                  placeholderTextColor="#fff"
                  onChangeText={activation_number => this.setState({ activation_number })}
                  style={styles.input}
                />
              </Item>
              <Button
                light block rounded bordered
                onPress={() => this.replaceRoute('home')}
                style={styles.signupBtn}
              >
                <Text style={{ color: '#fff' }}>Activer mon compte</Text>
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
    replaceAtIndex: (index, route, key) => dispatch(replaceAtIndex(index, route, key)),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(ActivateAccount);
