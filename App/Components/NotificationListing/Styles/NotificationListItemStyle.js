import { StyleSheet } from 'react-native'
import { Metrics, Colors, Fonts } from '../../../Themes'

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background
  },
  row: {
    flex: 1,
    backgroundColor: Colors.background,
    padding: Metrics.baseMargin,
    paddingTop: Metrics.smallMargin,
    justifyContent: 'center',
    borderTopWidth: 2,
    borderTopColor: Colors.lightText
  },
  rowFirst: {
    backgroundColor: Colors.background,
    padding: Metrics.baseMargin,
    paddingTop: Metrics.smallMargin,
    justifyContent: 'center'
  },
  notificationIconNameContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    // marginBottom: Metrics.smallMargin,
    paddingRight: Metrics.section
  },
  notificationName: {
    ...Fonts.style.normal,
    // backgroundColor: Colors.tertiaryColor,
    fontWeight: 'bold',
    color: Colors.boldText,
    flexWrap: 'wrap',
    textAlign: 'left',
    marginLeft: Metrics.smallMargin
  },
  notificationDateStatusContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center'
  },
  notificationDateContainer: {
    flex: 1,
    flexDirection: 'row'
  },
  notificationStatusContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'flex-end'
  },
  notificationDate: {
    marginLeft: Metrics.smallMargin / 2
  },
  label: {
    textAlign: 'center',
    color: Colors.text
  }
})
