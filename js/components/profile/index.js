import React, { Component } from 'react';
import { connect } from 'react-redux';
import { actions } from 'react-native-navigation-redux-helpers';
import { Image, View, TouchableOpacity } from 'react-native';
import { Container, Content, Thumbnail, Text, Icon, Body, Left, Right } from 'native-base';
import { Grid, Col, Row } from 'react-native-easy-grid';

import HeaderContent from './../headerContent';
import FooterContent from './../footerContent';
import styles from './styles';

const { pushRoute } = actions;

class Profile extends Component { // eslint-disable-line

  static propTypes = {
    pushRoute: React.PropTypes.func,
    navigation: React.PropTypes.shape({
      key: React.PropTypes.string,
    }),
  }

  constructor(props) {
    super(props);

    this.pushRoute = this.pushRoute.bind(this);
  }

  pushRoute(route) {
    this.props.pushRoute({ key: route, index: 1 }, this.props.navigation.key);
  }

  render() { // eslint-disable-line class-methods-use-this
    return (
      <Container>
        <View style={styles.container}>
          <HeaderContent subtitle={'Mon profil'} />
          <Content>
            <View style={styles.profileInfoContainer}>
              <TouchableOpacity style={{ alignSelf: 'center' }}>
                <Thumbnail source={require('../../../images/contacts/sanket.png')} style={styles.profilePic} />
              </TouchableOpacity>
              <View style={styles.profileInfo}>
                <TouchableOpacity>
                  <Text style={styles.profileUser}>Kumar Sanket</Text>
                </TouchableOpacity>
              </View>
            </View>
            <View style={styles.itemsContainer}>
              <TouchableOpacity style={styles.itemContainer} onPress={() => this.pushRoute('profileUpdate')}>
                <Left>
                  <Icon name="person" style={styles.newsIcon} />
                </Left>
                <Body style={styles.newsContent}>
                  <Text style={styles.newsHeader}>
                      Informations générales
                  </Text>
                    <Text style={styles.newsLink}>+33 6 28 43 40 08</Text>
                    <Text style={styles.newsLink}>tannier.yannis@gmail.com</Text>
                </Body>
                <Right>
                  <Icon name="arrow-forward" style={styles.newsIcon} />
                </Right>
              </TouchableOpacity>
              <TouchableOpacity style={styles.itemContainer} onPress={() => this.pushRoute('experienceList')}>
                <Left>
                  <Icon name="briefcase" style={styles.newsIcon} />
                </Left>
                <Body style={styles.newsContent}>
                  <Text style={styles.newsHeader}>
                    Mes expériences
                  </Text>
                  <Text style={styles.newsLink}>Dailymotion</Text>
                  <Text style={styles.newsLink}>Weezevent</Text>
                </Body>
                <Right>
                  <Icon name="arrow-forward" style={styles.newsIcon} />
                </Right>
              </TouchableOpacity>
              <TouchableOpacity style={styles.itemContainer} onPress={() => this.pushRoute('educationList')}>
                <Left>
                  <Icon name="glasses" style={styles.newsIcon} />
                </Left>
                <Body style={styles.newsContent}>
                  <Text style={styles.newsHeader}>
                    Mes formations
                  </Text>
                  <Text style={styles.newsLink}>Makina Corpus</Text>
                  <Text style={styles.newsLink}>ESGI</Text>
                </Body>
                <Right>
                  <Icon name="arrow-forward" style={styles.newsIcon} />
                </Right>
              </TouchableOpacity>
              <TouchableOpacity style={styles.itemContainer}>
                <Left>
                  <Icon name="star-half" style={styles.newsIcon} />
                </Left>
                <Body style={styles.newsContent}>
                  <Text style={styles.newsHeader}>
                    Mes compétences
                  </Text>
                  <Text style={styles.newsLink}>Python, Django, SQL, GraphQL</Text>
                </Body>
                <Right>
                  <Icon name="arrow-forward" style={styles.newsIcon} />
                </Right>
              </TouchableOpacity>
              <TouchableOpacity style={styles.itemContainer} onPress={() => this.pushRoute('languageList')}>
                <Left>
                  <Icon name="chatboxes" style={styles.newsIcon} />
                </Left>
                <Body style={styles.newsContent}>
                  <Text style={styles.newsHeader}>
                    Mes langues
                  </Text>
                  <Text style={styles.newsLink}>Français</Text>
                  <Text style={styles.newsLink}>Anglais</Text>
                </Body>
                <Right>
                  <Icon name="arrow-forward" style={styles.newsIcon} />
                </Right>
              </TouchableOpacity>
              <TouchableOpacity style={styles.itemContainer}>
                <Left>
                  <Icon name="beer" style={styles.newsIcon} />
                </Left>
                <Body style={styles.newsContent}>
                  <Text style={styles.newsHeader}>
                    Mes intérêts
                  </Text>
                  <Text style={styles.newsLink}>Rugby, cinéma, série, sport</Text>
                </Body>
                <Right>
                  <Icon name="arrow-forward" style={styles.newsIcon} />
                </Right>
              </TouchableOpacity>
            </View>
          </Content>
          <FooterContent currentTab={'profile'} />
        </View>
      </Container>
    );
  }
}

const mapStateToProps = state => ({
  navigation: state.cardNavigation,
});

function mapDispatchToProps(dispatch) {
  return {
    pushRoute: (route, key) => dispatch(pushRoute(route, key)),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Profile);
