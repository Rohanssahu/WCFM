import { StyleSheet } from 'react-native'
import { ApplicationStyles, Metrics, Colors, Fonts } from '../../Themes/'

export default StyleSheet.create({
  ...ApplicationStyles.screen,
  formContainer: {
    padding: Metrics.doubleBaseMargin,
    paddingTop: 20
  },
  formField: {
    marginBottom: 25,
    justifyContent: 'center',
    //alignItems: 'center'
  },
  labelStyle: {fontSize: 16, color: Colors.text, marginLeft: 5,marginBottom: 5},
  inputBox: {
    borderRadius: 10
  },
  pickerBox: {
    borderRadius: 10,
    borderColor: Colors.boderPicker,
    borderWidth: 1,
    padding: 0
  },
  formSubmitButtonContainer: {},
  formSubmitButton: {
    //width: 300,
    paddingVertical: Metrics.superMicroMargin,
    backgroundColor: Colors.secondaryColor,
    justifyContent: 'center',
    alignSelf: 'center',
    marginTop: 10
  },
  formSubmitButtonText: {
    color: Colors.background,
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: Fonts.size.medium,
    marginVertical: Metrics.superMicroMargin * 1.3
  }
})
