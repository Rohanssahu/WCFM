import { StyleSheet } from 'react-native'
import { Fonts, Colors, Metrics } from '../../Themes/'

export default StyleSheet.create({
  button: {
    width: 300,
    borderRadius: 25,
    paddingVertical: Metrics.superMicroMargin,
    marginTop: Metrics.microMargin,
    backgroundColor: Colors.secondaryColor,
    justifyContent: 'center'
  },
  buttonTextDisabled: {
    color: Colors.text,
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: Fonts.size.medium,
    marginVertical: Metrics.superMicroMargin * 1.3
  },
  buttonText: {
    color: Colors.background,
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: Fonts.size.medium,
    marginVertical: Metrics.superMicroMargin * 1.3
  },
  activityIndicator: {
    color: Colors.ricePaper,
    padding: Metrics.smallMargin,
    height: 20
  }
})
