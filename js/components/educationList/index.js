import React, { Component } from 'react';
import { connect } from 'react-redux';
import { actions } from 'react-native-navigation-redux-helpers';
import { Container, Content, ListItem, Text, Button } from 'native-base';

import HeaderContent from './../headerContent';
import FooterContent from './../footerContent';
import Loader from './../loader';
import styles from './styles';

const { pushRoute } = actions;

const educations = ['Makina Corpus', 'ESGI', 'Charles de Foucauld'];

class EducationList extends Component { // eslint-disable-line

  static propTypes = {
    pushRoute: React.PropTypes.func,
    navigation: React.PropTypes.shape({
      key: React.PropTypes.string,
    }),
  }

  constructor(props) {
    super(props);

    this.pushRoute = this.pushRoute.bind(this);
    this.renderEducations = this.renderEducations.bind(this);
  }

  pushRoute(route) {
    this.props.pushRoute({ key: route, index: 1 }, this.props.navigation.key);
  }

  renderEducations() {
    const { fetching, fulfilled, error, educations } = this.props.educations;

    if (error) {
      return (
        <ListItem style={styles.education}>
          <Text style={{color: 'red'}}>Erreur...</Text>
        </ListItem>
      );
    }
    else if (fulfilled) {
      if (educations.length > 0) {
        return educations.map((education) => {
          return (
            <ListItem key={education.id} style={styles.education} onPress={() => this.pushRoute('educationForm')}>
              <Text style={styles.educationText}>{education.school}</Text>
            </ListItem>
          );
        });
      }
      else {
        return (
          <ListItem style={styles.education}>
            <Text style={styles.educationText}>Aucune formation</Text>
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
          <HeaderContent hasBackButton={true} subtitle={'Formations'} />
          <Content>
            {this.renderEducations()}
            <Button block rounded bordered style={styles.btnAdd} onPress={() => this.pushRoute('educationForm')}>
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
  educations: state.educations.educationList,
});

function mapDispatchToProps(dispatch) {
  return {
    pushRoute: (route, key) => dispatch(pushRoute(route, key)),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(EducationList);
