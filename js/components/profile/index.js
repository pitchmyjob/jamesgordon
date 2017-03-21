import React, { Component } from 'react';
import { connect } from 'react-redux';
import { actions } from 'react-native-navigation-redux-helpers';
import { Image, View, TouchableOpacity } from 'react-native';
import { Container, Content, Thumbnail, Text, Icon, Body, Left, Right } from 'native-base';
import { Grid, Col, Row } from 'react-native-easy-grid';

import HeaderContent from './../headerContent';
import FooterContent from './../footerContent';
import Loader from './../loader';
import styles from './styles';

import { listExperience } from '../../actions/experiences'
import { listEducation } from '../../actions/educations'
import { listSkill } from '../../actions/skills'
import { listLanguage } from '../../actions/languages'
import { listInterest } from '../../actions/interests'

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
    this.renderExperiences = this.renderExperiences.bind(this);
    this.renderEducations = this.renderEducations.bind(this);
    this.renderLanguages = this.renderLanguages.bind(this);
    this.renderSkills = this.renderSkills.bind(this);
    this.renderInterests = this.renderInterests.bind(this);
  }

  componentDidMount() {
    this.props.listExperience();
    this.props.listEducation();
    this.props.listSkill();
    this.props.listLanguage();
    this.props.listInterest();
  }

  pushRoute(route) {
    this.props.pushRoute({ key: route, index: 1 }, this.props.navigation.key);
  }

  renderExperiences() {
    const { fetching, fulfilled, error, experiences } = this.props.experiences

    if (error) {
      return <Text style={{color: 'red'}}>Erreur...</Text>
    }
    else if (fulfilled) {
      if (experiences.length > 0) {
        return experiences.map((experience) => {
          return <Text key={experience.id} style={styles.newsLink}>{experience.company}</Text>
        });
      }
      else {
        return <Text style={styles.newsLink}>Aucune expérience</Text>
      }
    }
    else {
      return <Loader />
    }
  }

  renderEducations() {
    const { fetching, fulfilled, error, educations } = this.props.educations

    if (error) {
      return <Text style={{color: 'red'}}>Erreur...</Text>
    }
    else if (fulfilled) {
      if (educations.length > 0) {
        return educations.map((education) => {
          return <Text key={education.id} style={styles.newsLink}>{education.school}</Text>
        });
      }
      else {
        return <Text style={styles.newsLink}>Aucune formation</Text>
      }
    }
    else {
      return <Loader />
    }
  }

  renderSkills() {
    const { fetching, fulfilled, error, skills } = this.props.skills

    if (error) {
      return <Text style={{color: 'red'}}>Erreur...</Text>
    }
    else if (fulfilled) {
      if (skills.length > 0) {
        const skillList = skills.map((skill) => {
          return skill.name;
        });

        return <Text style={styles.newsLink}>{skillList.join(', ')}</Text>;
      }
      else {
        return <Text style={styles.newsLink}>Aucune compétence</Text>
      }
    }
    else {
      return <Loader />
    }
  }

  renderLanguages() {
    const { fetching, fulfilled, error, languages } = this.props.languages

    if (error) {
      return <Text style={{color: 'red'}}>Erreur...</Text>
    }
    else if (fulfilled) {
      if (languages.length > 0) {
        return languages.map((language) => {
          return <Text key={language.id} style={styles.newsLink}>{language.name}</Text>
        });
      }
      else {
        return <Text style={styles.newsLink}>Aucune langue</Text>
      }
    }
    else {
      return <Loader />
    }
  }

  renderInterests() {
    const { fetching, fulfilled, error, interests } = this.props.interests

    if (error) {
      return <Text style={{color: 'red'}}>Erreur...</Text>
    }
    else if (fulfilled) {
      if (interests.length > 0) {
        const interestList = interests.map((interest) => {
          return interest.name;
        });

        return <Text style={styles.newsLink}>{interestList.join(', ')}</Text>;
      }
      else {
        return <Text style={styles.newsLink}>Aucun intérêt</Text>
      }
    }
    else {
      return <Loader />
    }
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
                  {this.renderExperiences()}
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
                  {this.renderEducations()}
                </Body>
                <Right>
                  <Icon name="arrow-forward" style={styles.newsIcon} />
                </Right>
              </TouchableOpacity>
              <TouchableOpacity style={styles.itemContainer} onPress={() => this.pushRoute('skillForm')}>
                <Left>
                  <Icon name="star-half" style={styles.newsIcon} />
                </Left>
                <Body style={styles.newsContent}>
                  <Text style={styles.newsHeader}>
                    Mes compétences
                  </Text>
                  {this.renderSkills()}
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
                  {this.renderLanguages()}
                </Body>
                <Right>
                  <Icon name="arrow-forward" style={styles.newsIcon} />
                </Right>
              </TouchableOpacity>
              <TouchableOpacity style={styles.itemContainer} onPress={() => this.pushRoute('interestForm')}>
                <Left>
                  <Icon name="beer" style={styles.newsIcon} />
                </Left>
                <Body style={styles.newsContent}>
                  <Text style={styles.newsHeader}>
                    Mes intérêts
                  </Text>
                  {this.renderInterests()}
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
  experiences: state.experiences.experienceList,
  educations: state.educations.educationList,
  skills: state.skills.skillList,
  languages: state.languages.languageList,
  interests: state.interests.interestList,
});

const mapDispatchToProps = (dispatch) => {
  return {
    pushRoute: (route, key) => {
      return dispatch(pushRoute(route, key))
    },
    listExperience: () => {
      return dispatch(listExperience())
    },
    listEducation: () => {
      return dispatch(listEducation())
    },
    listSkill: () => {
      return dispatch(listSkill())
    },
    listLanguage: () => {
      return dispatch(listLanguage())
    },
    listInterest: () => {
      return dispatch(listInterest())
    },
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Profile);
