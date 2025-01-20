import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { compose } from 'redux'
import { View, Text, TouchableOpacity, Alert } from 'react-native'
import { Colors } from '../../Themes'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
import HTML from 'react-native-render-html'
import FullScreenLoader from '../FullScreenLoader'
import { CapabilitiesSelectors } from '../../Redux/CapabilitiesRedux'
import I18n from '../../I18n'
import moment from 'moment'

import styles from './Styles/ReviewListItemStyle'
import { Image } from 'react-native-elements'

class ReviewListItem extends Component {
  // // Prop type warnings
  static propTypes = {
    review: PropTypes.object,
    index: PropTypes.number,
    capabilities: PropTypes.object
  }

  handlePressStatusChange = () => {
    // const { review } = this.props
    // console.log(this.props)
    const { review: { ID: reviewID, approved: reviewApproveStatus, author_name: authorName }, onUpdate } = this.props
    // console.log(reviewApproveStatus)
    if (reviewApproveStatus && reviewApproveStatus == 1) {
      Alert.alert(
        I18n.t('Confirm Un-Approve'),
        I18n.t('Are you sure you want to un-approve the review by') + ': ' + authorName + '?',
        [
          {
            text: I18n.t('Cancel'),
            onPress: () => { },
            style: 'cancel'
          },
          {
            text: I18n.t('OK'),
            onPress: () => {
              onUpdate(parseInt(reviewID), 'unapprove')
            }
          }
        ]
      )
    } else {
      Alert.alert(
        I18n.t('Confirm Approve'),
        I18n.t('Are you sure you want to approve the review by') + ': ' + authorName + '?',
        [
          {
            text: I18n.t('Cancel'),
            onPress: () => { },
            style: 'cancel'
          },
          {
            text: I18n.t('OK'),
            onPress: () => {
              onUpdate(parseInt(reviewID), 'approve')
            }
          }
        ]
      )
    }
  }

  render () {
    // console.log(this.props)
    if (this.props.updating) {
      return (<FullScreenLoader />)
    }

    // console.log(statuses);
    const { review } = this.props
    //console.log(review)
    const date = moment(review.created).format('DD-MM-YY - hh:mmA')
    let ratingType = 'five_star'
    if (review.review_rating > 4) {
      ratingType = styles.fiveStar
    } else if (review.review_rating > 3 && review.review_rating <= 4) {
      ratingType = styles.fourStar
    } else if (review.review_rating > 2 && review.review_rating <= 3) {
      ratingType = styles.threeStar
    } else if (review.review_rating > 1 && review.review_rating <= 2) {
      ratingType = styles.twoStar
    } else if (review.review_rating > 0 && review.review_rating <= 1) {
      ratingType = styles.oneStar
    }
    const reviewStatus = (review.approved == 1) ? I18n.t('Approved') : I18n.t('Pending')
    return (
      <View style={this.props.index ? styles.row : styles.rowFirst}>
        <View style={styles.reviewHeaderRow}>
          <View style={styles.reviewAuthorImageContainer}>
            <Image
              style={styles.reviewAuthorImage}
              source={{ uri: `${review.author_image}` }}
            />
            <View style={[styles.ratingContainer, ratingType]}>
              <Text style={styles.ratingNumber}>{review.review_rating}</Text>
              <Icon size={13} name={'star'} color={Colors.background} />
            </View>
            <View style={styles.reviewStatusContainer}>
              <Text style={styles.reviewStatusText} >{reviewStatus}</Text>
            </View>
          </View>
          <View style={styles.authorDateStatusContainer}>
            <View style={styles.authorContainer}>
              <Text style={styles.authorText}>{review.author_name}</Text>
            </View>
            <View style={styles.dateStatusContainer}>
              <Icon size={20} name={'clock-outline'} color={Colors.secondaryColor} />
              <Text style={styles.dateText}>{date}</Text>
              <View style={styles.MenuWrapper}>
                {(review.approved == 1) &&
                <TouchableOpacity style={[styles.MenuButton, styles.colorUnApprove]} onPress={this.handlePressStatusChange} >
                  <Icon size={20} name={'close-circle-outline'} color={Colors.background} />
                  <Text style={styles.menuButtonText}>{I18n.t('Un-Approve')}</Text>
                </TouchableOpacity>
                }
                {(review.approved != 1) &&
                <TouchableOpacity style={[styles.MenuButton, styles.colorApprove]} onPress={this.handlePressStatusChange}>
                  <Icon size={20} name={'check-circle-outline'} color={Colors.background} />
                  <Text style={styles.menuButtonText}>{I18n.t('Approve')}</Text>
                </TouchableOpacity>
                }
              </View>
            </View>
            <View style={styles.commentContainer}>
              <HTML html={review.review_description}
                baseFontStyle={{ fontSize: 14, lineHeight: 20, color: Colors.text }}
                tagsStyles={{
                  p: { padding: 0, fontSize: 14, lineHeight: 20, color: Colors.text }
                }} />
            </View>
          </View>
        </View>
      </View>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    capabilities: CapabilitiesSelectors.getData(state)
  }
}

export default compose(
  connect(mapStateToProps)
)(ReviewListItem)
