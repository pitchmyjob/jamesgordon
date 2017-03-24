import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Container, Content, DeckSwiper, Thumbnail, Card, CardItem, Left, Right, Body, Icon, Text, View, Button } from 'native-base';

import HeaderContent from './../headerContent';
import FooterContent from './../footerContent';
import Loader from './../loader';
import styles from './styles';

import { listCandidacy, likeCandidacy } from '../../actions/candidacies';

class Matching extends Component { // eslint-disable-line

  static propTypes = {
    navigation: React.PropTypes.shape({
      key: React.PropTypes.string,
    }),
  }

  constructor(props) {
    super(props);

    this.renderCandidaies = this.renderCandidaies.bind(this);
  }

  componentDidMount() {
    this.props.listMatchingCandidacy();
  }

  renderCandidaies() {
    const { fetching, fulfilled, error, candidacies } = this.props.candidacyList;
    const { candidacyActions } = this.props;

    if (error) {
      return (
        <Card>
          <CardItem bordered>
            <Body>
              <Text style={{color: 'red'}}>Erreur...</Text>
            </Body>
          </CardItem>
        </Card>
      );
    }
    else if (fulfilled) {
      if (candidacies.length > 0) {
        return candidacies.map((candidacy) => {
          const actionRunning = (candidacyActions.indexOf(candidacy.id) !== -1);

          return (
            <Card key={candidacy.id}>
              <CardItem bordered>
                <Left>
                  <Thumbnail source={{uri: candidacy.job.pro.logo}} />
                </Left>
                <Body>
                  <Text style={styles.textBlack}>{candidacy.job.pro.company}</Text>
                  <Text note>{candidacy.job.title}</Text>
                  <Text note>
                    {candidacy.job.contract_types_extra.join(', ')}
                  </Text>
                </Body>
                <Right>
                  <Text note>{candidacy.matching_score}%</Text>
                </Right>
              </CardItem>
              <CardItem>
                <Body>
                  <Text style={styles.textBlack}>{candidacy.job.description}</Text>
                </Body>
              </CardItem>
              <CardItem>
                <Body>
                  <Text note>Compétences : {candidacy.job.skills.join(', ')}</Text>
                </Body>
              </CardItem>
              <CardItem>
                <Body>
                  <Text note>{candidacy.job.address}</Text>
                  <Text note>{candidacy.job.created}</Text>
                </Body>
                <Right>
                  <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'space-between' }}>
                    {
                      !actionRunning &&
                      <View>
                        <Button transparent onPress={() => this.props.likeCandidacy(candidacy.id)}>
                          <Icon name="heart" style={styles.heartIcon} />
                        </Button>
                        <Button transparent>
                          <Icon name="camera" />
                        </Button>
                        <Button transparent>
                          <Icon name="trash" />
                        </Button>
                      </View>
                    }
                    {
                      actionRunning && <Loader />
                    }
                  </View>
                </Right>
              </CardItem>
            </Card>
          );
        });
      }
      else {
        return (
          <Card>
            <CardItem bordered>
              <Body>
                <Text style={styles.textBlack}>Aucune offre</Text>
              </Body>
            </CardItem>
          </Card>
        );
      }
    }
    else {
      return <Loader />;
    }
  }

  render() { // eslint-disable-line class-methods-use-this
    return (
      <Container>
        <View style={styles.container}>
          <HeaderContent hasBackButton={true} subtitle={'Offres'} />
          <Content style={styles.deck}>
            {this.renderCandidaies()}
          </Content>
          <FooterContent currentTab={'matching'} />
        </View>
      </Container>
    );
  }
}

const mapStateToProps = state => ({
  navigation: state.cardNavigation,
  candidacyList: state.candidacies.candidacyList,
  candidacyActions: state.candidacies.candidacyActions,
});

function mapDispatchToProps(dispatch) {
  return {
    listMatchingCandidacy: () => {
      return dispatch(listCandidacy());
    },
    likeCandidacy: (id) => {
      return dispatch(likeCandidacy(id));
    },
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Matching);
