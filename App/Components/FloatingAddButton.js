import React, { Component } from 'react'
import { Button } from 'react-native-elements'
import Icon from 'react-native-vector-icons/FontAwesome'
import PropTypes from 'prop-types'
import styles from './Styles/FloatingAddButtonStyle'

export default class FloatingAddButton extends Component {
  static propTypes = {
    handlePress: PropTypes.func,
    customStyle: PropTypes.object
  }

  handlePress = () => {
    this.props.handlePress()
  }

  render () {
    const { customStyle } = this.props
    return (
      <Button
        buttonStyle={[styles.button, customStyle ]}
        onPress={this.handlePress}
        icon={
          <Icon
            name='plus'
            size={15}
            color='white'
          />
        }
      />
    )
  }
}
