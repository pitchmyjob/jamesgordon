import React, { Component } from 'react';
import { connect } from 'react-redux';
import { View } from 'react-native';
import { Container, Content, Text, Form, Item, Input, Label, Button, Icon } from 'native-base';

import HeaderContent from './../headerContent';
import FooterContent from './../footerContent';
import Loader from './../loader';
import styles from './styles';

import { destroySkill } from '../../actions/skills'

class SkillForm extends Component { // eslint-disable-line

  static propTypes = {
    navigation: React.PropTypes.shape({
      key: React.PropTypes.string,
    }),
  }

  constructor(props) {
    super(props);

    this.state = {
      skill: '',
    };

    this.addSkill = this.addSkill.bind(this);
    this.renderSkills = this.renderSkills.bind(this);
  }

  addSkill(event) {
    if (!this.state.skills.includes(this.state.skill)) {
      const newSkillList = this.state.skills.concat(this.state.skill);
      this.setState({skills: newSkillList});
    }

    this.setState({ skill: '' });
  }

  renderSkills() {
    const { fetching, fulfilled, error, skills } = this.props.skillList;
    const skillActive = this.props.skillActive.skill;

    if (error) {
      return (
        <Item style={styles.skillItem}>
          <Text style={{color: 'red'}}>Erreur...</Text>
        </Item>
      );
    }
    else if (fulfilled) {
      if (skills.length > 0) {
        return skills.map((skill) => {
          const destroying = (skillActive === skill);

          return (
            <Item
              key={skill.id}
              style={styles.skillItem}
            >
              <Text style={styles.textBlack}>{skill.name}</Text>
              {
                !destroying &&
                <Button dark transparent onPress={() => this.props.destroySkill(skill.id)}>
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
          <Item style={styles.skillItem}>
            <Text style={styles.newsLink}>Aucun intérêt</Text>
          </Item>
        );
      }
    }
    else {
      return (
        <Item style={styles.skillItem}>
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
          {this.renderSkills()}
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
  skillList: state.skills.skillList,
  skillActive: state.skills.skillActive,
});

const mapDispatchToProps = (dispatch) => {
  return {
    destroySkill: (id) => {
      return dispatch(destroySkill(id))
    },
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(SkillForm);
