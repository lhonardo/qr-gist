import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { Actions } from 'react-native-router-flux'
import { StyleSheet, Text, View } from 'react-native'
import * as gistActions from '../actions/gistActions'

// import { CardSection } from './common';

class Gist extends Component {
  // onRowPress() {
  //   Actions.employeeEdit({ employee: this.props.employee });
  // }

  componentWillMount() {
    this.props.fetchGist(this.props.gistUrl)
  }

  render() {
    // const { name } = this.props.employee;

    return (
      <View style={styles.container}>
        <Text>Here's gist</Text>
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
});

const mapDispatchToProps = dispatch => {
  return bindActionCreators(gistActions, dispatch)
}

export default connect(null, mapDispatchToProps)(Gist)
