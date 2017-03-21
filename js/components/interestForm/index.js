import React, { Component } from 'react';
import { connect } from 'react-redux';
import { View } from 'react-native';
import { Container, Content, Text, Form, Item, Input, Label, Button, Icon } from 'native-base';

import HeaderContent from './../headerContent';
import FooterContent from './../footerContent';
import Loader from './../loader';
import styles from './styles';

import { destroyInterest } from '../../actions/interests'

class InterestForm extends Component { // eslint-disable-line

  static propTypes = {
    navigation: React.PropTypes.shape({
      key: React.PropTypes.string,
    }),
  }

  constructor(props) {
    super(props);

    this.state = {
      interest: '',
    };

    this.addInterest = this.addInterest.bind(this);
    this.renderInterests = this.renderInterests.bind(this);
  }

  addInterest(event) {
    if (!this.state.interests.includes(this.state.interest)) {
      const newInterestList = this.state.interests.concat(this.state.interest);
      this.setState({interests: newInterestList});
    }

    this.setState({ interest: '' });
  }

  renderInterests() {
    const { fetching, fulfilled, error, interests } = this.props.interestList;
    const interestActive = this.props.interestActive.interest;

    if (error) {
      return (
        <Item style={styles.interestItem}>
          <Text style={{color: 'red'}}>Erreur...</Text>
        </Item>
      );
    }
    else if (fulfilled) {
      if (interests.length > 0) {
        return interests.map((interest) => {
          const destroying = (interestActive === interest);

          return (
            <Item
              key={interest.id}
              style={styles.interestItem}
            >
              <Text style={styles.textBlack}>{interest.name}</Text>
              {
                !destroying &&
                <Button dark transparent onPress={() => this.props.destroyInterest(interest.id)}>
                  <Icon name="close" />
                </Button>
              }
              {destroying && <Loader />}
            </Item>
          );
        });
      }
      else {
        return (
          <Item style={styles.interestItem}>
            <Text style={styles.newsLink}>Aucun intérêt</Text>
          </Item>
        );
      }
    }
    else {
      return (
        <Item style={styles.interestItem}>
          <Loader />
        </Item>
      );
    }
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
          {this.renderInterests()}
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
  interestList: state.interests.interestList,
  interestActive: state.interests.interestActive,
});

const mapDispatchToProps = (dispatch) => {
  return {
    destroyInterest: (id) => {
      return dispatch(destroyInterest(id))
    },
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(InterestForm);
