import { StyleSheet } from 'react-native'
import { Colors, Metrics } from '../../Themes/'

export default StyleSheet.create({
  button: {
    width: 35,
    aspectRatio: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: Metrics.smallMargin
  },
  buttonText: {
    color: Colors.text,
    textAlign: 'center'
  }
})
