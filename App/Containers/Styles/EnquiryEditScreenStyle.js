import { StyleSheet } from 'react-native'
import { ApplicationStyles, Metrics, Fonts, Colors } from '../../Themes/'

export default StyleSheet.create({
  ...ApplicationStyles.screen,
  formContainer: {
    padding: Metrics.doubleBaseMargin,
    paddingTop: 0
  },
  enquiryMessageHeading: {
    fontSize: Fonts.size.regular
  },
  enquiryMessageContent: {
    borderWidth: 1,
    borderRadius: 8,
    marginVertical: Metrics.smallMargin,
    borderColor: Colors.lightText,
    padding: Metrics.baseMargin
  },
  enquiryMessageBody: {
    marginBottom: Metrics.baseMargin
  },
  enquiryMessageText: {
    fontSize: Fonts.size.regular
  },
  enquiryMessageAuthorContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center'
  },
  enquiryMessageDateProductContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-start'
  },
  enquiryMessageIconText: {
    marginLeft: Metrics.smallMargin
  },
  enquiryMessageDate: {
    flexDirection: 'row',
    flex: 1,
    justifyContent: 'flex-start'
  },
  enquiryMessageProduct: {
    flexDirection: 'row',
    flex: 1,
    justifyContent: 'flex-end'
  },
  enquiryMessageProductText: {
    flexWrap: 'wrap'
  }

})
