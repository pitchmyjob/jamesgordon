const React = require('react-native');

const { Platform, Dimensions } = React;

const deviceWidth = Dimensions.get('window').width;
const primary = require('../../themes/variable').brandPrimary;

export default {
  container: {
    flex: 1,
    width: null,
    height: null,
  },
  profileInfoContainer: {
    backgroundColor: primary,
    paddingTop: 10,
  },
  profileUser: {
    alignSelf: 'center',
    fontSize: 22,
    fontWeight: 'bold',
    paddingBottom: 5,
  },
  profilePic: {
    width: 80,
    height: 80,
    borderRadius: 40,
  },
  profileInfo: {
    alignSelf: 'center',
    paddingTop: 5,
    paddingBottom: 10,
  },
  itemsContainer: {
    backgroundColor: '#fff',
  },
  itemContainer: {
    flexDirection: 'row',
    borderTopWidth: 1,
    borderTopColor: '#ddd',
  },
  newsIcon: {
    color: '#ddd',
    // width: 40,
    alignSelf: 'center',
    alignItems: 'center',
  },

  newsContent: {
    flex: 1,
    flexDirection: 'column',
    padding: 20,
  },
  newsHeader: {
    color: '#444',
    alignSelf: 'flex-start',
    fontWeight: 'bold',
  },
  newsLink: {
    color: '#666',
    fontSize: 12,
    alignSelf: 'flex-start',
    fontWeight: 'bold',
  },
};
