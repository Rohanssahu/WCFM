import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { View, Text } from 'react-native'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
import { Colors } from '../../Themes'
import StatusLabel from '../WcGlobals/StatusLabel'
import FullScreenLoader from '../FullScreenLoader'
import moment from 'moment'
import I18n from '../../I18n'
import styles from './Styles/BookingListItemStyle'
import { TouchableOpacity } from 'react-native-gesture-handler'

export default class BookingListItem extends Component {
  // // Prop type warnings
  static propTypes = {
    booking: PropTypes.object,
    index: PropTypes.number
  }

  getBookingStatus = () => {
    return this.statuses.filter(({ value }) => value !== this.props.booking.status)
  }

  onPress = () => {
    //if (this.props.capabilities.manage_booking) return
    if (this.props.onPress) {
      this.props.onPress(this.props.booking)
    }
  }

  render () {
    if (this.props.updating) {
      return (<FullScreenLoader />)
    }
    const { booking, index } = this.props
    const dateStart = (booking.start !== null) ? moment(booking.start).format('DD-MM-YY - hh:mmA') : ''
    const dateEnd = (booking.end !== null)
      ? (dateStart !== '') ? moment(booking.end).format('DD-MM-YY - hh:mmA') : moment(booking.end).format('DD-MM-YY')
      : ''
    return (
      <TouchableOpacity style={index ? styles.listItemContainer : styles.listItemContainerFirst} onPress={this.onPress}>
        <View style={styles.listItemRow}>
          <View style={styles.bookingNameStatusContainer}>
            <View style={styles.bookingNoCustContainer}>
              <Text style={styles.bookingName}>{'#' + booking.id}</Text>              
            </View>
            <View style={styles.bookingStatusItemsContainer}>
              <StatusLabel status={booking.status} />
              <Text style={styles.bookingCustomer}>{' (' + I18n.t('By') + ' ' + booking.customer_name + ')' }</Text>
            </View>
          </View>

          <View style={styles.bookingProductContainer}>
            <Icon size={20} name={'cube-outline'} color={Colors.secondaryColor} /><Text style={styles.bookingProduct}>{ booking.product_title }</Text>
          </View>
          <View style={styles.bookingDateItemsContainer}>
            <Icon size={20} name={'clock-outline'} color={Colors.secondaryColor} />
            { dateStart !== '' && <Text style={styles.notificationDate}>{ ' ' + dateStart}</Text> }
            { dateStart !== '' && <Text style={styles.notificationDateBold}>{' ' + I18n.t('To') }</Text> }
            { dateEnd !== '' && <Text style={styles.notificationDate}>{' ' + dateEnd}</Text> }
          </View>
        </View>
      </TouchableOpacity>
    )
  }
}
