import { StyleSheet } from 'react-native'
import { Colors, Metrics, Fonts } from '../../Themes/'

export default StyleSheet.create({
  attachmentItem: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    /*backgroundColor: Colors.background,
    paddingTop: Metrics.extraLargeMargin,
    paddingBottom: Metrics.extraLargeMargin,
    paddingHorizontal: Metrics.extraLargeMargin,
    elevation: 2,
    borderRadius: 10*/
    marginBottom: Metrics.mediumMargin
  },
  containerStyle: {
    flex: 6    
  },
  inputContainerStyle: {
    minHeight: 0,
    borderColor: Colors.textColorTwo,
    borderWidth: 0.5,
    borderRadius: 10
  },  
  inputStyle: {
    minHeight: 0,
    paddingVertical: Metrics.superMicroMargin / 2,
    paddingHorizontal: 0,
    fontSize: Fonts.size.medium
  },
  customRoundedButtonStyle: {
    flex: 2, 
    justifyContent: 'flex-end',    
    fontSize: Fonts.size.small,
    borderRadius: 20,
    marginTop: 0,
  },
  customRoundedButtonTextStyle: {
    fontWeight: '400',
    textTransform: 'capitalize',
  },
})
