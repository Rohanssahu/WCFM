import { StyleSheet } from 'react-native'
import { Colors, Metrics, Fonts } from '../../Themes/'

export default StyleSheet.create({
  productField: {
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
  productFieldImage: {
    marginBottom: 25,
    marginTop: 10,
    height: 100,
    justifyContent: 'flex-start',
    alignItems: 'center',
    flexDirection: 'row'
  },
  productFieldCategory: {
    marginBottom: 25,
    marginTop: 10,
    height: 100,
    justifyContent: 'flex-start',
    alignItems: 'center',
    flexDirection: 'row'
  },
  categoryContainer: {
    width: 100
  },
  productSubmitButton: {
    //width: 300,
    paddingVertical: Metrics.superMicroMargin,
    backgroundColor: Colors.secondaryColor,
    justifyContent: 'center',
    alignSelf: 'center',
    marginTop: 10
  },
  productSubmitButtonText: {
    color: Colors.background,
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: Fonts.size.medium,
    marginVertical: Metrics.superMicroMargin * 1.3
  },
  featureImageContainer: {
    borderColor: Colors.borderLight, 
    borderWidth: 1
  },
  featureImageButton: {
    marginLeft: 30,
    borderColor: Colors.primaryColor,
    height: null
  },
  featureImageButtonText: {
    color: Colors.primaryColor
  },
  noticeText: {
    fontSize: 14, 
    color: Colors.textColorTwo
  }
})
