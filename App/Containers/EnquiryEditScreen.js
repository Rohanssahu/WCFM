import React, { Component } from 'react'
import { ScrollView, View, Text, FlatList, ActivityIndicator } from 'react-native'
import { connect } from 'react-redux'
import { Colors, Fonts } from '../Themes'
import HTML from 'react-native-render-html'
import EnquiryEditActions, { EnquiryEditSelectors } from '../Redux/EnquiryEditRedux'
import AlertMessage from '../Components/AlertMessage'
import get from 'lodash/get'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
import moment from 'moment'
// import EnquiryForm from './EnquiryForm'
import FullScreenLoader from '../Components/FullScreenLoader'
import EnquiryRepliesItem from '../Components/EnquiryListing/EnquiryRepliesItem'
import EnquirySendReply from '../Components/EnquiryListing/EnquirySendReply'
// Add Actions - replace 'Your' with whatever your reducer is called :)
// import YourActions from '../Redux/YourRedux'
import I18n from '../I18n'
// Styles
import styles from './Styles/EnquiryEditScreenStyle'

class EnquiryEditScreen extends Component {
  static navigationOptions = ({ navigation }) => ({
    title: `${I18n.t('Enquiry Replies')}`,
    headerTitleStyle: { width: 280, fontWeight: 'normal', fontSize: Fonts.size.input, alignSelf: 'flex-start', marginHorizontal: 0 },
    headerTintColor: '#fff',
    headerStyle: { backgroundColor: Colors.secondaryColor }
  })

  componentDidMount () {
    this.props.getEnquiry(get(this.props, 'navigation.state.params.enquiry.ID', -1))
  }

  /* ***********************************************************
    * STEP 2
    * `renderRow` function. How each cell/row should be rendered
    * It's our best practice to place a single component here:
    *
    * e.g.
      return <MyCustomCell title={item.title} description={item.description} />
    *************************************************************/
  renderRow = ({ item, index }) => {
    return (
      <EnquiryRepliesItem replies={item} index={index} />
    )
  }

  renderHeader = () => {
    return null
  }

  // The default function if no Key is provided is index
  // an identifiable key is important if you plan on
  // item reordering.  Otherwise index is fine
  keyExtractor = (item) => item.ID + item.enquiry_id

  renderFooter = () => {
    if (!this.props.isLoading) return null

    return (
      <View
        style={{
          paddingVertical: 20,
          borderTopWidth: 1,
          borderColor: '#CED0CE'
        }}
      >
        <ActivityIndicator animating size='large' />
      </View>
    )
  }

  handlePressReply = () => {
    const { replyMsg } = this.props
    this.props.updateEnquiry(replyMsg)
  }

  render () {
    // console.log(Metrics.screenWidth);
    const { enquiry, isLoading, hasError, isUpdating, updateReplyMsg, replyMsg } = this.props
    // console.log(replyMsg);
    if (isLoading || isUpdating) {
      return (
        <FullScreenLoader />
      )
    }
    if (!enquiry) {
      return null
    }

    if (hasError) {
      return (
        <AlertMessage title={I18n.t('Failed to open enquiry for edit')} />
      )
    }
    const date = moment(enquiry.posted).format('DD-MM-YY - hh:mmA')
    // console.log(enquiry);
    return (
      <View style={styles.mainContainer} >
        <ScrollView style={styles.container} ref='scrollView'
          /* onContentSizeChange={(width,height) => this.refs.scrollView.scrollTo({y:height})} */ >
          <View style={styles.formContainer}>
            <View style={styles.enquiryMessageContainer}>
              <Text style={styles.enquiryMessageHeading}>{I18n.t('Enquiry Message')}:</Text>
              <View style={styles.enquiryMessageContent}>
                <View style={styles.enquiryMessageBody} >
                  <HTML html={enquiry.enquiry} baseFontStyle={{ fontSize: 18 }} />
                </View>
                <View style={styles.enquiryMessageAuthorContainer}>
                  <Icon size={20} name={'account'} color={Colors.secondaryColor} />
                  <Text style={styles.enquiryMessageIconText}>
                    {enquiry.customer_name}
                  </Text>
                </View>
                <View style={styles.enquiryMessageDateProductContainer}>
                  <View style={styles.enquiryMessageDate}>
                    <Icon size={20} name={'clock-outline'} color={Colors.secondaryColor} />
                    <Text style={styles.enquiryMessageIconText}>
                      {date}
                    </Text>
                  </View>
                  {
                    enquiry.product_title &&
                    <View style={styles.enquiryMessageProduct}>
                      <Icon size={20} name={'cube-outline'} color={Colors.secondaryColor} />
                      <Text style={styles.enquiryMessageIconText}>
                        {enquiry.product_title}
                      </Text>
                    </View>
                  }
                </View>
              </View>
            </View>

            <View style={styles.enquiryMessageContainer}>
              <Text style={styles.enquiryMessageHeading}>{I18n.t('Replies To This Enquiry')}:</Text>
              {
                (!enquiry.reply_count)
                  ? <View style={styles.enquiryMessageContent}>
                    <Text>{I18n.t('No Replies Posted Yet')}</Text>
                  </View>
                  : <FlatList
                    data={enquiry.all_replies}
                    keyExtractor={this.keyExtractor}
                    renderItem={this.renderRow}
                    ListHeaderComponent={this.renderHeader}
                    ListFooterComponent={this.renderFooter}
                  />
              }

            </View>
          </View>
        </ScrollView>
        <EnquirySendReply
          replyMsg={replyMsg}
          replyMsgChange={updateReplyMsg}
          handlePressReply={this.handlePressReply}
        />

      </View>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    enquiry: EnquiryEditSelectors.getEnquiry(state),
    isLoading: EnquiryEditSelectors.isLoading(state),
    hasError: EnquiryEditSelectors.hasError(state),
    isUpdating: EnquiryEditSelectors.isUpdating(state),
    updateError: EnquiryEditSelectors.updateError(state),
    replyMsg: EnquiryEditSelectors.updateReplyMsg(state)
  }
}

const mapDispatchToProps = {
  getEnquiry: EnquiryEditActions.enquiryRequest,
  updateReplyMsg: EnquiryEditActions.updateReplyMsg,
  updateEnquiry: EnquiryEditActions.updateEnquiry
}
export default connect(mapStateToProps, mapDispatchToProps)(EnquiryEditScreen)
