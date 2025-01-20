import { StyleSheet } from 'react-native'
import { Metrics, Colors, Fonts } from '../../../Themes'

export default StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center'
  },
  productPriceText: {
    fontSize: Fonts.size.medium,
    fontWeight: 'bold',
    fontFamily: Fonts.type.bold,
    color: Colors.textColorOne
  }
})
