
import React, { Component } from 'react';
import { View, Image } from 'react-native';
import { connect } from 'react-redux';
import { actions } from 'react-native-navigation-redux-helpers';
import { Container, Content, Button, Item, Icon, Text, Input, Form, Card } from 'native-base';


import HeaderContent from './../headerContent';
import theme from '../../themes/base-theme';
import styles from './styles';

const { popRoute } = actions;

const bg = require('../../../images/bg.png');

class Jobs extends Component { // eslint-disable-line

  static propTypes = {
    navigation: React.PropTypes.shape({
      key: React.PropTypes.string,
    }),
  }

  constructor(props){
    super(props);
    this.state = {
      poste: '',
      postes:[]
    }
  }

  _handleKeyPress(){

      if(!this.state.postes.includes(this.state.poste))
      {
        var arrayvar = this.state.postes.slice()
        arrayvar.push(this.state.poste)
        this.setState({ postes: arrayvar })

      }
      this.setState({ poste: '' })
  }

  deleteItem(index){
    alert(index)

  }

  render() { // eslint-disable-line class-methods-use-this
    return (
      <Container>
        <Image source={bg} style={styles.background} >
            <Content style={styles.content}>
                <View style={styles.container}>
                <Text style={styles.title}>Mes postes</Text>

                <Form>
                  <Item rounded style={styles.inputGrp}>
                    <Icon name="search" />
                    <Input
                      onSubmitEditing={this._handleKeyPress.bind(this)}
                      onChangeText={poste => this.setState({ poste })}
                      placeholder="Saisissez un poste recherché"
                      placeholderTextColor="#fff"
                      style={styles.input}
                      value={this.state.poste}
                    />
                  </Item>
                </Form>


                

                {this.state.postes.map(function(name, index){
                    return (
                        <Item
                          key={index}
                          block center
                          style={styles.itemPoste}>
                        
                          <Text>{name}</Text>

                          <Button style={styles.itemPosteClose} onPress={() => { 
                              const list = this.state.postes.filter((poste, indexList) => {
                                return indexList !== index
                              })
                              this.setState({postes: list});
                          }}>
                              <Icon name="close" />
                          </Button>
                        </Item>

                      )
                  }.bind(this))}


                <Button
                    style={styles.buttonSuivant}
                    primary block rounded
                    onPress={() => this.replaceRoute('home')} >
                     <Text>suivant</Text>
                </Button>


              </View>
            </Content>
          </Image>
      </Container>
    );
  }
}

const mapStateToProps = state => ({
  navigation: state.cardNavigation,
});

export default connect(mapStateToProps, null)(Jobs);
