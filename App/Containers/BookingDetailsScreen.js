import React, { Component } from 'react'
import { ScrollView, View, Text } from 'react-native'
import { Colors, Fonts } from '../Themes/'
import FullScreenLoader from '../Components/FullScreenLoader'
import { connect } from 'react-redux'
import get from 'lodash/get'
import BookingDetailsActions, { BookingDetailsSelectors } from '../Redux/BookingDetailsRedux'
import RoundedButton from '../Components/RoundedButton'
import FontAwesome from 'react-native-vector-icons/FontAwesome'
import AntDesign from 'react-native-vector-icons/AntDesign'
import StatusLabel from '../Components/WcGlobals/StatusLabel'
import BookingStatusPicker from '../Components/WcGlobals/BookingStatusPicker'
import moment from 'moment'
import CurrencySymbols from '../Constants/CurrencySymbols'
import { Input, CheckBox } from 'native-base';
import DatePicker from 'react-native-datepicker'
import I18n from '../I18n'
// Styles
import styles from './Styles/BookingDetailsScreenStyle'

class BookingDetailsScreen extends Component {
  static navigationOptions = ({ navigation }) => ({
    title: `${I18n.t('Booking')} # ${navigation.state.params.bookingId}`,
    headerTitleStyle: { width: 280, fontWeight: 'normal', fontSize: Fonts.size.input, alignSelf: 'flex-start', marginHorizontal: 0 },
    headerTintColor: '#fff',
    headerStyle: { backgroundColor: Colors.secondaryColor }
  })

  constructor (props) {
    super(props)
    this.state = {
      id: null,
      start_date: new Date(),
      start_time: '00:00',
      end_date: new Date(),
      end_time: '23:59',
      all_day: false,
      status: null,
      _this: this
    }
  }

  statuses = [
    { label: I18n.t('Unpaid'), value: 'unpaid' },
    { label: I18n.t('Pending Confirmation'), value: 'pending-confirmation' },
    { label: I18n.t('Confirmed'), value: 'confirmed' },
    { label: I18n.t('Paid'), value: 'paid' },
    { label: I18n.t('Complete'), value: 'complete' },
    { label: I18n.t('In Cart'), value: 'in-cart' },
    { label: I18n.t('Cancelled'), value: 'cancelled' }
  ]

  componentDidMount () {
    this.props.getBooking(get(this.props, 'navigation.state.params.bookingId', -1))    
  }

  componentDidUpdate(prevProps) {
    // Typical usage (don't forget to compare props):
    if (this.props.booking && this.props.booking !== prevProps.booking) {
      this.setState({
        id: this.props.booking.id,
        start_date: moment(this.props.booking.start).format('YYYY-MM-DD'),
        start_time: moment(this.props.booking.start).format('HH:mm'),
        end_date: moment(this.props.booking.end).format('YYYY-MM-DD'),
        end_time: moment(this.props.booking.end).format('HH:mm'),
        all_day: this.props.booking.all_day,
        status: this.statuses.filter(({ value }) => value !== this.props.booking.status)[0].value
      })
    }
  }

  /*static getDerivedStateFromProps(props, state) {
    if(!props.booking) {
      return null
    }
    return {
      id: props.booking.id,
      start_date: moment(props.booking.start).format('YYYY-MM-DD'),
      start_time: moment(props.booking.start).format('HH:mm'),
      end_date: moment(props.booking.end).format('YYYY-MM-DD'),
      end_time: moment(props.booking.end).format('HH:mm'),
      all_day: props.booking.all_day,
      status: state._this.statuses.filter(({ value }) => value !== props.booking.status)[0].value
    }
  }*/

  handleStatusChange = (selectedStatus) => {
    this.setState({ status: selectedStatus })
  }

  updateStatus = () => {
    this.props.updateStatus(this.state.id, this.state.status)
    this.setState({ status: this.statuses.filter(({ value }) => value !== this.state.status)[0].value })
  }

  handleSubmit = () => {
    let submittedData = {};
    submittedData['id'] = this.state.id
    submittedData['start_date'] = this.state.start_date
    submittedData['start_time'] = this.state.start_time
    submittedData['end_date'] = this.state.end_date
    submittedData['end_time'] =  this.state.end_time
    submittedData['all_day'] =  this.state.all_day
    this.props.updateBooking(submittedData)
  }

  render () {  
    const { booking, isLoading, isUpdating, hasError } = this.props
    // console.log(booking)
    if (isLoading || isUpdating) {
      return (
        <FullScreenLoader />
      )
    }
    
    if (!booking) {
      return null
    }

    const bookingDetails = booking
    const order = bookingDetails.order
    const billingDetails = order.billing
    const date = moment(bookingDetails.date_created).format('DDMMM YYYY')
    const time = moment(bookingDetails.date_created).format('hh:mmA')
    
    return (
      <ScrollView style={styles.container}>  
        <View style={styles.orderSection}>
          <View style={styles.sectionRow}>
            <View style={styles.subSectionColumn}>
              <View style={styles.subSectionRow}>
                <View style={styles.orderNoStatusContainer}>
                  <Text style={styles.orderName}>{'#' + bookingDetails.id}</Text>                             
                </View>
                <View style={styles.orderDateContainer}>
                  <StatusLabel status={bookingDetails.status} />                
                </View>
              </View>
              <View style={styles.subSectionColumn}>
                <View style={styles.orderNoStatusContainer}>
                  <AntDesign size={16.5} name={'clockcircleo'} color={Colors.secondaryColor} /><Text style={styles.orderDate}>{ date + ' | ' + time }</Text>                             
                </View>
                <View style={styles.orderDateContainer}>
                  <FontAwesome size={17} name={'money'} color={Colors.secondaryColor} /><Text style={styles.orderDate}>{I18n.t('Cost')}: {CurrencySymbols[order.currency]}{ bookingDetails.cost }</Text>               
                </View>
              </View>
            </View>
            <View style={styles.subSectionDivider}></View>
            <View style={styles.orderStatusContainer}>
              <View style={styles.orderStatus}>
                <View style={styles.orderStatusTitle}>
                  <Text style={styles.titleText}>{I18n.t('Status')}</Text>
                </View>
                <View style={styles.orderStatusSelector}>
                  <BookingStatusPicker status={bookingDetails.status} customStyle={styles.dropdownHolder} onStatusChange={this.handleStatusChange} />
                </View>
              </View>
              <View style={styles.updateStatus}>
                <RoundedButton 
                  customStyle={styles.updateButton}
                  text={I18n.t('Update')} 
                  onPress={this.updateStatus}
                />
              </View>
            </View>            
          </View>
        </View>
        <View style={styles.orderSection}>
          <View style={styles.sectionRow}>
            <View style={styles.orderInfoContainer}>
              <Text style={styles.orderBillingTitle}>{I18n.t('Booking')}</Text>
            </View>
            <View style={styles.bookingInfoContainer}>
              <View style={styles.infoItem}>
                <View style={styles.itemLeft}><Text style={styles.titleText}>{I18n.t('Booked product')}:</Text></View>
                <View style={styles.itemRight}><Text>{bookingDetails.product_title}</Text></View>
              </View>
              <View style={styles.infoItem}>
                <View style={styles.itemLeft}><Text style={styles.titleText}>{I18n.t('Person(S)')}:</Text></View>
                <View style={styles.itemRight}><Text>{bookingDetails.person_counts.length}</Text></View>
              </View>
              <View style={styles.infoItem}>
                <View style={styles.itemLeft}><Text style={styles.titleText}>{I18n.t('Start date')}:</Text></View>
                <View style={[styles.itemRight, styles.itemInLine]}>
                  <DatePicker
                    style={styles.bookingDate}
                    date={this.state.start_date}
                    mode="date"
                    placeholder={I18n.t('select date')}
                    format="YYYY-MM-DD"
                    // minDate="2020-08-17"
                    // maxDate="2020-08-17"
                    confirmBtnText={I18n.t('Confirm')}
                    cancelBtnText={I18n.t('Cancel')}
                    showIcon={false}
                    onDateChange={(date) => {
                      moment(date).diff(this.state.end_date, 'days') > 0 ?
                      this.setState({start_date: date, end_date: date})
                      :
                      this.setState({start_date: date})
                    }}
                  />
                  <Text style={styles.bookingDateDivider}>@</Text>
                  <Input style={styles.bookingTime} placeholder='' value={this.state.start_time} onChangeText={(text) => {this.setState({start_time: text})}} />
                </View>
              </View>
              <View style={styles.infoItem}>
                <View style={styles.itemLeft}><Text style={styles.titleText}>{I18n.t('End date')}:</Text></View>
                <View style={[styles.itemRight, styles.itemInLine]}>
                  <DatePicker
                      style={styles.bookingDate}
                      date={this.state.end_date}
                      mode="date"
                      placeholder={I18n.t('select date')}
                      format="YYYY-MM-DD"
                      minDate={this.state.start_date}
                      // maxDate="2020-08-17"
                      confirmBtnText={I18n.t('Confirm')}
                      cancelBtnText={I18n.t('Cancel')}
                      showIcon={false}
                      onDateChange={(date) => {this.setState({end_date: date})}}
                    />
                  <Text style={styles.bookingDateDivider}>@</Text>
                  <Input style={styles.bookingTime} placeholder='' value={this.state.end_time} onChangeText={(text) => {this.setState({end_time: text})}} />
                </View>
              </View>
              <View style={styles.infoItem}>
                <View style={styles.itemLeft}><Text style={styles.titleText}>{I18n.t('All day booking')}:</Text></View>
                <View style={styles.itemRight}>
                  <CheckBox 
                    checked={ this.state.all_day } 
                    //color={ this.state.all_day ? "green" : "" } 
                    color={Colors.secondaryColor}
                    onPress={() => this.setState({ all_day: !this.state.all_day })} 
                    // onValueChange={() => this.setState({ all_day: !this.state.all_day })}
                  />                                    
                </View>
              </View>
              <View style={styles.infoItem}>
                <RoundedButton customStyle={styles.updateButton} text={I18n.t('Update')} onPress={this.handleSubmit} />
              </View>
            </View>   
          </View>
        </View>
        <View style={[styles.orderSection, styles.orderSectionLast]}>
          <View style={styles.sectionRow}>
            <View style={styles.orderInfoContainer}>
                <Text style={styles.orderBillingTitle}>{I18n.t('Customer')}</Text>
            </View>
            <View style={styles.bookingInfoContainer}>
              <View style={styles.infoItem}>
                <View style={styles.itemLeft}><Text style={styles.titleText}>{I18n.t('Name')}:</Text></View>
                <View style={styles.itemRight}><Text>{bookingDetails.customer_name}</Text></View>
              </View>
              <View style={styles.infoItem}>
                <View style={styles.itemLeft}><Text style={styles.titleText}>{I18n.t('User Email')}:</Text></View>
                <View style={styles.itemRight}><Text>{bookingDetails.customer_email}</Text></View>
              </View>
              <View style={styles.infoItem}>
                <View style={styles.itemLeft}><Text style={styles.titleText}>{I18n.t('Address')}:</Text></View>
                <View style={styles.itemRight}>
                  <Text>{billingDetails.first_name + ' ' + billingDetails.last_name}</Text>
                  <Text>{billingDetails.address_1}</Text>
                  <Text>{billingDetails.address_2}</Text>
                  <Text>{billingDetails.city + ' ' + billingDetails.postcode}</Text>
                  <Text>{billingDetails.state}</Text>
                </View>
              </View>
              <View style={styles.infoItem}>
                <View style={styles.itemLeft}><Text style={styles.titleText}>{I18n.t('Billing Email')}:</Text></View>
                <View style={styles.itemRight}><Text>{billingDetails.email}</Text></View>
              </View>
              <View style={styles.infoItem}>
                <View style={styles.itemLeft}><Text style={styles.titleText}>{I18n.t('Billing Phone')}:</Text></View>
                <View style={styles.itemRight}><Text>{billingDetails.phone}</Text></View>
              </View>
            </View>   
          </View>
        </View>
      </ScrollView>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    booking: BookingDetailsSelectors.booking(state),
    isLoading: BookingDetailsSelectors.isLoading(state),
    isUpdating: BookingDetailsSelectors.isUpdating(state),
    hasError: BookingDetailsSelectors.hasError(state)
  }
}

const mapDispatchToProps = {
  getBooking: BookingDetailsActions.bookingRequest,
  updateBooking: BookingDetailsActions.updateBooking,
  updateStatus: BookingDetailsActions.updateStatus,
}

export default connect(mapStateToProps, mapDispatchToProps)(BookingDetailsScreen)

