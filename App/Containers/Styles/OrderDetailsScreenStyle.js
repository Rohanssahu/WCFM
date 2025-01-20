import { StyleSheet } from 'react-native'
import { ApplicationStyles, Colors, Metrics, Fonts } from '../../Themes'

export default StyleSheet.create({
  ...ApplicationStyles.screen,
  container: {
    flex: 1,
    paddingBottom: Metrics.microMargin,
    // marginBottom: Metrics.microMargin,
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
  sectionRow: {
    backgroundColor: Colors.background,
    paddingHorizontal: Metrics.miniMargin,
    paddingVertical: Metrics.miniMargin,
    borderRadius: 15,
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
  subSectionRowWithDivider: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    paddingBottom: Metrics.microMargin,
    marginBottom: Metrics.superMicroMargin,
    borderBottomWidth: 1,
    borderColor: Colors.borderLight
  },
  subSectionColumnWithDivider: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    paddingBottom: Metrics.microMargin,
    marginBottom: Metrics.superMicroMargin,
    borderBottomWidth: 1,
    borderColor: Colors.borderLight
  },
  subSectionMargin: {
    marginTop: Metrics.superMicroMargin,
    marginBottom: Metrics.superMicroMargin,
  },
  sectionTitleContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    paddingBottom: Metrics.microMargin,
    marginBottom: Metrics.superMicroMargin,
    borderBottomWidth: 1,
    borderColor: Colors.borderLight
  },
  sectionTitle: {
    flex: 1,
    fontSize: Fonts.size.input,
    fontFamily: Fonts.type.bold,
    fontWeight: 'bold',
    color: Colors.secondaryColor,
  },
  subSectionTitle: {
    ...Fonts.style.h2,
    fontSize: 16,
    color: Colors.text
  },
  subSectionItemRow: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    marginVertical: 5
  },
  itemLeftAlign: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
  },
  itemRightAlign: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
  orderName: {
    fontSize: Fonts.size.input,
    fontFamily: Fonts.type.bold,
    fontWeight: 'bold',
    color: Colors.boldText,
    marginRight: Metrics.superMicroMargin
  },
  orderDate: {
    paddingLeft: Metrics.superMicroMargin,
  },
  orderStatus: {
    flex: 2.5,
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    marginTop: Metrics.superMicroMargin
  },
  verticalAlign: {
    flex: 1,
    paddingTop: Metrics.superMicroMargin * 2,
  },
  orderStatusSelector: {
    flex: 4,
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
  },
  updateStatus: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'flex-end'
  },
  updateButton: {
    //backgroundColor: Colors.colorWarning,
    alignSelf: 'center',
    width: 80,
    marginTop: Metrics.superMicroMargin,
  },  
  deliveryLocation: {
    flex: 1,
    marginLeft: Metrics.superMicroMargin,
    color: Colors.secondaryColor,
  },
  deliveryTime: {
    flex: 1,
    marginLeft: Metrics.superMicroMargin,
  },
  deliveryTitle: {
    marginLeft: Metrics.superMicroMargin,
  },
  paymentDate: {
    flex: 1,
    marginLeft: Metrics.superMicroMargin,
    // color: Colors.colorRed,
  },

  // order items
  itemImage: {
    flex: 1.5,
    flexDirection: 'row',
    justifyContent: 'flex-start',
  },
  itemDetails: {
    flex: 4,
    flexDirection: 'column',
    justifyContent: 'flex-start',
  },
  itemPrice: {
    flex: 3,
    flexDirection: 'column',
    justifyContent: 'flex-start',
  },
  productImage: {
    width: 40,
    height: 40,
    borderRadius: 50,
    borderColor: Colors.borderLight,
    borderWidth: 1,
    marginRight: Metrics.microMargin
  },
  labelText: {
    fontSize: 12,
    color: Colors.text,
  },
  valueText: {
    fontSize: 12,
  },
  valueHighlightedText: {
    fontSize: 12,
    color: Colors.secondaryColor,
  },

  // Shipping Line Info
  /*shippingInfoContainer: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    paddingBottom: Metrics.microMargin,
    marginBottom: Metrics.superMicroMargin,
    borderBottomWidth: 1,
    borderColor: Colors.borderLight
  },
  shippingCostInfo: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'flex-start',  
    marginBottom: Metrics.superMicroMargin,  
  },
  shippingTitle: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'flex-start',
  },
  shippingCost: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
  shippingDetails: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'flex-start',
  },
  shippingItemDetails: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'flex-start',
  },*/
  subSectionItemTitle: {
    flex: 2,
    ...Fonts.style.h2,
    fontSize: 14,
    color: Colors.text
  },
  shippingItemValue: {
    flex: 3,
    fontSize: 14,
  },

  /* Order Notes */
  noteTextareaContainer: {
    flex: 1, 
    flexDirection: 'row', 
    justifyContent: 'flex-start',
  },
  textareaContainer: {
    height: 80,
    borderColor: 'gray', 
    borderWidth: 1, 
    borderRadius: 20,
  },
  textarea: {
    textAlignVertical: 'top',  // hack android
    height: 70,
    fontSize: 14,
    color: '#333',
  },
  noteAttachmentContainerBorder: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'flex-start',
    borderWidth: 1, 
    borderRadius: 20,
    padding: Metrics.superMicroMargin,
  },
  addMoreAttachment: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignSelf: 'flex-end',
  },
  addMore: {
    backgroundColor: Colors.secondaryColor,
    width: 40,
    height: 40,
    borderRadius: 50,
  },
  dropdownHolder: {
    borderColor: Colors.lightText,    
    borderRadius: 20,
    backgroundColor: Colors.lightText,
    paddingLeft: Metrics.superMicroMargin,
    marginBottom: 30
  },
  pickerDropdown: {
    height: 40,
    width: 200,
    marginBottom: 30
  },
  fullWidth: {
    flex: 1,
  },
})
