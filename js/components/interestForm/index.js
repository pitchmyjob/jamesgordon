import React, { Component } from 'react';
import { connect } from 'react-redux';
import { View } from 'react-native';
import { Container, Content, Text, Form, Item, Input, Label, Button, Icon } from 'native-base';

import HeaderContent from './../headerContent';
import FooterContent from './../footerContent';
import styles from './styles';

class InterestForm extends Component { // eslint-disable-line

  static propTypes = {
    navigation: React.PropTypes.shape({
      key: React.PropTypes.string,
    }),
  }

  constructor(props) {
    super(props);

    this.state = {
      interests: ['Rugby', 'Cinéma', 'Séries'],
      interest: '',
    };

    this.addInterest = this.addInterest.bind(this);
    this.removeInterest = this.removeInterest.bind(this);
  }

  addInterest(event) {
    if (!this.state.interests.includes(this.state.interest)) {
      const newInterestList = this.state.interests.concat(this.state.interest);
      this.setState({interests: newInterestList});
    }

    this.setState({ interest: '' });
  }

  removeInterest(index) {
    const newInterestList = this.state.interests.filter((interest, indexList) => {
      return indexList !== index;
    });

    this.setState({interests: newInterestList});
  }

  render() { // eslint-disable-line class-methods-use-this
    return (
      <Container>
        <HeaderContent
          hasBackButton={true}
          subtitle={'Intérêts'}
        />
        <Content style={styles.container}>
          <Form style={styles.formContainer}>
            <Item floatingLabel style={styles.formInput}>
              <Label>Saisissez un intérêt</Label>
              <Input
                onSubmitEditing={this.addInterest}
                onChangeText={interest => this.setState({ interest })}
                value={this.state.interest}
              />
            </Item>
          </Form>
          {
            this.state.interests.map((interest, index) => {
              return (
                <Item
                  key={index}
                  style={styles.interestItem}
                >
                  <Text style={styles.textBlack}>{interest}</Text>
                  <Button dark transparent onPress={() => this.removeInterest(index)}>
                    <Icon name="close" />
                  </Button>
                </Item>
              );
            })
          }
          <Button block rounded bordered style={styles.btnSubmit}>
            <Text>Enregistrer</Text>
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

export default connect(mapStateToProps, null)(InterestForm);
