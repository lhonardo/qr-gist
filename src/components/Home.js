import React, { Component } from 'react'
// import { Actions } from 'react-native-router-flux';
import {
  StyleSheet,
  Text,
  View,
  Button,
  AppRegistry,
  Dimensions,
  TouchableHighlight,
  TouchableOpacity,
  NavigatorIOS,
  Linking
} from 'react-native'

import QRCodeScanner from 'react-native-qrcode-scanner'

// import { CardSection } from './common';

class Home extends Component {
  // onRowPress() {
  //   Actions.employeeEdit({ employee: this.props.employee });
  // }
  constructor(props) {
    super(props)
    this.state = {
      showCamera: false,
      url: ''
    }

    this.handleButtonClick = this.handleButtonClick.bind(this)
    this.onSuccess = this.onSuccess.bind(this)
  }

  handleButtonClick (){
    this.setState({showCamera: !this.state.showCamera})
    console.log(this.props)
  }

  onSuccess(e) {
    this.setState({url: e.data, showCamera: false})

    const params = {
      gistUrl: e.data
    }

    this.props.navigation.navigate('gist', params)
    // Linking.openURL(e.data).catch(err => console.error('An error occured', err));
  }

  render() {
    // const { name } = this.props.employee;

    return (
      <View style={styles.container}>
        <Text>Welcome!</Text>
        <Text>To scan a gist QR code press the button</Text>
        <Text>{this.state.url}</Text>
        <Button
          onPress={this.handleButtonClick}
          title="Scan QRCode"
          color="#841584"
          accessibilityLabel="Press here to scan the gist QRCode"
        />

        {
          this.state.showCamera &&
          <QRCodeScanner
            onRead={this.onSuccess.bind(this)}
            topContent={(
             <Text style={styles.centerText}>
               Go to <Text style={styles.textBold}>wikipedia.org/wiki/QR_code</Text> on your computer and scan the QR code.
             </Text>
            )}
            bottomContent={(
             <TouchableOpacity style={styles.buttonTouchable}>
               <Text style={styles.buttonText}>OK. Got it!</Text>
             </TouchableOpacity>
            )}
            style={{ flex: 1 }}
         />
        }
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
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

  buttonText: {
    fontSize: 21,
    color: 'rgb(0,122,255)',
  },

  buttonTouchable: {
    padding: 16,
  }
});

export default Home;
