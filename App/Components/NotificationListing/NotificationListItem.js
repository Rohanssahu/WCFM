import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { View, Text } from 'react-native'
import StatusLabel from '../WcGlobals/StatusLabel'
import { Colors } from '../../Themes'
import NotificationTypeIcons from '../NotificationTypeIcons'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
import moment from 'moment'
import styles from './Styles/NotificationListItemStyle'

export default class NotificationListItem extends Component {
  // // Prop type warnings
  static propTypes = {
    notification: PropTypes.object,
    index: PropTypes.number
  }

  //
  // // Defaults for props
  // static defaultProps = {
  //   someSetting: false
  // }
  render () {
    const { notification, index } = this.props
    const date = moment(notification.created).format('DD-MM-YY - hh:mmA')
    return (
      <View style={index ? styles.row : styles.rowFirst}>
        <View style={styles.notificationIconNameContainer}>
          <NotificationTypeIcons type={notification.message_type} />
          <Text style={styles.notificationName}>{notification.message}</Text>
        </View>
        <View style={styles.notificationDateStatusContainer}>
          <View style={styles.notificationDateContainer}>
            <Icon size={20} name={'clock-outline'} color={Colors.secondaryColor} /><Text style={styles.notificationDate}>{date}</Text>
          </View>
          <View style={styles.notificationStatusContainer}>
            <StatusLabel status={notification.message_type} />
          </View>
        </View>
      </View>
    )
  }
}
