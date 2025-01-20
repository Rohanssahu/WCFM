import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { TouchableOpacity } from 'react-native'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
import styles from './Styles/NotificationButtonStyles'

// Note that this file (App/Components/RoundedButton) needs to be
// imported in your app somewhere, otherwise your component won't be
// compiled and added to the examples dev screen.

export default class NotificationButton extends Component {
  static propTypes = {
    // onPress: PropTypes.func,
    text: PropTypes.string
  }

  render () {
    // const { onPress } = this.props
    // console.log(this.props);
    return (
      <TouchableOpacity style={styles.button} onPress={this.props.onPress} >
        <Icon size={35} name={'bell-outline'} color='#000000' />
      </TouchableOpacity>
    )
  }
}
