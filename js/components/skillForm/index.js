import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Field, reduxForm } from 'redux-form'
import { View } from 'react-native';
import { Container, Content, Text, Form, Item, Input, Label, Button, Icon } from 'native-base';

import HeaderContent from './../headerContent';
import FooterContent from './../footerContent';
import Loader from './../loader';
import styles from './styles';

import { destroySkill, createSkill } from '../../actions/skills'
import { renderInput } from '../../utils/forms/renderers'

class SkillForm extends Component { // eslint-disable-line

  static propTypes = {
    navigation: React.PropTypes.shape({
      key: React.PropTypes.string,
    }),
  }

  constructor(props) {
    super(props);

    this.renderSkills = this.renderSkills.bind(this);
  }

  renderSkills() {
    const { fetching, fulfilled, error, skills } = this.props.skillList;
    const destroyingSkills = this.props.skillDestroy.skills;

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
          const destroying = (destroyingSkills.indexOf(skill.id) !== -1);

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
            <Text style={styles.newsLink}>Aucune compétence</Text>
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
    const { handleSubmit } = this.props;

    return (
      <Container>
        <HeaderContent
          hasBackButton={true}
          subtitle={'Compétences'}
        />
        <Content style={styles.container}>
          <Form style={styles.formContainer}>
            <Item stackedLabel style={styles.formInput}>
              <Label>Saisissez une compétence</Label>
              <Field name="name" onSubmitEditing={handleSubmit} component={renderInput} />
            </Item>
          </Form>
          {this.renderSkills()}
        </Content>
        <FooterContent currentTab={'profile'} />
      </Container>
    );
  }
}

const mapStateToProps = state => ({
  navigation: state.cardNavigation,
  skillList: state.skills.skillList,
  skillDestroy: state.skills.skillDestroy,
});

const mapDispatchToProps = (dispatch) => {
  return {
    destroySkill: (id) => {
      return dispatch(destroySkill(id))
    },
  }
}

const config = {
  form: 'SkillForm',
  onSubmit: (values, dispatch, props) => {
    return dispatch(createSkill(values))
      .then((response) => {
        props.reset()
      })
  },
}

export default connect(mapStateToProps, mapDispatchToProps)(reduxForm(config)(SkillForm));
