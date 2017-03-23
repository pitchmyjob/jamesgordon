import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Field, reduxForm } from 'redux-form'
import { View } from 'react-native';
import { Container, Content, Text, Form, Item, Input, Label, Button } from 'native-base';

import HeaderContent from './../headerContent';
import FooterContent from './../footerContent';
import styles from './styles';

import { destroyLanguage, createLanguage, updateLanguage } from '../../actions/languages'
import { renderInput } from '../../utils/forms/renderers'

class LanguageForm extends Component { // eslint-disable-line

  static propTypes = {
    navigation: React.PropTypes.shape({
      key: React.PropTypes.string,
    }),
  }

  componentDidMount() {
    if (this.props.languageId) {
      this.props.languages.languages.map((language) => {
        if (language.id === this.props.languageId) {
          this.props.initialize(language);
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
              <Label>Langue</Label>
              <Field
                name="name"
                component={renderInput}
              />
            </Item>
            <Item stackedLabel style={styles.formInput}>
              <Label>Niveau</Label>
              <Field
                name="level"
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
  languages: state.languages.languageList,
});

const config = {
  form: 'LanguageForm',
  onSubmit: (values, dispatch, props) => {
    if (props.languageId) {
      return dispatch(updateLanguage(props.languageId, values))
        .then((response) => {
          props.reset()
        })
    }
    else {
      return dispatch(createLanguage(values))
        .then((response) => {
          props.reset()
        })
    }
  },
}

export default connect(mapStateToProps, null)(reduxForm(config)(LanguageForm));
