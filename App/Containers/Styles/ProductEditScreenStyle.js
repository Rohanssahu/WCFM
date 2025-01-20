import { StyleSheet } from 'react-native'
import { ApplicationStyles, Metrics } from '../../Themes/'

export default StyleSheet.create({
  ...ApplicationStyles.screen,
  formContainer: {
    padding: Metrics.doubleBaseMargin,
    paddingTop: 0
  },
  updateButton: {
    alignSelf: 'center'
  }
})
