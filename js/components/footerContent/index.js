import React, { Component } from 'react';
import { connect } from 'react-redux';
import { actions } from 'react-native-navigation-redux-helpers';
import { Footer, FooterTab, Button, Icon, Text } from 'native-base';

import styles from './styles';

const { replaceAtIndex } = actions;

class FooterContent extends Component {

  static propTypes = {
    replaceAtIndex: React.PropTypes.func,
    navigation: React.PropTypes.shape({
      key: React.PropTypes.string,
    }),
  }

  constructor(props) {
    super(props);

    this.state = {
      activeFooterTab: props.currentTab || 'matching'
    };

    this.handleFooterTabClick = this.handleFooterTabClick.bind(this);
    this.isActiveFooterTab = this.isActiveFooterTab.bind(this);
    this.replaceRoute = this.replaceRoute.bind(this);
  }

  replaceRoute(route) {
    const navigation = this.props.navigation;

    this.props.replaceAtIndex(navigation.index, { key: route }, navigation.key);
  }

  handleFooterTabClick(tabName) {
    this.setState({activeFooterTab: tabName});
    this.replaceRoute(tabName);
  }

  isActiveFooterTab(tabName) {
    return this.state.activeFooterTab === tabName;
  }

  render() {
    return (
      <Footer>
        <FooterTab>
          <Button active={this.isActiveFooterTab('profile')} onPress={() => this.handleFooterTabClick('profile')}>
            <Icon active={this.isActiveFooterTab('profile')} name="person" />
            <Text>Profil</Text>
          </Button>
          <Button active={this.isActiveFooterTab('matching')} onPress={() => this.handleFooterTabClick('matching')}>
            <Icon active={this.isActiveFooterTab('matching')} name="briefcase" />
            <Text>Matching</Text>
          </Button>
          <Button active={this.isActiveFooterTab('candidacies')} onPress={() => this.handleFooterTabClick('candidacies')}>
            <Icon active={this.isActiveFooterTab('candidacies')} name="apps" />
            <Text>Candidatures</Text>
          </Button>
        </FooterTab>
      </Footer>
    );
  }
}

const mapStateToProps = state => ({
  navigation: state.cardNavigation,
});

function mapDispatchToProps(dispatch) {
  return {
    replaceAtIndex: (index, route, key) => dispatch(replaceAtIndex(index, route, key)),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(FooterContent);
