import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { View, Text } from 'react-native'
import HTML from 'react-native-render-html'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
import moment from 'moment'
import { connect } from 'react-redux'
import { compose } from 'redux'
import styles from './Styles/EnquiryRepliesItemStyle'
import { Colors } from '../../Themes'

class EnquiryRepliesItem extends Component {
  // // Prop type warnings
  static propTypes = {
    replies: PropTypes.object,
    index: PropTypes.number
  }

  render () {
    // console.log(Metrics.screenWidth);
    const { replies } = this.props
    const date = moment(replies.posted).format('DD-MM-YY - hh:mmA')
    const itemStyle = (replies.reply_by !== replies.vendor_id) ? styles.itemIn : styles.itemOut
    return (
      <View style={[styles.row, itemStyle]}>
        { (replies.reply_by !== replies.vendor_id) &&
        <View style={styles.triangle} /> }
        <View style={styles.balloon}>
          <HTML html={replies.reply.replace(/[<]br[^>]*[>]/gi, ' ')}
            baseFontStyle={{ fontSize: 18, lineHeight: 18 }}
            tagsStyles={{
              p: { padding: 0, fontSize: 18, lineHeight: 18 }
            }} />
        </View>
        { (replies.reply_by === replies.vendor_id) &&
        <View style={styles.triangleRev} /> }
        <View style={styles.enquiryReplyAuthorTimeContainer}>
          { replies.reply_by_name && <View style={styles.enquiryReplyAuthor}>
            <Icon size={20} name={'account'} color={Colors.secondaryColor} />
            <Text style={styles.enquiryeReplyIconText}>
              {replies.reply_by_name}
            </Text>
          </View> }
          <View style={styles.enquiryReplyTime}>
            <Icon size={20} name={'clock-outline'} color={Colors.secondaryColor} />
            <Text style={styles.enquiryeReplyIconText}>
              {date}
            </Text>
          </View>
        </View>
      </View>
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
)(EnquiryRepliesItem)
