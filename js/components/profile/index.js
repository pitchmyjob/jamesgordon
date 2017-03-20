import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Image, View, TouchableOpacity } from 'react-native';
import { Container, Content, Thumbnail, Text, Icon, Body, Left, Right } from 'native-base';
import { Grid, Col, Row } from 'react-native-easy-grid';

import HeaderContent from './../headerContent';
import FooterContent from './../footerContent';
import styles from './styles';

class Profile extends Component { // eslint-disable-line

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
              <TouchableOpacity style={styles.itemContainer}>
                <View style={styles.newsContent}>
                  <Left>
                    <Icon name="apps" />
                  </Left>
                  <Text style={styles.newsHeader}>
                    Informations générales
                  </Text>
                  <Body>
                    <Text style={styles.newsLink}>+33 6 28 43 40 08</Text>
                    <Text style={styles.newsLink}>tannier.yannis@gmail.com</Text>
                  </Body>
                  <Right>
                    <Icon name="arrow-forward" />
                  </Right>
                </View>
              </TouchableOpacity>
              <TouchableOpacity style={styles.itemContainer}>
                <Icon name="apps" style={styles.newsIcon} />
                <View style={styles.newsContent}>
                  <Text style={styles.newsHeader}>
                    Expériences
                  </Text>
                  <Text style={styles.newsLink}>Dailymotion</Text>
                  <Text style={styles.newsLink}>Weezevent</Text>
                </View>
              </TouchableOpacity>
              <TouchableOpacity style={styles.itemContainer}>
                <Icon name="apps" style={styles.newsIcon} />
                <View style={styles.newsContent}>
                  <Text style={styles.newsHeader}>
                    Formations
                  </Text>
                  <Text style={styles.newsLink}>Makina Corpus</Text>
                  <Text style={styles.newsLink}>ESGI</Text>
                </View>
              </TouchableOpacity>
              <TouchableOpacity style={styles.itemContainer}>
                <Icon name="apps" style={styles.newsIcon} />
                <View style={styles.newsContent}>
                  <Text style={styles.newsHeader}>
                    Compétences
                  </Text>
                  <Text style={styles.newsLink}>Python, Django, SQL, GraphQL</Text>
                </View>
              </TouchableOpacity>
              <TouchableOpacity style={styles.itemContainer}>
                <Icon name="apps" style={styles.newsIcon} />
                <View style={styles.newsContent}>
                  <Text style={styles.newsHeader}>
                    Langues
                  </Text>
                  <Text style={styles.newsLink}>Français</Text>
                  <Text style={styles.newsLink}>Anglais</Text>
                </View>
              </TouchableOpacity>
              <TouchableOpacity style={styles.itemContainer}>
                <Icon name="apps" style={styles.newsIcon} />
                <View style={styles.newsContent}>
                  <Text style={styles.newsHeader}>
                    Intérêts
                  </Text>
                  <Text style={styles.newsLink}>Rugby, cinéma, série, sport</Text>
                </View>
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

export default connect(mapStateToProps, null)(Profile);
