import '../Config'
// import DebugConfig from '../Config/DebugConfig'
import React, { Component } from 'react'
// import { BackHandler, Alert } from 'react-native'
import { Provider } from 'react-redux'
import RootContainer from './RootContainer'
import createStore from '../Redux'
// import OneSignal from 'react-native-onesignal' // Import package from node modules
import { MenuProvider } from 'react-native-popup-menu'
import MenuContextStyle from './Styles/MenuContextStyle'

import SplashScreen from 'react-native-splash-screen'

// create our store
const store = createStore()

/**
 * Provides an entry point into our application.  Both index.ios.js and index.android.js
 * call this component first.
 *
 * We create our Redux store here, put it into a provider and then bring in our
 * RootContainer.
 *
 * We separate like this to play nice with React Native's hot reloading.
 */
class App extends Component {
  constructor (properties) {
    super(properties)
    // OneSignal.setAppId("XXXXXX");
    // OneSignal.setLogLevel(6, 0);
    // OneSignal.setRequiresUserPrivacyConsent(false);
    // OneSignal.promptForPushNotificationsWithUserResponse(response => {
        
    // });

    // OneSignal.addEventListener('received', this.onReceived)
    // OneSignal.addEventListener('opened', this.onOpened)
    // OneSignal.addEventListener('ids', this.onIds)   

  }

  componentDidMount () {
    SplashScreen.hide()
    // BackHandler.addEventListener('hardwareBackPress', this.backPressed);
  }
  
  // componentWillUnmount() {
  //    BackHandler.removeEventListener('hardwareBackPress', this.backPressed);
  // }
  //
  //
  // backPressed = () => {
  //   Alert.alert(
  //     'Exit App',
  //     'Do you want to exit?',
  //     [
  //       {text: 'No', onPress: () => console.log('Cancel Pressed'), style: 'cancel'},
  //       {text: 'Yes', onPress: () => BackHandler.exitApp()},
  //     ],
  //     { cancelable: false });
  //   // BackHandler.exitApp();
  //   // return true;
  // }

  handleButtonBoxPress = (screenName) => {
    this.props.navigation.navigate(screenName)
  }

  componentWillUnmount () {
    // OneSignal.removeEventListener('received', this.onReceived)
    // OneSignal.removeEventListener('opened', this.onOpened)
    // OneSignal.removeEventListener('ids', this.onIds)
  }

  onReceived (notification) {
    console.log('Notification received: ', notification)
  }

  onOpened (openResult) {
    console.log('Message: ', openResult.notification.payload.body)
    console.log('Data: ', openResult.notification.payload.additionalData)
    console.log('isActive: ', openResult.notification.isAppInFocus)
    console.log('openResult: ', openResult)
  }

  onIds (device) {
    console.log('Device info: ', device)
  }

  render () {
    return (
      <MenuProvider customStyles={{ backdrop: MenuContextStyle.backdrop }}>
        <Provider store={store}>
          <RootContainer />
        </Provider>
      </MenuProvider>
    )
  }
}


// allow reactotron overlay for fast design in dev mode
export default App
