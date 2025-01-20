import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { TouchableOpacity } from 'react-native'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
import styles from './Styles/LogoutButtonStyles'
import { connect } from 'react-redux'
import LoginActions from '../Redux/LoginRedux'

// Note that this file (App/Components/RoundedButton) needs to be
// imported in your app somewhere, otherwise your component won't be
// compiled and added to the examples dev screen.

class LogoutButton extends Component {
  static propTypes = {
    text: PropTypes.string,
    logout: PropTypes.func
  }

  render () {
    const { logout } = this.props
    return (
      <TouchableOpacity style={styles.button} onPress={logout} >
        <Icon size={25} name={'logout'} color='#fff' />
      </TouchableOpacity>
    )
  }
}

const mapStateToProps = (state) => {
  return {
  }
}

const mapDispatchToProps = {
  logout: LoginActions.logout
}

export default connect(mapStateToProps, mapDispatchToProps)(LogoutButton)
