const React = require('react-native');

const { StyleSheet, Dimensions, Platform } = React;

const deviceHeight = Dimensions.get('window').height;
const deviceWidth = Dimensions.get('window').width;

export default {
  iosShadow: {
    flex: 1,
    width: (deviceHeight < 500) ? 80 : (deviceWidth / 4) + 12,
    resizeMode: 'contain',
    // height: (deviceHeight < 500) ? 50 : (deviceHeight / 15),
    alignSelf: 'center',
    // marginTop: (deviceWidth < 330) ? (deviceHeight / 15) : (deviceHeight / 6),
  },
  aShadow: {
    flex: 1,
    resizeMode: 'contain',
    width: (deviceWidth / 3) + 8,
    // height: (deviceHeight / 20),
    padding: 20,
    alignSelf: 'center',
    // marginTop: (deviceWidth < 330) ? (deviceHeight / 15) : ((deviceHeight / 14) - 60),
  },
  inputGrp: {
    flexDirection: 'row',
    backgroundColor: 'rgba(255,255,255,0.3)',
    marginBottom: 20,
    borderWidth: 0,
    borderColor: 'transparent',
  },
  input: {
    paddingLeft: 10,
    color: '#fff'
  },
  background: {
    flex: 1,
    width: null,
    height: deviceHeight,
    backgroundColor: 'rgba(0,0,0,0.1)',
  },
  bg: {
    flex: 1,
    paddingLeft: 20,
    paddingRight: 20,
    paddingBottom: 70,
    // marginTop: (deviceHeight < 500) ? (Platform.OS === 'android' ? 20 : 0) : (Platform.OS === 'android' ? ((deviceHeight / 16) - 45) : ((deviceHeight / 16) - 10)),
  },
  linkedInBtn: {
    marginBottom: 30,
    height: 50,
    alignItems: 'center',
  },
  loginBtn: {
    marginTop: 10,
    height: 50,
    alignItems: 'center',
  },
  ioBtnText: {
    fontSize: 16,
    fontWeight: '900',
  },
  aBtnText: {
    fontSize: 16,
    textAlign: 'center',
    top: -5,
  },
  helpBtns: {
    opacity: 0.9,
    fontSize: 14,
    fontWeight: 'bold',
    color: '#fff',
    width: (deviceWidth / 2)
  },
  otherLinksContainer: {
    flexDirection: 'row',
  },
}
