import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Container, Content, DeckSwiper, Thumbnail, Card, CardItem, Left, Body, Icon, Text, View, Button } from 'native-base';

import HeaderContent from './../headerContent';
import FooterContent from './../footerContent';
import styles from './styles';

const cards = [
  {
    matchingScore: 92,
    job: {
      'company': {
        'name': 'airbnb',
        'logo': require('../../../images/companies/company-logo-1.png'),
      },
      title: 'CTO',
      'address': 'Paris 18e',
      'description': 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Neque necessitatibus quam amet mollitia consequatur iste.',
      'created': '2 jours',
      'skills': ['php', 'aws'],
      'contractTypes': ['CDI', 'CDD'],
    },
  },
  {
    matchingScore: 82,
    job: {
      'company': {
        'name': 'Dailymotion',
        'logo': require('../../../images/companies/company-logo-2.png'),
      },
      title: 'Développeur Python backend',
      'address': 'Aubervilliers',
      'description': 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Neque necessitatibus quam amet mollitia consequatur iste.',
      'created': '4 jours',
      'skills': ['python', 'graphQL'],
      'contractTypes': ['CDD'],
    },
  },
  {
    matchingScore: 50,
    job: {
      'company': {
        'name': 'Uber',
        'logo': require('../../../images/companies/company-logo-3.png'),
      },
      title: 'Développeur Windaube',
      'address': 'Marseille',
      'description': 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Neque necessitatibus quam amet mollitia consequatur iste.',
      'created': '5 jours',
      'skills': ['C#'],
      'contractTypes': ['CDI'],
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

    this.renderCard = this.renderCard.bind(this);
  }

  renderCard(item) {
    return (
      <Card>
        {/*<CardItem>
          <Left>
            <Thumbnail source={item.job.company.logo} />
          </Left>
          <Body>
            <Text>{item.job.company.name}</Text>
            <Text note>{item.job.title}</Text>
          </Body>
        </CardItem>
        <CardItem>
          <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'space-between' }}>
            <Button transparent>
              <Icon name="heart" />
            </Button>
            <Button transparent>
              <Icon name="camera" />
            </Button>
            <Button transparent>
              <Icon name="trash" />
            </Button>
          </View>
        </CardItem>*/}

        <CardItem>
          <Thumbnail source={item.job.company.logo} />
        </CardItem>
        <CardItem>
          <Text>
            {item.job.contractTypes.map((contractType) => {
              return '#' + contractType
            })}
          </Text>
          <Text>{item.matchingScore}%</Text>
        </CardItem>
        <CardItem>
          <Text>{item.job.address}</Text>
          <Text>{item.job.description}</Text>
          <Text>il y a {item.job.created}</Text>
          <Text>Compétences recherchées : {item.job.skills.join(', ')}</Text>
        </CardItem>
        <CardItem>
          <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'space-between' }}>
            <Button transparent>
              <Icon name="heart" />
            </Button>
            <Button transparent>
              <Icon name="camera" />
            </Button>
            <Button transparent>
              <Icon name="trash" />
            </Button>
          </View>
        </CardItem>
      </Card>
    );
  }
  render() { // eslint-disable-line class-methods-use-this
    return (
      <Container>
        <View style={styles.container}>
          <HeaderContent />
          <Content style={styles.deck}>
            <DeckSwiper
              dataSource={cards}
              renderItem={this.renderCard}
            />
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
