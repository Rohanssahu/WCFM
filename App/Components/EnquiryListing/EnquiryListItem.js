import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { View, Text, TouchableOpacity } from 'react-native'
import HTML from 'react-native-render-html'
import Octicons from 'react-native-vector-icons/Octicons'
import Feather from 'react-native-vector-icons/Feather'
import AntDesign from 'react-native-vector-icons/AntDesign'
import moment from 'moment'
import { connect } from 'react-redux'
import { compose } from 'redux'
import styles from './Styles/EnquiryListItemStyle'
import { Colors } from '../../Themes'

class EnquiryListItem extends Component {
  // // Prop type warnings
  static propTypes = {
    onPress: PropTypes.func,
    enquiry: PropTypes.object,
    index: PropTypes.number
  }

  onPress = () => {
    // console.log(this.props);
    // if (this.props.capabilities.edit_live_products) return
    if (this.props.onPress) {
      this.props.onPress(this.props.enquiry, this.props.index)
    }
  }

  render () {
    const { enquiry, index } = this.props
    const date = moment(enquiry.posted).format('DDMMM YYYY')
    const time = moment(enquiry.posted).format('hh:mmA')
    return (
      <TouchableOpacity style={this.props.index ? styles.listItemContainer : styles.listItemContainerFirst} onPress={this.onPress}>
        <View style={styles.listItemRow}>
          <View style={styles.listEnquiryMessageContainer}>
            <HTML html={enquiry.enquiry} baseFontStyle={{ fontSize: 18 }} />
          </View>
          <View style={styles.enquiryCustomerDateContainer}>
            <View style={styles.enquiryIconContainer}>
              <Feather size={17} name={'user'} color={Colors.secondaryColor} /><Text style={styles.enquiryIconText}>{ enquiry.customer_name }</Text>
            </View>
            <View style={styles.enquiryIconContainer}>
              <AntDesign size={16.5} name={'clockcircleo'} color={Colors.secondaryColor} /><Text style={styles.enquiryIconText}>{ date + ' | ' + time }</Text>
            </View>
          </View>
          { enquiry.product_title && (<View style={styles.enquiryIconContainer}>
            <Octicons size={17} name={'package'} color={Colors.secondaryColor} /><Text style={styles.enquiryIconText}>{enquiry.product_title}</Text>
          </View>) }
          
        </View>
      </TouchableOpacity>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    // capabilities: CapabilitiesSelectors.getData(state)
  }
}

export default compose(
  connect(mapStateToProps)
)(EnquiryListItem)
