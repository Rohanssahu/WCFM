import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { View, Text, /*Picker,*/ StyleSheet, Platform } from 'react-native'
import I18n from '../../I18n'
import { Colors } from '../../Themes'
import Icon from 'react-native-vector-icons/Entypo'
import RNPickerSelect from 'react-native-picker-select'


export default class StatusPicker extends Component {
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
    { label: I18n.t('Pending Payment'), value: 'pending' },
    { label: I18n.t('Processing'), value: 'processing' },
    { label: I18n.t('On hold'), value: 'on-hold' },
    { label: I18n.t('Completed'), value: 'completed' },
    { label: I18n.t('Refunded'), value: 'refunded' },
    { label: I18n.t('Shipped'), value: 'shipped' }
  ]

  componentDidUpdate(prevProps) {
    // Typical usage (don't forget to compare props):
    if (this.props.status !== prevProps.status) {
      this.setState({
        status: this.props.status
      })
    }
  }

  getOrderStatus = () => {
    const status = this.props.status    
    return this.statuses.filter(({ value }) => value !== status)
  }

  onValueChange = (value) => {
    console.log(value)
    this.setState({
      status : value
    });
    this.props.onStatusChange(value)
  }
  
  render () {
    const statuses = this.getOrderStatus()
    const customStyle = this.props.customStyle
    return (
      <View >
        <RNPickerSelect
          style={ pickerSelectStyles }

          value={this.state && this.state.status}          
          onValueChange={this.onValueChange.bind(this)}
          useNativeAndroidPickerStyle={false}
          items= {this.statuses}
          Icon={() => {
            return <Icon style={{ marginTop: Platform.OS == 'ios' ? 3 : 10, marginRight: 5}} name="chevron-small-down" size={24} color="gray" />;
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
    paddingVertical: 8,
    width: 170,
    paddingHorizontal: 10,
    borderWidth: 0.5,
    borderColor: Colors.border,
    borderRadius: 8,
    color: Colors.text,
    // paddingRight: 10, // to ensure the text is never behind the icon
  },
});