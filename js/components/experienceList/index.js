import React, { Component } from 'react';
import { connect } from 'react-redux';
import { actions } from 'react-native-navigation-redux-helpers';
import { Container, Content, ListItem, Text, Button } from 'native-base';

import HeaderContent from './../headerContent';
import FooterContent from './../footerContent';
import Loader from './../loader';
import styles from './styles';

const { pushRoute } = actions;

const experiences = ['webCompetence', 'Dailymotion', 'Jacquie & Michel'];

class ExperienceList extends Component { // eslint-disable-line

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
  }

  pushRoute(route) {
    this.props.pushRoute({ key: route, index: 1 }, this.props.navigation.key);
  }

  renderExperiences() {
    const { fetching, fulfilled, error, experiences } = this.props.experiences;

    if (error) {
      return (
        <ListItem style={styles.experience}>
          <Text style={{color: 'red'}}>Erreur...</Text>
        </ListItem>
      );
    }
    else if (fulfilled) {
      if (experiences.length > 0) {
        return experiences.map((experience) => {
          return (
            <ListItem key={experience.id} style={styles.experience} onPress={() => this.pushRoute('experienceForm')}>
              <Text style={styles.experienceText}>{experience.company}</Text>
            </ListItem>
          );
        });
      }
      else {
        return (
          <ListItem style={styles.experience}>
            <Text style={styles.experienceText}>Aucune expérience</Text>
          </ListItem>
        );
      }
    }
    else {
      return <Loader />;
    }
  }

  render() { // eslint-disable-line class-methods-use-this
    return (
      <Container style={styles.container}>
          <HeaderContent hasBackButton={true} subtitle={'Expériences'} />
          <Content>
            {this.renderExperiences()}
            <Button block rounded bordered style={styles.btnAdd} onPress={() => this.pushRoute('experienceForm')}>
              <Text>Ajouter</Text>
            </Button>
          </Content>
          <FooterContent currentTab={'profile'} />
      </Container>
    );
  }
}

const mapStateToProps = state => ({
  navigation: state.cardNavigation,
  experiences: state.experiences.experienceList,
});

function mapDispatchToProps(dispatch) {
  return {
    pushRoute: (route, key) => dispatch(pushRoute(route, key)),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(ExperienceList);
