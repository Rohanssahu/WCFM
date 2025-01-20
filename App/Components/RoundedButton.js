import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { TouchableOpacity, Text, ActivityIndicator, View } from 'react-native'
import styles from './Styles/RoundedButtonStyles'

// Note that this file (App/Components/RoundedButton) needs to be
// imported in your app somewhere, otherwise your component won't be
// compiled and added to the examples dev screen.

export default class RoundedButton extends Component {
  static propTypes = {
    onPress: PropTypes.func,
    text: PropTypes.string,
    children: PropTypes.string,
    navigator: PropTypes.object,
    isLoading: PropTypes.bool,
    isDisabled: PropTypes.bool
  }

  getText () {
    const buttonText = this.props.text || this.props.children || ''
    return buttonText.toUpperCase()
  }

  render () {
    const { onPress, isLoading, customStyle, customTextStyle, isDisabled, ...rest } = this.props
    const buttonTextStyle = (isDisabled) ? styles.buttonTextDisabled : styles.buttonText
    return (
      <TouchableOpacity style={[styles.button, customStyle]} onPress={onPress} {...rest}>
        {!isLoading && <Text style={[buttonTextStyle, customTextStyle]}>{this.getText()}</Text>}
        { isLoading && <View style={styles.ActivityIndicator}><ActivityIndicator size='large' color={styles.activityIndicator.color} /></View>}
      </TouchableOpacity>
    )
  }
}
