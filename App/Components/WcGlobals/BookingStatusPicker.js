import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { View, Text, StyleSheet } from 'react-native'
import I18n from '../../I18n'
import RNPickerSelect from 'react-native-picker-select'
import Icon from 'react-native-vector-icons/Entypo'
import { Colors } from '../../Themes'

export default class BookingStatusPicker extends Component {
  constructor(props) {
    super(props);
    this.state = {
      status: this.props.status
    }
  }

  // // Prop type warnings
  static propTypes = {
    status: PropTypes.string
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

  componentDidUpdate(prevProps) {
    // Typical usage (don't forget to compare props):
    if (this.props.status !== prevProps.status) {
      this.setState({
        status: this.props.status
      })
    }
  }

  getBookingStatus = () => {
    const status = this.props.status
    return this.statuses.filter(({ value }) => value !== status)
  }

  onValueChange = (value) => {
    // console.log(value)
    this.setState({
      status : value
    });
    this.props.onStatusChange(value)
  }
  
  render () {
    const statuses = this.getBookingStatus()
    const customStyle = this.props.customStyle
    return (
      <View >
        <RNPickerSelect
          style={ pickerSelectStyles }
          value={this.state && this.state.status}          
          onValueChange={this.onValueChange.bind(this)}
          items= {this.statuses}
          Icon={() => {
            return <Icon style={{ marginTop: 3, marginRight: 5}}name="chevron-small-down" size={24} color="gray" />;
          }}
        />
        
      </View>
    )
  }
}

const pickerSelectStyles = StyleSheet.create({
  inputIOS: {
    fontSize: 16,
    paddingVertical: 5,
    width: 170,
    paddingHorizontal: 10,
    borderWidth: 0.3,
    borderColor: Colors.border,
    borderRadius: 7,
    color: Colors.text,
    //paddingRight: 30, // to ensure the text is never behind the icon
  },
  inputAndroid: {
    fontSize: 16,
    paddingHorizontal: 10,
    paddingVertical: 8,
    borderWidth: 0.5,
    borderColor: Colors.border,
    borderRadius: 8,
    color: Colors.text,
    paddingRight: 30, // to ensure the text is never behind the icon
  },
});
