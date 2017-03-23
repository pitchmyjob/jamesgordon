import React, { Component } from 'react';
import { connect } from 'react-redux';
import { actions } from 'react-native-navigation-redux-helpers';
import { Container, Content, ListItem, Text, Button, Body, Right, Icon } from 'native-base';

import HeaderContent from './../headerContent';
import FooterContent from './../footerContent';
import Loader from './../loader';
import styles from './styles';

import { destroyExperience } from '../../actions/experiences'

const { pushRoute } = actions;

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

  pushRoute(route, experienceId = null) {
    this.props.pushRoute({ key: route, index: 1, experienceId: experienceId }, this.props.navigation.key);
  }

  renderExperiences() {
    const { fetching, fulfilled, error, experiences } = this.props.experienceList;
    const experienceActive = this.props.experienceActive.experience;

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
          const destroying = (experienceActive === experience);

          return (
            <ListItem key={experience.id} style={styles.experience} onPress={() => this.pushRoute('experienceForm', experience.id)}>
              <Body>
                <Text style={styles.experienceText}>{experience.company}</Text>
              </Body>
              <Right>
                {
                  !destroying &&
                  <Button transparent onPress={() => this.props.destroyExperience(experience.id)}>
                    <Icon name="trash" />
                  </Button>
                }
                {
                  destroying && <Loader />
                }
              </Right>
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
  experienceList: state.experiences.experienceList,
  experienceActive: state.experiences.experienceActive,
});

function mapDispatchToProps(dispatch) {
  return {
    pushRoute: (route, key) => dispatch(pushRoute(route, key)),
    destroyExperience: (id) => {
      return dispatch(destroyExperience(id));
    },
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(ExperienceList);
