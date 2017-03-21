import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Container, Content, DeckSwiper, Thumbnail, Card, CardItem, Left, Right, Body, Icon, Text, View, Button } from 'native-base';

import HeaderContent from './../headerContent';
import FooterContent from './../footerContent';
import styles from './styles';

const cards = [
  {
    matchingScore: 92,
    job: {
      company: {
        'name': 'airbnb',
        'logo': require('../../../images/companies/company-logo-1.png'),
      },
      title: 'CTO',
      address: 'Paris 18e',
      description: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Neque necessitatibus quam amet mollitia consequatur iste.',
      created: '2 jours',
      skills: ['php', 'aws'],
      contractTypes: ['CDI', 'CDD'],
      liked: false,
    },
  },
  {
    matchingScore: 82,
    job: {
      company: {
        'name': 'Dailymotion',
        'logo': require('../../../images/companies/company-logo-2.png'),
      },
      title: 'Développeur Python backend',
      address: 'Aubervilliers',
      description: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Neque necessitatibus quam amet mollitia consequatur iste.',
      created: '4 jours',
      skills: ['python', 'graphQL'],
      contractTypes: ['CDD'],
      liked: true,
    },
  },
  {
    matchingScore: 50,
    job: {
      company: {
        'name': 'Uber',
        'logo': require('../../../images/companies/company-logo-3.png'),
      },
      title: 'Développeur Windaube',
      address: 'Marseille',
      description: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Neque necessitatibus quam amet mollitia consequatur iste.',
      created: '5 jours',
      skills: ['C#'],
      contractTypes: ['CDI'],
      liked: false,
    },
  },
];

class Matching extends Component { // eslint-disable-line

  static propTypes = {
    navigation: React.PropTypes.shape({
      key: React.PropTypes.string,
    }),
  }

  constructor(props) {
    super(props);

    this.renderCards = this.renderCards.bind(this);
  }

  renderCards(item) {
    return cards.map((item, index) => {
      return (
        <Card key={index}>
          <CardItem bordered>
            <Left>
              <Thumbnail source={item.job.company.logo} />
            </Left>
            <Body>
              <Text style={styles.textBlack}>{item.job.company.name}</Text>
              <Text note>{item.job.title}</Text>
              <Text note>
                {item.job.contractTypes.join(', ')}
              </Text>
            </Body>
            <Right>
              <Text note>{item.matchingScore}%</Text>
            </Right>
          </CardItem>
          <CardItem>
            <Body>
              <Text style={styles.textBlack}>{item.job.description}</Text>
            </Body>
          </CardItem>
          <CardItem>
            <Body>
              <Text note>Compétences : {item.job.skills.join(', ')}</Text>
            </Body>
          </CardItem>
          <CardItem>
            <Body>
              <Text note>{item.job.address}</Text>
              <Text note>{item.job.created}</Text>
            </Body>
            <Right>
              <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'space-between' }}>
                <Button transparent>
                  <Icon name="heart" style={styles.heartIcon} active={item.job.liked} />
                </Button>
                <Button transparent>
                  <Icon name="camera" />
                </Button>
                <Button transparent>
                  <Icon name="trash" />
                </Button>
              </View>
            </Right>
          </CardItem>
        </Card>
      );
    });
  }

  render() { // eslint-disable-line class-methods-use-this
    return (
      <Container>
        <View style={styles.container}>
          <HeaderContent />
          <Content style={styles.deck}>
            {this.renderCards()}
          </Content>
          <FooterContent />
        </View>
      </Container>
    );
  }
}

const mapStateToProps = state => ({
  navigation: state.cardNavigation,
});

export default connect(mapStateToProps, null)(Matching);
