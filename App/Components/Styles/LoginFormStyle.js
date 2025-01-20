import { StyleSheet } from 'react-native'
import { Colors, Metrics, Fonts } from '../../Themes/'

export default StyleSheet.create({
  container: {
    justifyContent: 'flex-start',
    alignItems: 'center',
    backgroundColor: Colors.background,
    paddingTop: Metrics.extraLargeMargin,
    paddingBottom: Metrics.extraLargeMargin,
    paddingHorizontal: Metrics.extraLargeMargin,
    elevation: 2,
    borderRadius: 10
  },
  buttonDisabled: {
    width: 300,
    borderRadius: 25,
    paddingVertical: Metrics.microMargin / 2,
    marginTop: Metrics.microMargin,
    backgroundColor: Colors.cloud,
    justifyContent: 'center'
  },
  containerStyle: {
    width: 300,
    paddingHorizontal: 0,
    marginBottom: Metrics.mediumMargin
  },
  inputContainerStyle: {
    minHeight: 0,
    borderColor: Colors.textColorTwo,
    borderBottomWidth: 0.5
  },
  
  inputStyle: {
    minHeight: 0,
    paddingVertical: Metrics.superMicroMargin / 2,
    paddingHorizontal: 0,
    fontSize: Fonts.size.medium
  },
  leftIconContainerStyle: {
    height: 0,
    marginLeft: 0,
    marginRight: Metrics.superMicroMargin * 1.8
  }
})
