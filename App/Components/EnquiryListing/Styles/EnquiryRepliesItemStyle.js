import { StyleSheet } from 'react-native'
import { Metrics, Colors } from '../../../Themes'

export default StyleSheet.create({
  itemIn: {
    alignSelf: 'flex-start',
    marginLeft: 14,
    backgroundColor: Colors.tertiaryColor
  },
  itemOut: {
    alignSelf: 'flex-end',
    marginRight: 14,
    backgroundColor: Colors.adminEnquiryReplyBackground
  },
  row: {
    marginVertical: Metrics.smallMargin,
    width: '85%',
    flexDirection: 'column',
    borderRadius: 5,
    // borderWidth: 1,
    // borderColor: Colors.lightText,
    // paddingHorizontal: Metrics.baseMargin * 1.5,
    padding: Metrics.baseMargin * 1.5
  },
  triangle: {
    position: 'absolute',
    left: -15,
    top: 8,
    width: 0,
    height: 0,
    backgroundColor: 'transparent',
    borderStyle: 'solid',
    borderLeftWidth: 10,
    borderRightWidth: 10,
    borderBottomWidth: 10,
    borderLeftColor: 'transparent',
    borderRightColor: 'transparent',
    borderBottomColor: Colors.tertiaryColor,
    transform: [
      { rotate: '270deg' }
    ],
    margin: 0,
    marginLeft: 0,
    borderWidth: 0,
    borderColor: 'transparent'
  },
  triangleRev: {
    position: 'absolute',
    right: -14,
    top: 8,
    width: 0,
    height: 0,
    backgroundColor: 'transparent',
    borderStyle: 'solid',
    borderLeftWidth: 10,
    borderRightWidth: 10,
    borderBottomWidth: 10,
    borderLeftColor: 'transparent',
    borderRightColor: 'transparent',
    borderBottomColor: Colors.adminEnquiryReplyBackground,
    transform: [
      { rotate: '90deg' }
    ],
    margin: 0,
    marginLeft: 0,
    borderWidth: 0,
    borderColor: 'transparent'
  },
  enquiryReplyAuthorTimeContainer: {
    // alignSelf: "flex-start",
    flex: 1,
    flexDirection: 'column',
    marginTop: Metrics.smallMargin
  },
  enquiryReplyAuthor: {
    alignItems: 'center',
    flexDirection: 'row'
  },
  enquiryReplyTime: {
    alignItems: 'center',
    flexDirection: 'row'
  },
  enquiryeReplyIconText: {
    marginLeft: Metrics.smallMargin
  }

})
