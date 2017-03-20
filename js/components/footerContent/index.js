import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Footer, FooterTab, Button, Icon, Text } from 'native-base';

import styles from './styles';

class FooterContent extends Component {

  static propTypes = {
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
  }

  handleFooterTabClick(tabName) {
    this.setState({activeFooterTab: tabName});
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

export default connect(mapStateToProps, null)(FooterContent);
