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

  listItemRow: {
    flex: 1,
    flexDirection: 'row',
    backgroundColor: Colors.background,
    paddingHorizontal: Metrics.miniMargin,
    paddingVertical: Metrics.miniMargin,
    borderRadius: 15,
    alignItems: 'center'
  },
  productImage: {
    width: 50,
    height: 50,
    borderRadius: 200,
    borderColor: Colors.borderLight,
    borderWidth: 1,
    marginRight: Metrics.microMargin
  },
  productNamePriceContainer: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'flex-start'
  },
  productName: {
    fontSize: Fonts.size.input,
    fontFamily: Fonts.type.bold,
    // backgroundColor: Colors.tertiaryColor,
    fontWeight: 'bold',
    color: Colors.boldText,
    textAlign: 'left'
  },

  productTypeStyle: {
    textTransform: 'capitalize'
  },

  productPriceContainer: {
    flex: 1,
    flexDirection: 'row',
    marginTop: Metrics.microMargin,
    alignItems: 'center',
    justifyContent: 'center'
  },
  productPrice: {
    justifyContent: 'flex-start',
    textAlign: 'left',
    marginLeft: Metrics.smallMargin
  },
  label: {
    textAlign: 'center',
    color: Colors.text
  }
})
