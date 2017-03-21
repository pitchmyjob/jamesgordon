
const React = require('react-native');


const { StyleSheet, Dimensions, Platform } = React;

const primary = require('../../themes/variable').brandPrimary;
const deviceHeight = Dimensions.get('window').height;
const deviceWidth = Dimensions.get('window').width;


// const deviceHeight = Dimensions.get('window').height;

export default {
  signupContainer: {
    paddingLeft: 20,
    paddingRight: 20,
    marginTop: (deviceWidth < 330) ? (Platform.OS === 'android' ? ((deviceHeight / 9) - 10) : ((deviceHeight / 9) - 10)) : (Platform.OS === 'android' ? ((deviceHeight / 14) - 10) : ((deviceHeight / 10) - 10)),
  },
  title:{
  	marginTop:20,
  	fontWeight: 'bold',
    fontSize: 18,
  	textAlign: 'center',
  },
  buttonSuivant: {
  	marginLeft:20,
  	marginRight:20,
  },
  content:{
  	marginTop:20,
  },
  container: {
    flex: 1,
    width: null,
    height: null,
  },
  background: {
    flex: 1,
    width: null,
    height: null,
    backgroundColor: primary,
  },input: {
    paddingLeft: 10,
    color: '#AAA',
  },
  itemPoste:{
  	backgroundColor: '#AAA',
  	textAlign: 'center',
  	flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom:10
  },
  itemPosteClose:{
  	backgroundColor: '#AAA',
  },
  inputGrp: {
    flexDirection: 'row',
    borderRadius: 25,
    backgroundColor: 'rgba(255,255,255,0.2)',
    marginBottom: 20,
    borderWidth: 0,
    marginTop:30,
    borderColor: 'transparent',
  },
};
