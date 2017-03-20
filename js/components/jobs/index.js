
import React, { Component } from 'react';
import { View } from 'react-native';
import { connect } from 'react-redux';
import { actions } from 'react-native-navigation-redux-helpers';
import { Container, Content, Button, Item, Icon, Text, Input } from 'native-base';


import HeaderContent from './../headerContent';
import theme from '../../themes/base-theme';
import styles from './styles';

const { popRoute } = actions;

class Jobs extends Component { // eslint-disable-line

  static propTypes = {
    navigation: React.PropTypes.shape({
      key: React.PropTypes.string,
    }),
  }

  render() { // eslint-disable-line class-methods-use-this
    return (
      <Container>
        <View style={styles.container}>
          <HeaderContent />
          <Content>
            <Text>Mes postes</Text>
            <Item>
              <Icon name="search" />
              <Input
                placeholder="Saisissez un poste recherché"
                secureTextEntry
                placeholderTextColor="#fff"
                onChangeText={password => this.setState({ password })}
                style={styles.input}
              />
              <Button
                primary block rounded
                onPress={() => this.replaceRoute('home')}
              >
                <Text>
                  Suivant
                </Text>
              </Button>
            </Item>
          </Content>
        </View>
      </Container>
    );
  }
}

const mapStateToProps = state => ({
  navigation: state.cardNavigation,
});

export default connect(mapStateToProps, null)(Jobs);
