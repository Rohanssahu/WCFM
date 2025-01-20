import React, { Component } from 'react'
// import PropTypes from 'prop-types';
import { View, Image } from 'react-native'
import styles from './Styles/LogoStyle'

export default class Logo extends Component {
  // // Prop type warnings
  // static propTypes = {
  //   someProperty: PropTypes.object,
  //   someSetting: PropTypes.bool.isRequired,
  // }
  //
  // // Defaults for props
  // static defaultProps = {
  //   someSetting: false
  // }

  render () {
    const logosize = this.props.size
    switch (logosize) {
      case 'extrasmall':
        return (
          <View style={styles.container}>
            <Image style={styles.logoStyleXs} source={require('../Images/wcfmmp.png')} />
          </View>
        )
      case 'small':
        return (
          <View style={styles.container}>
            <Image style={styles.logoStyleSm} source={require('../Images/wcfmmp.png')} />
          </View>
        )
      case 'medium':
        return (
          <View style={styles.container}>
            <Image style={styles.logoStyleMd} source={require('../Images/wcfmmp.png')} />
          </View>
        )
      case 'large':
        return (
          <View style={styles.container}>
            <Image style={styles.logoStyleLg} source={require('../Images/wcfmmp.png')} />
          </View>
        )
      default:
        return (
          <View style={styles.container}>
            <Image style={styles.logoStyleSm} source={require('../Images/wcfmmp.png')} />
          </View>
        )
    }
  }
}
