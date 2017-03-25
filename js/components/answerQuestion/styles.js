import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  container: {
    flex: 1,
  },
  valid:{
    marginBottom: 30,
  },
  preview: {
    flex: 1,
    top: 0,
    bottom: 0,
    right: 0,
    left: 0,
    alignItems: 'center',
  },
  buttons:{
    flex: 0,
    paddingBottom: 60,
  },
  capture: {
    backgroundColor: '#fff',
    borderRadius: 5,
    color: '#000',
    padding: 10,
    textAlign: 'center',
    fontSize: 18,
  },
  'question':{
    marginTop: 30,
    padding: 20,
    backgroundColor: '#fff',
    fontSize: 18,
  },
  'img' : {
    height: 200,
    width: 200,
  },
  fullScreen: {
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
  },
  textEnding:{
    fontSize: 20,
    paddingTop: 20,
    textAlign: 'center',
  },
  textEnding2:{
    fontSize: 30,
    paddingTop: 20,
    textAlign: 'center',
  }
});
