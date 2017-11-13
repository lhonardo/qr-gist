import React, { Component } from 'react';
import { Actions } from 'react-native-router-flux';
import { StyleSheet, Text, View } from 'react-native';
// import { CardSection } from './common';

class Gist extends Component {
  // onRowPress() {
  //   Actions.employeeEdit({ employee: this.props.employee });
  // }

  render() {
    // const { name } = this.props.employee;

    return (
      <View style={styles.container}>
        <Text>Aqui é gist</Text>
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

export default Gist;
