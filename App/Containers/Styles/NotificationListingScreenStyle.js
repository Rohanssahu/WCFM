import { StyleSheet } from 'react-native'
import { ApplicationStyles, Colors } from '../../Themes'

export default StyleSheet.create({
  ...ApplicationStyles.screen,
  container: {
    flex: 1,
    backgroundColor: Colors.background
  },
  messagesContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    height: 400
  }
})
