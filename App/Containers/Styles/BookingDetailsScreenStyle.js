import { StyleSheet } from 'react-native'
import { ApplicationStyles, Colors, Metrics, Fonts } from '../../Themes'

export default StyleSheet.create({
  ...ApplicationStyles.screen,
  container: {
    flex: 1,
    paddingBottom: Metrics.microMargin,
    //marginBottom: Metrics.microMargin,
    //paddingBottom: Metrics.miniMargin,
    backgroundColor: Colors.mainBackgroundColor
  },
  orderSection: {
    shadowColor: 'rgba(0,0,0, .4)', // IOS
    shadowOffset: { height: 1, width: 1 }, // IOS
    shadowOpacity: 1, // IOS
    shadowRadius: 1, //IOS
    backgroundColor: '#fff',
    elevation: 2, // Android
    borderRadius: 15,
    marginTop: Metrics.mediumMargin,
    marginHorizontal: Metrics.mediumMargin,
  },
  orderSectionLast: {
    marginBottom: Metrics.mediumMargin
  },
  sectionRow: {
    backgroundColor: Colors.background,
    paddingHorizontal: Metrics.miniMargin,
    paddingVertical: Metrics.miniMargin,
    borderRadius: 15,
    // alignItems: 'center'
  },

  sectionMargin: {
    marginTop: Metrics.microMargin,
    marginBottom: Metrics.microMargin,
  },
  subSection: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
  },
  subSectionRow: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    marginVertical: 10
  },
  subSectionColumn: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
  },
  subSectionDivider: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    borderBottomWidth: 1,
    borderColor: Colors.borderLight,
    paddingTop: Metrics.superMicroMargin,
    paddingBottom: Metrics.superMicroMargin,
    marginTop: Metrics.superMicroMargin,
    marginBottom: Metrics.superMicroMargin,
  },
  subSectionMargin: {
    marginTop: Metrics.superMicroMargin,
    marginBottom: Metrics.superMicroMargin,
  },

  orderInfoContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    paddingBottom: Metrics.microMargin,
    marginBottom: Metrics.superMicroMargin,
    borderBottomWidth: 1,
    borderColor: Colors.borderLight
  },
  orderNoStatusContainer: {
    flex: 2,
    flexDirection: 'row',
    justifyContent: 'flex-start',
    width: 500,
    marginBottom: Metrics.superMicroMargin
  },
  orderName: {
    fontSize: Fonts.size.input,
    fontFamily: Fonts.type.bold,
    // backgroundColor: Colors.tertiaryColor,
    fontWeight: 'bold',
    color: Colors.boldText,
    //textAlign: 'left',
    marginRight: Metrics.superMicroMargin
  },
  orderDateContainer: {
    flex: 3,
    flexDirection: 'row',
    justifyContent: 'flex-end'
  },
  orderDate: {
    paddingLeft: Metrics.superMicroMargin,
  },
  orderStatusContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'flex-start',
    //alignItems: 'flex-start',
    marginTop: Metrics.superMicroMargin / 1.5
  },
  orderStatus: {
    flex: 2.5,
    flexDirection: 'row',
    justifyContent: 'flex-start',
    //alignSelf: 'center',
    //width: 500,    
    marginTop: Metrics.superMicroMargin
  },
  orderStatusTitle: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    fontSize: Fonts.size.input,
    fontFamily: Fonts.type.bold,
    fontWeight: 'bold',
    color: Colors.boldText,
    paddingTop: Metrics.superMicroMargin * 2,
    //marginRight: Metrics.superMicroMargin
  },
  orderStatusSelector: {
    flex: 4,
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
  },
  dropdownHolder: {
    borderColor: Colors.lightText,    
    borderRadius: 20,
    backgroundColor: Colors.lightText,
    paddingLeft: Metrics.superMicroMargin,
  },
  updateStatus: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'flex-end'
  },  
  updateButton: {
    //backgroundColor: Colors.colorWarning,
    alignSelf: 'center',
    width: 100,
    marginTop: Metrics.superMicroMargin,
  },
  orderBillingTitle: {
    flex: 1,
    //flexDirection: 'row',
    //justifyContent: 'flex-start',
    fontSize: Fonts.size.input,
    fontFamily: Fonts.type.bold,
    fontWeight: 'bold',
    color: Colors.secondaryColor,
  },
  orderShippingTitle: {
    flex: 1,
    //flexDirection: 'row',
    //justifyContent: 'flex-start',
    fontSize: Fonts.size.input,
    fontFamily: Fonts.type.bold,
    fontWeight: 'bold',
    color: Colors.secondaryColor,
  },

  bookingInfoContainer: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    paddingBottom: Metrics.microMargin,
    marginBottom: Metrics.superMicroMargin,
  },
  bookingDate: {
    flex: 3,
    width: 100,
  },
  bookingTime: {
    flex: 2,
    alignSelf: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: Colors.borderLight
  },
  bookingDateDivider: {
    flex: 1,
    alignSelf: 'center',
    marginLeft: Metrics.microMargin
  },  
  infoItem: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'flex-start',
    //marginBottom: Metrics.microMargin,
    alignItems: 'center',
    marginVertical: 7
  },  
  itemLeft: {
    flex: 3,
    justifyContent: 'flex-start'
  },
  itemRight: {
    flex: 5,
    justifyContent: 'flex-start'
  },
  itemInLine: {
    flexDirection: 'row'
  }
})
