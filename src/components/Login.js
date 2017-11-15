import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { Actions } from 'react-native-router-flux'
import { StyleSheet, Text, View, ScrollView, TextInput, Button } from 'react-native'
import * as loginActions from '../actions/loginActions'
import base64 from 'base-64'
import { NavigationActions } from 'react-navigation'
import styles from '../styles/all'

class Login extends Component {

  constructor(props) {
    super(props)
    this.state = {
      username: '',
      password: ''
    }
    this.handleInputChange = this.handleInputChange.bind(this)
    this.doLogin = this.doLogin.bind(this)
  }

  handleInputChange (field, value){
    this.setState({[field]: value})
  }

  doLogin(){
    const token = base64.encode(`${this.state.username}:${this.state.password}`)
    this.props.login(token, this.props.navigation)
  }

  render() {
    const { loading, error } = this.props

    return (
      <View>
        {
          loading
          ? <Text> Loading...</Text>
          : <ScrollView contentContainerStyle={styles.contentContainer}>

            <View>
              <Text>Login: </Text>
            </View>
            <View>
              <Text>Username:</Text>
              <TextInput
                onChangeText={(value)=>this.handleInputChange('username', value)}
              />
            </View>
            <View>
              <Text>Password</Text>
              <TextInput
                onChangeText={(value)=>this.handleInputChange('password', value)}
                secureTextEntry
              />
            </View>
            <Button
              transparent
              onPress={this.doLogin}
              title='Login'
              disabled={ this.state.username.length === 0 || this.state.password.length === 0 }
            />
            <Text style={styles.errorText}>
              {error}
            </Text>
          </ScrollView>
        }
      </View>
    );
  }
}

const mapStateToProps = ({ userReducer, spinnerReducer }) => {
  return {
    isAthenticated: userReducer.isAthenticated,
    loading: spinnerReducer.visible,
    error: userReducer.error
  }
}

const mapDispatchToProps = dispatch => {
  return bindActionCreators(loginActions, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(Login)
