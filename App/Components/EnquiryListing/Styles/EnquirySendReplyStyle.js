import { StyleSheet } from 'react-native'
import { Colors } from '../../../Themes'

export default StyleSheet.create({
  footer: {
    flexDirection: 'row',
    // height: 100,
    backgroundColor: Colors.stickyFooterBackground,
    paddingHorizontal: 10,
    padding: 10
  },
  btnSend: {
    backgroundColor: Colors.secondaryColor,
    width: 45,
    height: 45,
    borderRadius: 360,
    alignItems: 'center',
    justifyContent: 'center',
    paddingLeft: 3
  },
  iconSend: {
    width: 25,
    height: 25,
    alignSelf: 'center'
  },
  inputContainer: {
    backgroundColor: Colors.background,
    borderRadius: 30,
    height: 45,
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
    marginRight: 10
  },
  inputs: {
    height: 40,
    marginLeft: 16,
    borderBottomColor: '#FFFFFF',
    flex: 1
  }
})
