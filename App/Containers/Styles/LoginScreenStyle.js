import { StyleSheet } from 'react-native'
import { ApplicationStyles, Metrics, Colors } from '../../Themes/'
import Fonts from '../../Themes/Fonts'
import metrics from '../../Themes/Metrics'

export default StyleSheet.create({
  ...ApplicationStyles.screen,
  formViewContainer: {
    alignSelf: 'stretch',
    alignItems: 'center',
    justifyContent: 'center' ,
  },
  welcomeTextContainer: {
    alignItems: 'center',
    marginBottom: Metrics.largeMargin,
    marginTop: Metrics.miniMargin
  },
  centered: {
    alignItems: 'center'
  },
  LogoText: {
    color: Colors.textColorOne,
    fontSize: Fonts.size.regular
  }
})
