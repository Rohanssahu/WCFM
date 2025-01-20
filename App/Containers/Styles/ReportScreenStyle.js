import { StyleSheet } from 'react-native'
import { Colors, Fonts, ApplicationStyles, Metrics } from '../../Themes/'

export default StyleSheet.create({
  ...ApplicationStyles.screen,
  container: {
  //  marginBottom: 36
  },
  reportMainContainer: {
    paddingTop: Metrics.doubleBaseMargin
  },
  reportIndividualContainer: {
    marginBottom: Metrics.doubleBaseMargin
  },
  reportIndividualContainerHeading: {
    // elevation: 3,
    paddingHorizontal: Metrics.doubleBaseMargin,
    justifyContent: 'center'
    // alignItems: 'center'
  },
  reportHeading: {
    fontSize: Fonts.size.h5,
    fontWeight: 'bold',
    textDecorationLine: 'underline'
  },
  reportIndividualContainerData: {
    paddingTop: Metrics.baseMargin,
    paddingHorizontal: Metrics.baseMargin,
    flexWrap: 'wrap',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center'
  },
  reportIndividualStatBox: {
    width: 180,
    aspectRatio: 2.5,
    // backgroundColor: Colors.tertiaryColor,
    borderLeftWidth: 1,
    borderRightWidth: 5,
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderTopColor: Colors.lightText,
    borderBottomColor: Colors.lightText,
    borderLeftColor: Colors.lightText,
    margin: Metrics.smallMargin,
    padding: Metrics.baseMargin,
    alignItems: 'center'
  },
  amountTotal: {
    // color: Colors.primaryColor,
    fontSize: Fonts.size.h5,
    fontFamily: Fonts.type.bold,
    fontWeight: 'bold',
    flex: 1
    // flexWrap: 'wrap'
  },
  reportIndividualSalesBox: {
    borderRightColor: Colors.brickred
  },
  reportIndividualEarningBox: {
    borderRightColor: Colors.secondaryColor
  }
})
