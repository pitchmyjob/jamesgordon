import React, { Component } from 'react';
import { connect } from 'react-redux';
import { View } from 'react-native';
import { Container, Content, Text, Form, Item, Input, Label, Button, Icon } from 'native-base';

import HeaderContent from './../headerContent';
import FooterContent from './../footerContent';
import styles from './styles';

class SkillForm extends Component { // eslint-disable-line

  static propTypes = {
    navigation: React.PropTypes.shape({
      key: React.PropTypes.string,
    }),
  }

  constructor(props) {
    super(props);

    this.state = {
      skills: ['Python', 'Django'],
      skill: '',
    };

    this.addSkill = this.addSkill.bind(this);
    this.removeSkill = this.removeSkill.bind(this);
  }

  addSkill(event) {
    if (!this.state.skills.includes(this.state.skill)) {
      const newSkillList = this.state.skills.concat(this.state.skill);
      this.setState({skills: newSkillList});
    }

    this.setState({ skill: '' });
  }

  removeSkill(index) {
    const newSkillList = this.state.skills.filter((skill, indexList) => {
      return indexList !== index;
    });

    this.setState({skills: newSkillList});
  }

  render() { // eslint-disable-line class-methods-use-this
    return (
      <Container>
        <HeaderContent
          hasBackButton={true}
          subtitle={'Compétences'}
        />
        <Content style={styles.container}>
          <Form style={styles.formContainer}>
            <Item floatingLabel style={styles.formInput}>
              <Label>Saisissez une compétence</Label>
              <Input
                onSubmitEditing={this.addSkill}
                onChangeText={skill => this.setState({ skill })}
                value={this.state.skill}
              />
            </Item>
          </Form>
          {
            this.state.skills.map((skill, index) => {
              return (
                <Item
                  key={index}
                  style={styles.skillItem}
                >
                  <Text style={styles.textBlack}>{skill}</Text>
                  <Button dark transparent onPress={() => this.removeSkill(index)}>
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

export default connect(mapStateToProps, null)(SkillForm);
