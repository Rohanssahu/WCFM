import { StyleSheet } from 'react-native'
import { Metrics, Colors, Fonts } from '../../../Themes'
export default StyleSheet.create({
  row: {
    // flex: 1,
    backgroundColor: Colors.background,
    padding: Metrics.baseMargin,
    justifyContent: 'center',
    borderTopWidth: 1,
    borderTopColor: Colors.lightText
  },
  rowFirst: {
    backgroundColor: Colors.background,
    padding: Metrics.baseMargin,
    justifyContent: 'center'
  },
  reviewHeaderRow: {
    flexDirection: 'row'
    // flex: 1
  },
  reviewAuthorImageContainer: {
    marginRight: Metrics.baseMargin * 1.5,
    alignItems: 'center'
  },
  reviewAuthorImage: {
    width: 45,
    height: 45,
    borderRadius: 180
  },
  ratingContainer: {
    borderWidth: 0.6,
    borderColor: Colors.lightText,
    borderRadius: 15,
    flexDirection: 'row',
    marginTop: Metrics.smallMargin,
    marginHorizontal: Metrics.smallMargin,
    paddingHorizontal: Metrics.smallMargin * 1.5,
    paddingVertical: Metrics.smallMargin / 4,
    alignItems: 'center'
  },
  fiveStar: {
    backgroundColor: Colors.ratingFive
  },
  fourStar: {
    backgroundColor: Colors.ratingFour
  },
  threeStar: {
    backgroundColor: Colors.ratingThree
  },
  twoStar: {
    backgroundColor: Colors.ratingTwo
  },
  oneStar: {
    backgroundColor: Colors.ratingOne
  },
  ratingNumber: {
    marginRight: Metrics.smallMargin / 1.5,
    color: Colors.background,
    fontWeight: 'bold',
    fontFamily: Fonts.type.bold
  },
  reviewStatusText: {
    fontSize: Fonts.size.small + 1
  },
  authorDateStatusContainer: {
    alignItems: 'flex-start',
    flex: 1
    // borderColor: Colors.lightText
  },
  authorText: {
    fontSize: Fonts.size.medium,
    fontWeight: 'bold',
    fontFamily: Fonts.type.bold
  },
  dateStatusContainer: {
    // borderBottomWidth: 0.8,
    // paddingBottom: Metrics.baseMargin / 1.5,
    // borderColor: Colors.lightText,
    paddingTop: Metrics.smallMargin,
    flexDirection: 'row',
    alignItems: 'center'
  },
  dateText: {
    // flex: 1,
    marginLeft: Metrics.smallMargin / 2
  },
  MenuWrapper: {
    justifyContent: 'flex-end',
    flex: 1
  },
  MenuButton: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
    alignSelf: 'flex-end',
    paddingVertical: Metrics.smallMargin / 1.3,
    paddingHorizontal: Metrics.doubleBaseMargin / 1.5,

    borderColor: Colors.text,
    elevation: 4,
    borderRadius: 10
  },
  colorApprove: {
    backgroundColor: Colors.colorBookingComplete
  },
  colorUnApprove: {
    backgroundColor: Colors.colorPending
  },
  menuButtonText: {
    fontFamily: Fonts.type.bold,
    fontWeight: 'bold',
    marginLeft: Metrics.smallMargin / 1.5,
    color: Colors.background
  },
  commentContainer: {
    flexWrap: 'wrap',
    paddingTop: Metrics.baseMargin / 2
    // borderWidth: 1

  },
  menuHeading: {
    paddingHorizontal: Metrics.baseMargin,
    paddingVertical: Metrics.smallMargin,
    fontSize: Fonts.size.medium,
    borderBottomWidth: 0.5,
    borderBottomColor: Colors.lightText,
    flex: 1,
    width: 230,
    marginBottom: Metrics.doubleBaseMargin / 1.5
  }
})
