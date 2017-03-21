import React, { Component } from 'react';
import { connect } from 'react-redux';
import { View } from 'react-native';
import { Container, Content, Text, Form, Item, Input, Label, Button } from 'native-base';

import HeaderContent from './../headerContent';
import FooterContent from './../footerContent';
import styles from './styles';

class ExperienceForm extends Component { // eslint-disable-line

  static propTypes = {
    navigation: React.PropTypes.shape({
      key: React.PropTypes.string,
    }),
  }

  render() { // eslint-disable-line class-methods-use-this
    return (
      <Container>
        <HeaderContent
          hasBackButton={true}
          subtitle={'Expériences'}
        />
        <Content style={styles.container}>
          <Form style={styles.formContainer}>
            <Item floatingLabel style={styles.formInput}>
              <Label>Entreprise</Label>
              <Input />
            </Item>
            <Item floatingLabel style={styles.formInput}>
              <Label>Poste occupé</Label>
              <Input />
            </Item>
            <Item floatingLabel style={styles.formInput}>
              <Label>Lieu</Label>
              <Input />
            </Item>
            <Item floatingLabel style={styles.formInput}>
              <Label>Date de début</Label>
              <Input />
            </Item>
            <Item floatingLabel style={styles.formInput}>
              <Label>Date de fin</Label>
              <Input />
            </Item>
            <Item floatingLabel style={styles.formInput}>
              <Label>Description</Label>
              <Input />
            </Item>
            <Button block rounded bordered style={styles.btnSubmit}>
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
});

export default connect(mapStateToProps, null)(ExperienceForm);
