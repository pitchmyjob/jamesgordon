import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Field, reduxForm } from 'redux-form'
import { View } from 'react-native';
import { Container, Content, Text, Form, Item, Input, Label, Button, Icon } from 'native-base';

import HeaderContent from './../headerContent';
import FooterContent from './../footerContent';
import Loader from './../loader';
import styles from './styles';

import { destroyInterest, createInterest } from '../../actions/interests'
import { renderInput } from '../../utils/forms/renderers'

class InterestForm extends Component { // eslint-disable-line

  static propTypes = {
    navigation: React.PropTypes.shape({
      key: React.PropTypes.string,
    }),
  }

  constructor(props) {
    super(props);

    this.renderInterests = this.renderInterests.bind(this);
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
    const { handleSubmit } = this.props;

    return (
      <Container>
        <HeaderContent
          hasBackButton={true}
          subtitle={'Intérêts'}
        />
        <Content style={styles.container}>
          <Form style={styles.formContainer}>
            <Item stackedLabel style={styles.formInput}>
              <Label>Saisissez un intérêt</Label>
              <Field
                name="name"
                component={renderInput}
                onSubmitEditing={handleSubmit}
              />
            </Item>
          </Form>
          {this.renderInterests()}
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

const config = {
  form: 'InterestForm',
  onSubmit: (values, dispatch, props) => {
    return dispatch(createInterest(values))
      .then((response) => {
        props.reset()
      })
  },
}

export default connect(mapStateToProps, mapDispatchToProps)(reduxForm(config)(InterestForm));
