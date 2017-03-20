import React, { Component } from 'react';
import { connect } from 'react-redux';
import { actions } from 'react-native-navigation-redux-helpers';
import { Container, Content, ListItem, Text, Button } from 'native-base';

import HeaderContent from './../headerContent';
import FooterContent from './../footerContent';
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
    return educations.map((education, index) => {
      return (
        <ListItem key={index} style={styles.education}>
          <Text style={styles.educationText}>{education}</Text>
        </ListItem>
      )
    })
  }

  render() { // eslint-disable-line class-methods-use-this
    return (
      <Container style={styles.container}>
          <HeaderContent hasBackButton={true} subtitle={'Formations'} />
          <Content>
            {this.renderEducations()}
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

export default connect(mapStateToProps, mapDispatchToProps)(EducationList);