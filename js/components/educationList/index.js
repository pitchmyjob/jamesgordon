import React, { Component } from 'react';
import { connect } from 'react-redux';
import { actions } from 'react-native-navigation-redux-helpers';
import { Container, Content, ListItem, Text, Button, Body, Right, Icon } from 'native-base';

import HeaderContent from './../headerContent';
import FooterContent from './../footerContent';
import Loader from './../loader';
import styles from './styles';

import { destroyEducation } from '../../actions/educations'

const { pushRoute } = actions;

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

  pushRoute(route, educationId = null) {
    this.props.pushRoute({ key: route, index: 1, educationId: educationId }, this.props.navigation.key);
  }

  renderEducations() {
    const { fetching, fulfilled, error, educations } = this.props.educationList;
    const educationActive = this.props.educationActive.education;

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
          const destroying = (educationActive === education);

          return (
            <ListItem key={education.id} style={styles.education} onPress={() => this.pushRoute('educationForm', education.id)}>
              <Body>
                <Text style={styles.educationText}>{education.school}</Text>
              </Body>
              <Right>
                {
                  !destroying &&
                  <Button transparent onPress={() => this.props.destroyEducation(education.id)}>
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
  educationList: state.educations.educationList,
  educationActive: state.educations.educationActive,
});

function mapDispatchToProps(dispatch) {
  return {
    pushRoute: (route, key) => dispatch(pushRoute(route, key)),
    destroyEducation: (id) => {
      return dispatch(destroyEducation(id));
    },
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(EducationList);
