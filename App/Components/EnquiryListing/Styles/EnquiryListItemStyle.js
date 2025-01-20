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
    marginTop: Metrics.miniMargin,
    marginBottom: Metrics.microMargin,
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
    marginBottom: Metrics.microMargin,
    marginHorizontal: Metrics.mediumMargin,
  },
  listItemRow: {
    backgroundColor: Colors.background,
    paddingHorizontal: Metrics.miniMargin,
    paddingVertical: Metrics.miniMargin,
    borderRadius: 15
  },
  listEnquiryMessageContainer: {
    paddingBottom: Metrics.microMargin,
    marginBottom: Metrics.superMicroMargin,
    borderBottomColor: Colors.borderLight,
    borderBottomWidth: 1
  },
  enquiryIconContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center'
  },
  enquiryIconText: {
    fontSize: Fonts.size.medium,
    marginLeft: Metrics.superMicroMargin / 1.5
  },
  enquiryCustomerDateContainer: {
    flexDirection: 'row',
    marginBottom: Metrics.superMicroMargin /2
  },
  label: {
    textAlign: 'center',
    color: Colors.text
  }
})
