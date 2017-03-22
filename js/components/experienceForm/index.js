import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Field, reduxForm } from 'redux-form'
import { View } from 'react-native';
import { Container, Content, Text, Form, Item, Input, Label, Button } from 'native-base';

import HeaderContent from './../headerContent';
import FooterContent from './../footerContent';
import styles from './styles';

import { destroyExperience, createExperience, updateExperience } from '../../actions/experiences'
import { renderInput } from '../../utils/forms/renderers'

class ExperienceForm extends Component { // eslint-disable-line

  static propTypes = {
    navigation: React.PropTypes.shape({
      key: React.PropTypes.string,
    }),
  }

  componentDidMount() {
    if (this.props.experienceId) {
      this.props.experiences.experiences.map((experience) => {
        if (experience.id === this.props.experienceId) {
          this.props.initialize(experience);
        }
      });
    }
  }

  render() { // eslint-disable-line class-methods-use-this
    const { handleSubmit } = this.props;

    return (
      <Container>
        <HeaderContent
          hasBackButton={true}
          subtitle={'Expériences'}
        />
        <Content style={styles.container}>
          <Form style={styles.formContainer}>
            <Item stackedLabel style={styles.formInput}>
              <Label>Entreprise</Label>
              <Field
                name="company"
                component={renderInput}
              />
            </Item>
            <Item stackedLabel style={styles.formInput}>
              <Label>Poste occupé</Label>
              <Field
                name="position"
                component={renderInput}
              />
            </Item>
            <Item stackedLabel style={styles.formInput}>
              <Label>Lieu</Label>
              <Field
                name="location"
                component={renderInput}
              />
            </Item>
            <Item stackedLabel style={styles.formInput}>
              <Label>Date de début</Label>
              <Field
                name="date_start"
                component={renderInput}
              />
            </Item>
            <Item stackedLabel style={styles.formInput}>
              <Label>Date de fin</Label>
              <Field
                name="date_end"
                component={renderInput}
              />
            </Item>
            <Item stackedLabel style={styles.formInput}>
              <Label>Description</Label>
              <Field
                name="description"
                component={renderInput}
              />
            </Item>
            <Button block rounded bordered style={styles.btnSubmit} onPress={handleSubmit}>
              <Text>Enregistrer</Text>
            </Button>
          </Form>
        </Content>
        <FooterContent currentTab={'profile'} />
      </Container>
    );
  }
}

const mapStateToProps = state => ({
  navigation: state.cardNavigation,
  experiences: state.experiences.experienceList,
});

const config = {
  form: 'ExperienceForm',
  onSubmit: (values, dispatch, props) => {
    if (props.experienceId) {
      return dispatch(updateExperience(props.experienceId, values))
        .then((response) => {
          props.reset()
        })
    }
    else {
      return dispatch(createExperience(values))
        .then((response) => {
          props.reset()
        })
    }
  },
}

export default connect(mapStateToProps, null)(reduxForm(config)(ExperienceForm));
