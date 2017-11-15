import React, { Component } from 'react'
import { bindActionCreators } from 'redux'
import { AsyncStorage } from 'react-native'
import { connect } from 'react-redux'
import * as loginActions from '../actions/loginActions'
import styles from '../styles/all'
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

class Home extends Component {
  constructor(props) {
    super(props)
    this.state = {
      showCamera: false,
      url: '',
      invalid: false,
      isAuthenticated: false,
      user: {}
    }

    this.handleButtonClick = this.handleButtonClick.bind(this)
    this.onSuccess = this.onSuccess.bind(this)
    this.logout = this.logout.bind(this)
  }
  componentWillMount() {
    AsyncStorage.getItem('token').then((token) => {
      let tokenString = token
      AsyncStorage.getItem('user').then((value) => {
        if(tokenString && value){
          this.props.isLogged(value)
          this.setState({isAuthenticated: true, user: JSON.parse(value)})
        }
      }).done()
    }).done()
  }

  handleButtonClick (){
    this.setState({showCamera: !this.state.showCamera, invalid: false})
  }

  onSuccess(e) {
    if(e.data.indexOf("gist.github.com") !== -1){
      this.setState({url: e.data, invalid: false, showCamera: false})
      const params = {
        gistId: e.data.split('/').slice(-1)[0]
      }

      this.props.navigation.navigate('gist', params)
    }else{
      this.setState({url: e.data, invalid: true, showCamera: false})
    }
  }

  logout(){
    AsyncStorage.multiRemove(['token', 'user'], (err) => {
      this.props.logout()
      this.setState({isAuthenticated: false, user: {}})
    })
  }

  render() {
    const { user, isAuthenticated } = this.state

    return (
      <View style={styles.container}>
        {
          (!this.state.showCamera && !this.state.invalid) &&
          <View>
            {
              isAuthenticated
              ? <Text style={styles.h3}>Welcome back {user.login}</Text>
              : <Text style={styles.h3}>Welcome Guest!</Text>
            }

            <Text style={styles.h4}>To start scan a gist QR code press the button</Text>
          </View>
        }
        {
          this.state.invalid &&
          <View style={styles.codeContent}>
            <Text style={styles.errorText}>Ops!</Text>
            <Text>
              {this.state.url} is not a Gist
            </Text>
            <Text>
              Example of a valid Gist url:
            </Text>
            <Text>
              https://gist.github.com/lorbicki/0409658c1d18a60281a5cb2309bf421b
            </Text>
          </View>
        }
        {
          this.state.showCamera &&
          <QRCodeScanner
            onRead={this.onSuccess.bind(this)}
            topContent={(
             <Text style={styles.centerText}>
               The QRCode must be a link to a Gist Repository
             </Text>
            )}
            style={{ flex: 1 }}
         />
        }
        <Button
          onPress={this.handleButtonClick}
          title={this.state.showCamera? "Close Camera" : "Scan QRCode"}
          color="#841584"
          accessibilityLabel="Press here to scan the gist QRCode"
        />
        { isAuthenticated &&
          <TouchableOpacity
            style={styles.buttonTouchable, styles.alignTop}
            onPress={this.logout}
            >
            <Text style={styles.buttonText}>Logout</Text>
          </TouchableOpacity>
        }
      </View>
    );
  }
}

const mapStateToProps = ({ userReducer }) => {
  return {
    isAthenticated: userReducer.isAthenticated,
    user: userReducer.user
  }
}

const mapDispatchToProps = dispatch => {
  return bindActionCreators(loginActions, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(Home)
