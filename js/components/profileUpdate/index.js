import React, { Component } from 'react';
import { connect } from 'react-redux';
import { View } from 'react-native';
import { Container, Content, Text, Form, Item, Input, Label, Button } from 'native-base';

import HeaderContent from './../headerContent';
import FooterContent from './../footerContent';
import styles from './styles';

class ProfileUpdate extends Component { // eslint-disable-line

  static propTypes = {
    navigation: React.PropTypes.shape({
      key: React.PropTypes.string,
    }),
  }

  render() { // eslint-disable-line class-methods-use-this
    return (
      <Container>
        <HeaderContent hasBackButton={true} />
        <Content style={styles.container}>
          <Form style={styles.formContainer}>
            <Item floatingLabel style={styles.formInput}>
              <Label>Prénom</Label>
              <Input />
            </Item>
            <Item floatingLabel style={styles.formInput}>
              <Label>Nom</Label>
              <Input />
            </Item>
            <Item floatingLabel style={styles.formInput}>
              <Label>Adresse e-mail</Label>
              <Input />
            </Item>
            <Item floatingLabel style={styles.formInput}>
              <Label>Numéro de téléphone</Label>
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

export default connect(mapStateToProps, null)(ProfileUpdate);
