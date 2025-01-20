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
    aspectRatio: 1,
    flex: 1,
    //flexBasis: '50%'
  },
  

  listItemRow: {
    // flex: 1,
    // flexDirection: 'row',
    backgroundColor: Colors.mainBackgroundColor,
    flex: 1, 
    justifyContent: "center",
    // paddingHorizontal: Metrics.miniMargin,
    // paddingVertical: Metrics.miniMargin,
    borderRadius: 15,
    alignItems: 'center',
    overflow: 'hidden'
  },
  mediaImage: {
    width: 50,
    height: 50,
    borderRadius: 200,
    borderColor: Colors.borderLight,
    borderWidth: 1,
    marginRight: Metrics.microMargin
  },
  mediaNamePriceContainer: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'flex-start'
  },
  mediaName: {
    fontSize: Fonts.size.input,
    fontFamily: Fonts.type.bold,
    // backgroundColor: Colors.tertiaryColor,
    fontWeight: 'bold',
    color: Colors.boldText,
    textAlign: 'left'
  },

  mediaTypeStyle: {
    textTransform: 'capitalize'
  },

  mediaPriceContainer: {
    flex: 1,
    flexDirection: 'row',
    marginTop: Metrics.microMargin,
    alignItems: 'center',
    justifyContent: 'center'
  },
  mediaPrice: {
    justifyContent: 'flex-start',
    textAlign: 'left',
    marginLeft: Metrics.smallMargin
  },
  label: {
    textAlign: 'center',
    color: Colors.text
  }
})
