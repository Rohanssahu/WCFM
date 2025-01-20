import { StyleSheet } from 'react-native'
import { Colors, Metrics, Fonts } from '../../Themes/'
import { moderateScale, scale } from '../../Transforms/DimensionsScalingFunctions'

export default StyleSheet.create({
  container: {
    elevation: 3,
    backgroundColor: Colors.background,
    //width: moderateScale( ( Metrics.screenWidth   / 2 ) - ( Metrics.mediumMargin * 3 )  ),
    width: moderateScale(135, 0.25),
    aspectRatio: 0.8,
    marginBottom: moderateScale(Metrics.mediumMargin , 0.3),
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
    marginHorizontal: Metrics.microMargin
  },
  iconContainer: {
    justifyContent: 'center',
    alignItems: 'center'
  },
  image: {
    width: Metrics.icons.xl,
    height: Metrics.icons.xl,
    margin: Metrics.baseMargin
  },
  label: {
    fontSize: Fonts.size.input,
    color: Colors.textColorOne,
    marginTop: Metrics.microMargin,
    //marginBottom: Metrics.baseMargin
  }
})
