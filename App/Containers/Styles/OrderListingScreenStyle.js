import { StyleSheet } from 'react-native'
import { ApplicationStyles, Colors, Metrics, Fonts } from '../../Themes'

export default StyleSheet.create({
  ...ApplicationStyles.screen,
  container: {
    flex: 1,
    backgroundColor: Colors.mainBackgroundColor
  },
  searchContainer: {
    backgroundColor: Colors.background,
    borderTopWidth: 0,
    borderBottomWidth: 2,
    paddingVertical: Metrics.superMicroMargin / 2,
    borderBottomColor: Colors.mainBackgroundColor
  },
  searchInputContainerStyle: {
    backgroundColor: Colors.background
  },
  searchInput: {
    color: Colors.textColorTwo,
    fontSize: Fonts.size.h6
  },
  messagesContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    height: 400
  }
})
