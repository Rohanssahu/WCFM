import { StyleSheet } from 'react-native'
import { Colors } from '../../Themes/'

export default StyleSheet.create({
  button: {
    backgroundColor: Colors.secondaryColor,
    width: 50,
    height: 50,
    borderRadius: 50,
    position: 'absolute',
    right: 30,
    bottom: 60,
    elevation: 3,
    zIndex: 99
  }
})
