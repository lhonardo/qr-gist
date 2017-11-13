import React, { Component } from 'react';
// import { Actions } from 'react-native-router-flux';
import { StyleSheet, Text, View, Button } from 'react-native';

// import { CardSection } from './common';

class Home extends Component {
  // onRowPress() {
  //   Actions.employeeEdit({ employee: this.props.employee });
  // }
  handleClick (){
    console.log("Hello");
  }

  render() {
    // const { name } = this.props.employee;



    return (
      <View style={styles.container}>
        <Text>Welcome!</Text>
        <Text>To scan a gist QR code press the button</Text>
        <Button
          onPress={this.handleClick}
          title="Scan QRCode"
          color="#841584"
          accessibilityLabel="Press here to scan the gist QRCode"
        />
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

export default Home;
