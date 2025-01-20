import React, { Component } from 'react'
import { View, ActivityIndicator, StatusBar } from 'react-native'
// Add Actions - replace 'Your' with whatever your reducer is called :)
// import YourActions from '../Redux/YourRedux'

// Styles
import styles from './Styles/AuthLoadingScreenStyle'

class AuthLoadingScreen extends Component {
  render () {
    return (
      <View style={styles.container}>
        <StatusBar barStyle='default' />
        <ActivityIndicator size='large' />
      </View>
    )
  }
}

export default AuthLoadingScreen
