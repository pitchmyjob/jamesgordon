import React, { Component } from 'react';
import { connect } from 'react-redux';
import { actions } from 'react-native-navigation-redux-helpers';
import { Container, Content, ListItem, Text, Button } from 'native-base';

import HeaderContent from './../headerContent';
import FooterContent from './../footerContent';
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
    return experiences.map((experience, index) => {
      return (
        <ListItem key={index} style={styles.experience}>
          <Text style={styles.experienceText}>{experience}</Text>
        </ListItem>
      )
    })
  }

  render() { // eslint-disable-line class-methods-use-this
    return (
      <Container style={styles.container}>
          <HeaderContent hasBackButton={true} />
          <Content>
            {this.renderExperiences()}
            <Button block rounded bordered style={styles.btnAdd}>
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
});

function mapDispatchToProps(dispatch) {
  return {
    pushRoute: (route, key) => dispatch(pushRoute(route, key)),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(ExperienceList);
