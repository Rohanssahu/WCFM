import { StyleSheet } from 'react-native'
import { Metrics, Colors, Fonts } from '../../../Themes'
export default StyleSheet.create({
  listItemContainer: {
    flex: 1,
    flexDirection: 'column',
    alignSelf: 'stretch',
    marginBottom: Metrics.mediumMargin,
  },  
  listCustomerNote: {
    backgroundColor: '#A7CEDC'
  },
  listItemRow: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'flex-start',
    padding: Metrics.microMargin
  },
  noteDateContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    marginBottom: Metrics.superMicroMargin
  },
  noteDate: {
    marginLeft: Metrics.superMicroMargin,
  },
  noteDetailsContainer: {
    flexDirection: 'row',
  },
})
