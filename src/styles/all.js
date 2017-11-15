import { StyleSheet } from 'react-native'

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },

  contentContainer: {
    backgroundColor: '#fff',
    paddingVertical: 20,
    paddingHorizontal: 10,
  },

  codeContent: {
    paddingVertical: 10,
    paddingHorizontal: 10,
    backgroundColor: '#e8e2e2',
  },
  contentRow: {
    width: 100,
    flex: 1,
    flexDirection: 'row'
  },

  alignTop: {
    position: 'absolute',
    right: 4,
    top: 4,
  },

  h1: {
    fontSize: 25
  },

  h2: {
    fontSize: 20
  },

  h3: {
    fontSize: 18,
  },

  h4: {
    fontSize: 15,
  },

  titleColor: {
    color: '#0366d6'
  },

  subTitle: {
    fontStyle: 'italic',
    fontSize: 12
  },

  errorText: {
    color: '#ff0000'
  },

  boxColor:{
    backgroundColor: '#f8f8ff'
  },

  centerText: {
    flex: 1,
    fontSize: 18,
    padding: 32,
    color: '#777',
  },

  textBold: {
    fontWeight: '500',
    color: '#000',
  },

  paddingLeft:{
    paddingLeft: 5
  },

  paddingTopBottom:{
    paddingTop: 10,
    paddingBottom: 10
  },

  buttonText: {
    fontSize: 21,
    color: 'rgb(0,122,255)',
  },

  buttonTouchable: {
    padding: 16,
  }
});
