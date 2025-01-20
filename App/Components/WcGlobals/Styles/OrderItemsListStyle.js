import { StyleSheet } from 'react-native'
import { Metrics } from '../../../Themes'

export default StyleSheet.create({
  container: {
    flex: 1,
    flexWrap: 'wrap',
    flexDirection: 'row',
    justifyContent: 'flex-start',
    paddingLeft: Metrics.superMicroMargin,
    alignItems: 'flex-start'
  }
})
