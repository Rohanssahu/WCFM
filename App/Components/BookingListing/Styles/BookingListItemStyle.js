import { StyleSheet } from 'react-native'
import { Metrics, Colors, Fonts } from '../../../Themes'
export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background
  },
  listItemContainer: {
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
  listItemContainerFirst: {
    shadowColor: 'rgba(0,0,0, .4)', // IOS
    shadowOffset: { height: 1, width: 1 }, // IOS
    shadowOpacity: 1, // IOS
    shadowRadius: 1, //IOS
    backgroundColor: '#fff',
    elevation: 2, // Android
    borderRadius: 15,
    marginTop: Metrics.largeMargin,
    marginHorizontal: Metrics.mediumMargin,
  },
  /*row: {
    flex: 1,
    backgroundColor: Colors.background,
    padding: Metrics.baseMargin,
    justifyContent: 'center',
    borderTopWidth: 2,
    borderTopColor: Colors.lightText
  },
  rowFirst: {
    backgroundColor: Colors.background,
    padding: Metrics.baseMargin,
    justifyContent: 'center'
  },*/
  listItemRow: {
    backgroundColor: Colors.background,
    paddingHorizontal: Metrics.miniMargin,
    paddingVertical: Metrics.miniMargin,
    borderRadius: 15,
    alignItems: 'center'
  },
  /*bookingNamePriceContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'flex-end'
  },*/
  bookingNameStatusContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    marginBottom: Metrics.superMicroMargin
  },
  bookingNoCustContainer: {
    flex: 2,
    flexDirection: 'row',
    justifyContent: 'flex-start',
    width: 500,
    marginBottom: Metrics.smallMargin
  },
  bookingName: {
    ...Fonts.style.h5,
    // backgroundColor: Colors.tertiaryColor,
    fontWeight: 'bold',
    color: Colors.boldText,
    textAlign: 'left',
    marginRight: Metrics.smallMargin
  },
  bookingCustomer: {
    fontSize: 14,
    color: Colors.lightText,
    // textAlign: 'left',
    alignSelf: 'flex-end'
  },
  bookingStatusItemsContainer: {
    flex: 3,
    flexDirection: 'column',
    justifyContent: 'flex-end'
  },
  bookingProductContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    // marginTop: Metrics.smallMargin / 2,
    paddingBottom: Metrics.microMargin,
    marginBottom: Metrics.superMicroMargin,
    borderBottomWidth: 1,
    borderColor: Colors.borderLight
  },
  bookingProduct: {
    flex: 1,
    marginLeft: Metrics.superMicroMargin
  },
  bookingDateItemsContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
  },
  notificationDate: {
    // flex: 4,
  },
  notificationDateBold: {
    // flex: 1,
    fontWeight: 'bold',
  }
})
