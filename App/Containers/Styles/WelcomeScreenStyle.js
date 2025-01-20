import { StyleSheet } from 'react-native'
import { Colors, Fonts, ApplicationStyles, Metrics } from '../../Themes/'
import { moderateScale } from '../../Transforms/DimensionsScalingFunctions'

export default StyleSheet.create({
  ...ApplicationStyles.screen,
  headerButtonContainer: {
    // flexDirection: 'row',
    // flex: 1
  },
  buttonsContainer: {
    //backgroundColor: 'blue',
    // flexGrow: 1,
    // flexShrink: 1,
    //backgroundColor: Colors.transparent,
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    marginTop: Metrics.largeMargin,
  },
  secondButtonbox: {
    marginLeft: 0
  },
  centered: {
    alignItems: 'center'
  },
  sectionText: {
    textAlign: 'center',
    fontWeight: 'bold',
    fontFamily: Fonts.base,
    fontSize: Fonts.size.h5,
    lineHeight: 50,
    color: Colors.text,
    backgroundColor: Colors.headerBackground
  },
  head: { height: 40, backgroundColor: Colors.tertiaryColor },
  wrapper: { flexDirection: 'row' },
  title: { flex: 1, backgroundColor: Colors.tertiaryColor },
  row: { height: 28 },
  text: { textAlign: 'right', marginRight: Metrics.smallMargin },
  borderStyle: { borderColor: Colors.secondaryColor },
  
 
  stats: {
    flex: 1,
    backgroundColor: Colors.transparent,
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    alignItems: 'flex-start'
  },
  grossSales: {
    flexDirection: 'row',
    width: ( moderateScale(150, 0.25) * 3 ) + Metrics.microMargin * 4,
    maxWidth: '100%',
    marginBottom: Metrics.miniMargin,
    elevation: 3,
    borderColor: Colors.borderLight,
    borderRadius: 10
  },
  grossEarnings: {
    flexDirection: 'row',
    width: ( moderateScale(150, 0.25) * 3 ) + Metrics.microMargin * 4,
    maxWidth: '100%',
    //marginBottom: Metrics.mediumMargin,
    elevation: 4,
    borderRadius: 10,
    borderColor: Colors.borderLight
  },
  grossSalesIconBox: {
    width: 60,
    justifyContent: 'center',
    alignItems: 'center',
    borderTopLeftRadius: 10,
    borderBottomLeftRadius: 10,
    backgroundColor: Colors.grossSalesColor
  },
  grossEarningsIconBox: {
    width: 60,
    justifyContent: 'center',
    alignItems: 'center',
    borderTopLeftRadius: 10,
    borderBottomLeftRadius: 10,
    backgroundColor: Colors.grossEarningColor
  },
  amountBox: {
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingLeft: Metrics.miniMargin + 2,
    paddingRight: Metrics.miniMargin,
    paddingVertical: Metrics.miniMargin,
    flex: 1,
    flexDirection: 'row',
    backgroundColor: Colors.background,
    borderTopRightRadius: 10,
    borderBottomRightRadius: 10,
  },
  amountLabel: {
    fontSize: Fonts.size.medium
  },
  amountTotal: {
    fontSize: Fonts.size.input
  },
  amountTotalSales: {
    color: Colors.grossSalesColor,
  },
  amountTotalEarnings: {
    color: Colors.grossEarningColor,
  },
  triangle: {
    position: 'absolute',
    left: -6,
    top: 23,
    width: 0,
    height: 0,
    backgroundColor: 'transparent',
    borderStyle: 'solid',
    borderLeftWidth: 10,
    borderRightWidth: 10,
    borderBottomWidth: 10,
    borderLeftColor: 'transparent',
    borderRightColor: 'transparent',
    
    transform: [
      { rotate: '90deg' }
    ],
    margin: 0,
    marginLeft: 0,
    borderWidth: 0,
    borderColor: 'transparent'
  },
  grossSalesTriangle: {
    borderBottomColor: Colors.grossSalesColor,
  },
  grossEarningsTriangle: {
    borderBottomColor: Colors.grossEarningColor,
  },
  versionMismatchContainer: {
    paddingVertical: 30,
    paddingHorizontal: 20
  },
  versionMismatchText: {
    fontSize: 16,
    color: Colors.text
  }
})
