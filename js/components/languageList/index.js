import React, { Component } from 'react';
import { connect } from 'react-redux';
import { actions } from 'react-native-navigation-redux-helpers';
import { Container, Content, ListItem, Text, Button } from 'native-base';

import HeaderContent from './../headerContent';
import FooterContent from './../footerContent';
import Loader from './../loader';
import styles from './styles';

const { pushRoute } = actions;

const languages = ['Français', 'Anglais'];

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

  pushRoute(route) {
    this.props.pushRoute({ key: route, index: 1 }, this.props.navigation.key);
  }

  renderLanguages() {
    const { fetching, fulfilled, error, languages } = this.props.languages;

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
          return (
            <ListItem key={language.id} style={styles.language} onPress={() => this.pushRoute('languageForm')}>
              <Text style={styles.languageText}>{language.name}</Text>
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
  languages: state.languages.languageList,
});

function mapDispatchToProps(dispatch) {
  return {
    pushRoute: (route, key) => dispatch(pushRoute(route, key)),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(LanguageList);
