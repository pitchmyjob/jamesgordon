import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Field, reduxForm } from 'redux-form'
import { View } from 'react-native';
import { Container, Content, Text, Form, Item, Input, Label, Button } from 'native-base';

import HeaderContent from './../headerContent';
import FooterContent from './../footerContent';
import styles from './styles';

import { destroyEducation, createEducation, updateEducation } from '../../actions/educations'
import { renderInput } from '../../utils/forms/renderers'

class EducationForm extends Component { // eslint-disable-line

  static propTypes = {
    navigation: React.PropTypes.shape({
      key: React.PropTypes.string,
    }),
  }

  componentDidMount() {
    if (this.props.educationId) {
      this.props.educations.educations.map((education) => {
        if (education.id === this.props.educationId) {
          this.props.initialize(education);
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
          subtitle={'Formations'}
        />
        <Content style={styles.container}>
          <Form style={styles.formContainer}>
            <Item stackedLabel style={styles.formInput}>
              <Label>École / Organisme</Label>
              <Field
                name="school"
                component={renderInput}
              />
            </Item>
            <Item stackedLabel style={styles.formInput}>
              <Label>Diplôme</Label>
              <Field
                name="degree"
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
  educations: state.educations.educationList,
});

const config = {
  form: 'EducationForm',
  onSubmit: (values, dispatch, props) => {
    if (props.educationId) {
      return dispatch(updateEducation(props.educationId, values))
        .then((response) => {
          props.reset()
        })
    }
    else {
      return dispatch(createEducation(values))
        .then((response) => {
          props.reset()
        })
    }
  },
}

export default connect(mapStateToProps, null)(reduxForm(config)(EducationForm));
