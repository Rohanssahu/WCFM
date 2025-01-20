import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
import { Colors } from '../Themes/'

// Note that this file (App/Components/RoundedButton) needs to be
// imported in your app somewhere, otherwise your component won't be
// compiled and added to the examples dev screen.

export default class NotificationTypeIcons extends Component {
  static propTypes = {
    type: PropTypes.string
  }

  render () {
    // const { type } = this.props
    let iconName = 'cart-outline'
    switch (this.props.type) {
      case 'order':
        iconName = 'cart-outline'
        break

      case 'direct':
        iconName = 'comment'
        break

      case 'review':
        iconName = 'comment'
        break

      case 'product_review':
        iconName = 'cube-outline'
        break

      case 'status-update':
        iconName = 'square-edit-outline'
        break

      case 'withdraw-request':
        iconName = 'cash-usd'
        break

      case 'refund-request':
        iconName = 'cash-refund'
        break

      case 'new_product':
        iconName = 'cube-outline'
        break

      case 'booking':
        iconName = 'calendar-check'
        break

      case 'appointment':
        iconName = 'clock-outline'
        break

      case 'enquiry':
        iconName = 'comment-question-outline'
        break

      case 'support':
        iconName = 'lifebuoy'
        break

      case 'verification':
        iconName = 'check-decagram'
        break

      case 'registration':
      case 'membership':
        iconName = 'account'
        break

      case 'membership-cancel':
      case 'membership-expired':
        iconName = 'account-remove-outline'
        break

      case 'membership-reminder':
        iconName = 'clock-outline'
        break

      case 'vendor-disable':
      case 'vendor-enable':
        iconName = 'account'
        break

      case 'vendor_approval':
        iconName = 'account-check-outline'
        break

      case 'pay_for_product':
        iconName = 'cube-outline'
        break

      case 'new_taxonomy_term':
        iconName = 'tag-multiple'
        break

      case 'new_customer':
        iconName = 'account-box-outline'
        break

      case 'new_staff':
        iconName = 'account'
        break

      case 'new_follower':
        iconName = 'account'
        break

      case 'new_delivery_boy':
        iconName = 'account'
        break

      case 'shipment_tracking':
      case 'shipment_received':
      case 'delivery_boy_assign':
      case 'delivery_complete':
        iconName = 'truck-fast'
        break

      default:
        iconName = 'cart-outline'
        break
    }
    // console.log(this.props);
    return (
      <Icon size={28} name={iconName} color={Colors.text} />
    )
  }
}
