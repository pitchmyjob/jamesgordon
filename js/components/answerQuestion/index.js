import React, { Component } from 'react';
import { connect } from 'react-redux';
import { View } from 'react-native';
import { Container, Content, Text, Button } from 'native-base';
import Camera from 'react-native-camera';
import { RNS3 } from 'react-native-aws3';
import Video from 'react-native-video';

import HeaderContent from './../headerContent';
import FooterContent from './../footerContent';
import Loader from './../loader';
import styles from './styles';

let options = {
  bucket: 'spitch-react',
  region: 'eu-west-1',
  accessKey: 'AKIAIGOELPKKAVI456RQ',
  secretKey: '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',
  successActionStatus: 201,
  awsUrl: 's3-eu-west-1.amazonaws.com'
};

class AnswerQuestion extends Component { // eslint-disable-line

  static propTypes = {
    navigation: React.PropTypes.shape({
      key: React.PropTypes.string,
    }),
  }

  constructor(props) {
    super(props);

    this.camera = null;

    this.state = {
      camera: {
        aspect: Camera.constants.Aspect.fill,
        captureTarget: Camera.constants.CaptureTarget.cameraRoll,
        type: Camera.constants.Type.back,
        orientation: Camera.constants.Orientation.auto,
        flashMode: Camera.constants.FlashMode.auto,
      },
      isRecording: false,
      isUpload: false,
      imgs: null,
      step: 1,
      video: Video,
      rate: 1,
      volume: 1,
      muted: false,
      resizeMode: 'contain',
      duration: 0.0,
      currentTime: 0.0,
      paused: true,
    };
  }

  // componentDidMount() {
  //   this.props.listMatchingCandidacy();
  // }

  startRecordin() {
    if (this.camera) {
      this.setState({
        isRecording: true,
      });

      this.camera.capture({mode: Camera.constants.CaptureMode.video})
        .then((data) => {
          this.setState({ imgs: data.path })
        });
    }
  }

  stopRecording() {
    if (this.camera) {
      this.camera.stopCapture();

      this.setState({
        isRecording: false,
        step: 2,
      });
    }
  }

  goUploadAws() {
    let nm = Date.now();
    let files = {
      uri: this.state.imgs,
      name: nm.toString()+'.mp4',
      type: 'video/mp4',
    };

    RNS3.put(files, options).then(response => {
      this.setState({
        isUpload: true,
      });
    });

    this.setState({
      step: 3,
    });
  }

  renderCamera() {
    return (
      <Camera
        ref={(cam) => { this.camera = cam; }}
        type={Camera.constants.Type.front}
        style={styles.preview}
        mirrorImage={true}
        mirrorVideo={true}
        aspect={Camera.constants.Aspect.fill}
      >
          <Text style={styles.question}>
            Es tu un gros enculé ?
          </Text>
          {
            !this.state.isRecording &&
            <Text style={styles.capture} onPress={this.startRecordin.bind(this)}>[GO VIDEO]</Text>
            ||
            <Text style={styles.capture} onPress={this.stopRecording.bind(this)}>[STOP VIDEO]</Text>
          }
      </Camera>
    );
  }

  renderPlayer() {
    return (
      <View style={styles.container}>
        <Video
          style={styles.fullScreen}
          source={{uri: this.state.imgs}}   // Can be a URL or a local file.
          ref={(ref) => {
            this.player = ref
          }}                                      // Store reference
          rate={1.0}                              // 0 is paused, 1 is normal.
          volume={1.0}                            // 0 is muted, 1 is normal.
          muted={false}                           // Mutes the audio entirely.
          paused={false}                          // Pauses playback entirely.
          resizeMode='cover'                      // Fill the whole screen at aspect ratio.*
          repeat={true}                           // Repeat forever.
          playInBackground={false}                // Audio continues to play when app entering background.
          playWhenInactive={false}                // [iOS] Video continues to play when control or notification center are shown.
          progressUpdateInterval={250.0}
        />
        <View style={{
          flex: 1,
          flexDirection: 'column',
          justifyContent: 'space-between',
            alignItems: 'center'
        }}>
          <Text style={styles.question}>
            c'est bon sodomite ?
          </Text>
          <View style={styles.buttons} >
            <Text style={styles.capture} onPress={this.goUploadAws.bind(this)}>VALIDER</Text>
          </View>
        </View>
      </View>
    );
  }

  renderFinish(){
    return (
      <View style={styles.container}>
        <Text style={styles.textEnding}>MERCI FDP!</Text>
        <Button
          style={styles.textEnding}
          title='Retour'
          onPress={this.goBackBtn.bind(this)}
        />
        <Text style={styles.textEnding}>La video est en cours d'upload...</Text>
        {
          this.state.isUpload &&
          <Text style={styles.textEnding2}>C'EST ENVOYE!!!</Text>
        }
      </View>
    );
  }

  render() { // eslint-disable-line class-methods-use-this
    return (
      <Container style={styles.container}>
        <HeaderContent subtitle={'Offres'} />
        <Content>
          {this.state.step === 1 && this.renderCamera()}
          {this.state.step === 2 && this.renderPlayer()}
          {this.state.step === 3 && this.renderFinish()}
        </Content>
        <FooterContent currentTab={'matching'} />
      </Container>
    );
  }
}

const mapStateToProps = state => ({
  navigation: state.cardNavigation,
});

function mapDispatchToProps(dispatch) {
  return {
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(AnswerQuestion);
