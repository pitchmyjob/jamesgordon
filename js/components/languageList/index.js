import React, { Component } from 'react';
import { connect } from 'react-redux';
import { actions } from 'react-native-navigation-redux-helpers';
import { Container, Content, ListItem, Text, Button, Body, Right, Icon } from 'native-base';

import HeaderContent from './../headerContent';
import FooterContent from './../footerContent';
import Loader from './../loader';
import styles from './styles';

import { destroyLanguage } from '../../actions/languages'

const { pushRoute } = actions;

class LanguageList extends Component { // eslint-disable-line

  static propTypes = {
    pushRoute: React.PropTypes.func,
    navigation: React.PropTypes.shape({
      key: React.PropTypes.string,
    }),
  }

  constructor(props) {
    super(props);

    this.pushRoute = this.pushRoute.bind(this);
    this.renderLanguages = this.renderLanguages.bind(this);
  }

  pushRoute(route, languageId = null) {
    this.props.pushRoute({ key: route, index: 1, languageId: languageId }, this.props.navigation.key);
  }

  renderLanguages() {
    const { fetching, fulfilled, error, languages } = this.props.languageList;
    const destroyingLanguages = this.props.languageDestroy.languages;

    if (error) {
      return (
        <ListItem style={styles.language}>
          <Text style={{color: 'red'}}>Erreur...</Text>
        </ListItem>
      );
    }
    else if (fulfilled) {
      if (languages.length > 0) {
        return languages.map((language) => {
          const destroying = (destroyingLanguages.indexOf(language.id) !== -1);

          return (
            <ListItem key={language.id} style={styles.language} onPress={() => this.pushRoute('languageForm', language.id)}>
              <Body>
                <Text style={styles.languageText}>{language.name}</Text>
              </Body>
              <Right>
                {
                  !destroying &&
                  <Button transparent onPress={() => this.props.destroyLanguage(language.id)}>
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
          <ListItem style={styles.language}>
            <Text style={styles.languageText}>Aucune langue</Text>
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
          <HeaderContent
            hasBackButton={true}
            subtitle={'Langues'}
          />
          <Content>
            {this.renderLanguages()}
            <Button block rounded bordered style={styles.btnAdd} onPress={() => this.pushRoute('languageForm')}>
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
  languageList: state.languages.languageList,
  languageDestroy: state.languages.languageDestroy,
});

function mapDispatchToProps(dispatch) {
  return {
    pushRoute: (route, key) => dispatch(pushRoute(route, key)),
    destroyLanguage: (id) => {
      return dispatch(destroyLanguage(id));
    },
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(LanguageList);
