import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Image, View, TouchableOpacity, Platform } from 'react-native';
import { actions } from 'react-native-navigation-redux-helpers';
import { Container, Header, Content, Text, Icon, Thumbnail, Left, Button, Body, Right } from 'native-base';
import { Grid, Col, Row } from 'react-native-easy-grid';

import { openDrawer } from '../../actions/drawer';
import navigateTo from '../../actions/sideBarNav';

import theme from '../../themes/base-theme';
import styles from './styles';

const { reset, pushRoute } = actions;

const headerLogo = require('../../../images/header-logo.png');

class Home extends Component {

  static propTypes = {
    reset: React.PropTypes.func,
    navigateTo: React.PropTypes.func,
    navigation: React.PropTypes.shape({
      key: React.PropTypes.string,
    }),
  }

  navigateTo(route) {
    this.props.navigateTo(route, 'home');
  }

  render() {
    return (
      <Container theme={theme}>
        <Image source={require('../../../images/glow2.png')} style={styles.container} >
          <Header>
            <Left>
              <Button
                transparent
                style={styles.btnHeader}
                onPress={() => this.props.reset(this.props.navigation.key)}
              >
                <Icon active name="power" />
              </Button>
            </Left>
            <Body>
              <Image source={headerLogo} style={styles.imageHeader} />
            </Body>
            <Right>
              {/*<Button transparent style={styles.btnHeader} onPress={this.props.openDrawer} >
                <Icon active name="menu" />
              </Button>*/}
            </Right>
          </Header>

          <Content>
            <View style={styles.profileInfoContainer}>
              <TouchableOpacity style={{ alignSelf: 'center' }}>
                <Thumbnail source={require('../../../images/contacts/sanket.png')} style={styles.profilePic} />
              </TouchableOpacity>
              <View style={styles.profileInfo}>
                <TouchableOpacity>
                  <Text style={styles.profileUser}>Kumar Sanket</Text>
                </TouchableOpacity>
                <TouchableOpacity>
                  <Text note style={styles.profileUserInfo}>Développeur Python / Django</Text>
                </TouchableOpacity>
              </View>
            </View>

            <View style={styles.linkTabs}>
              <Grid>
                <Col>
                  <TouchableOpacity style={styles.linkTabs_header}>
                    <Text style={styles.linkTabs_tabCounts}>13</Text>
                    <Text note style={styles.linkTabs_tabName}>Aimé</Text>
                  </TouchableOpacity>
                </Col>
                <Col>
                  <TouchableOpacity style={styles.linkTabs_header}>
                    <Text style={styles.linkTabs_tabCounts}>12</Text>
                    <Text note style={styles.linkTabs_tabName}>En cours</Text>
                  </TouchableOpacity>
                </Col>
                <Col>
                  <TouchableOpacity style={styles.linkTabs_header}>
                    <Text style={styles.linkTabs_tabCounts}>52</Text>
                    <Text note style={styles.linkTabs_tabName}>Terminé</Text>
                  </TouchableOpacity>
                </Col>
              </Grid>
            </View>
            <View style={{ backgroundColor: '#fff' }}>
              <TouchableOpacity style={styles.newsContainer}>
                <Image source={require('../../../images/companies/company-logo-1.png')} style={styles.newsImage} />
                <View style={styles.newsContent}>
                  <Text numberOfLines={2} style={styles.newsHeader}>
                    Développeur backend
                  </Text>
                  <Grid style={{ marginTop: 25 }}>
                    <Col>
                      <TouchableOpacity>
                        <Text style={styles.newsLink}>CDD, CDI</Text>
                      </TouchableOpacity>
                    </Col>
                    <Col>
                      <TouchableOpacity style={styles.newsTypeView}>
                        <Text style={styles.newsTypeText}>Paris, Île-de-France</Text>
                      </TouchableOpacity>
                    </Col>
                  </Grid>
                </View>
              </TouchableOpacity>
              <TouchableOpacity style={styles.newsContainer}>
                <Image source={require('../../../images/companies/company-logo-2.png')} style={styles.newsImage} />
                <View style={styles.newsContent}>
                  <Text numberOfLines={2} style={styles.newsHeader}>
                    Développeur fullstack
                  </Text>
                  <Grid style={{ marginTop: 25 }}>
                    <Col>
                      <TouchableOpacity>
                        <Text style={styles.newsLink}>CDD, CDI</Text>
                      </TouchableOpacity>
                    </Col>
                    <Col>
                      <TouchableOpacity style={styles.newsTypeView}>
                        <Text style={styles.newsTypeText}>Paris, Île-de-France</Text>
                      </TouchableOpacity>
                    </Col>
                  </Grid>
                </View>
              </TouchableOpacity>
              <TouchableOpacity style={styles.newsContainer}>
                <Image source={require('../../../images/companies/company-logo-3.png')} style={styles.newsImage} />
                <View style={styles.newsContent}>
                  <Text numberOfLines={2} style={styles.newsHeader}>
                    Développeur Python / Django
                  </Text>
                  <Grid style={{ marginTop: 25 }}>
                    <Col>
                      <TouchableOpacity>
                        <Text style={styles.newsLink}>CDD, CDI</Text>
                      </TouchableOpacity>
                    </Col>
                    <Col>
                      <TouchableOpacity style={styles.newsTypeView}>
                        <Text style={styles.newsTypeText}>Paris, Île-de-France</Text>
                      </TouchableOpacity>
                    </Col>
                  </Grid>
                </View>
              </TouchableOpacity>
              <TouchableOpacity style={styles.newsContainer}>
                <Image source={require('../../../images/companies/company-logo-4.jpg')} style={styles.newsImage} />
                <View style={styles.newsContent}>
                  <Text numberOfLines={2} style={styles.newsHeader}>
                    CTO
                  </Text>
                  <Grid style={{ marginTop: 25 }}>
                    <Col>
                      <TouchableOpacity>
                        <Text style={styles.newsLink}>CDD, CDI</Text>
                      </TouchableOpacity>
                    </Col>
                    <Col>
                      <TouchableOpacity style={styles.newsTypeView}>
                        <Text style={styles.newsTypeText}>Paris, Île-de-France</Text>
                      </TouchableOpacity>
                    </Col>
                  </Grid>
                </View>
              </TouchableOpacity>
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
    openDrawer: () => dispatch(openDrawer()),
    reset: key => dispatch(reset([{ key: 'login' }], key, 0)),
    navigateTo: (route, homeRoute) => dispatch(navigateTo(route, homeRoute)),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Home);
