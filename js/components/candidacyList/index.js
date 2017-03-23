import React, { Component } from 'react';
import { connect } from 'react-redux';
import { actions } from 'react-native-navigation-redux-helpers';
import { Container, Content, ListItem, Text, Button, Left, Body, Right, Thumbnail, Icon } from 'native-base';

import HeaderContent from './../headerContent';
import FooterContent from './../footerContent';
import Loader from './../loader';
import styles from './styles';

import { listCandidacy } from '../../actions/candidacies'

class CandidacyList extends Component { // eslint-disable-line

  static propTypes = {
    navigation: React.PropTypes.shape({
      key: React.PropTypes.string,
    }),
  }

  constructor(props) {
    super(props);

    this.renderCandidacies = this.renderCandidacies.bind(this);
  }

  componentDidMount() {
    this.props.listCandidacy();
  }

  renderCandidacies() {
    const { fetching, fulfilled, error, candidacies } = this.props.candidacyList;

    if (error) {
      return (
        <ListItem style={styles.candidacy}>
          <Text style={{color: 'red'}}>Erreur...</Text>
        </ListItem>
      );
    }
    else if (fulfilled) {
      if (candidacies.length > 0) {
        return candidacies.map((candidacy) => {
          return (
            <ListItem avatar key={candidacy.id} style={styles.candidacy}>
              <Left>
                {<Thumbnail source={{uri: candidacy.job.pro.logo}} />}
              </Left>
              <Body>
                <Text style={styles.candidacyText}>{candidacy.job.title}</Text>
                <Text note>{candidacy.job.address} / {candidacy.job.pro.company}</Text>
              </Body>
              <Right>
                <Button>
                  <Icon name="chatboxes" />
                </Button>
              </Right>
            </ListItem>
          );
        });
      }
      else {
        return (
          <ListItem style={styles.candidacy}>
            <Text style={styles.candidacyText}>Aucune candidature</Text>
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
          <HeaderContent hasBackButton={true} subtitle={'Candidatures'} />
          <Content>
            {this.renderCandidacies()}
          </Content>
          <FooterContent currentTab={'candidacyList'} />
      </Container>
    );
  }
}

const mapStateToProps = state => ({
  navigation: state.cardNavigation,
  candidacyList: state.candidacies.candidacyList,
});

function mapDispatchToProps(dispatch) {
  return {
    listCandidacy: () => {
      return dispatch(listCandidacy())
    },
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(CandidacyList);
