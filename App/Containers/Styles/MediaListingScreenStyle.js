import { StyleSheet, Platform } from 'react-native'
import { ApplicationStyles, Colors, Fonts, Metrics } from '../../Themes'
import colors from '../../Themes/Colors'

export default StyleSheet.create({
  ...ApplicationStyles.screen,
  container: {
    flex: 1,
    backgroundColor: Colors.mainBackgroundColor
  },
  mediaListing: {
    flex: 1,
  },
  floatingAddButton: {
    top: 40,
    // bottom: 20,
  },
  mediaModalContainer: {
    padding: Metrics.xxLargeMargin
  },
  mediaModalInnerContainer: {
    //flexDirection: 'row',
    // borderWidth: 1,
    // borderColor: Colors.borderLight,
    //justifyContent: "center",
    //alignItems: "center"
    // borderRadius: 10,
    // paddingVertical: Metrics.miniMargin,
    // paddingHorizontal: Metrics.xxLargeMargin * 1.5
    // paddingTop: Platform.OS == 'ios' ? Metrics.extraLargeMargin : 0
  },
  mediaUploaderHeading: {
    textAlign: "center",
    fontFamily: Fonts.type.bold,
    fontWeight: "bold",
    fontSize: Fonts.size.h5,
    marginBottom: Metrics.extraLargeMargin,
    marginTop: Platform.OS == 'ios' ? Metrics.extraLargeMargin : 0
  },
  
  mediaUploadButtonContainer: {
    //flexDirection: 'row',
    alignItems: "center",
    textAlign: "center",
    borderWidth: 1,
    paddingBottom: Metrics.xxLargeMargin,
    paddingTop: Metrics.mediumMargin,
    borderColor: Colors.mainBackgroundColor,
    borderRadius: 10,
    marginBottom: Metrics.miniMargin,
    backgroundColor: Colors.backgroundLight
  },
  mediaUploadImageContainer: {
    //flex: 1,
    height: 220,
    width: 220,
    //backgroundColor: colors.mainBackgroundColor,
    justifyContent: "center",
    alignItems: "center",
    // borderTopLeftRadius: 10, 
    // borderBottomLeftRadius: 10,   
  },

  selectImageTextContainer: {
    flexDirection: 'row',
    marginTop: Metrics.mediumMargin,
    backgroundColor: Colors.mainBackgroundColor,
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: Metrics.miniMargin
  },

  selectImageTextIconContainer: {
    padding: Metrics.superMicroMargin/ 2,
    backgroundColor: Colors.secondaryColor,
    borderRadius: 50
  },

  updateButton: {
    alignSelf: "center"
  },

  updateButtonDisabled: {
    
    backgroundColor: Colors.cloud,
    alignSelf: 'center'
  },

  selectImageText: {
    marginLeft: Metrics.miniMargin,
    fontSize: Fonts.size.regular,
  },
  messagesContainer: {
    marginTop: Metrics.mediumMargin,
    marginHorizontal: Metrics.mediumMargin,
    flex: 1,
  },
  gobackText: {
    color: Colors.primaryColor,
    fontSize: Fonts.size.regular
  }

})
