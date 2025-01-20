import { StyleSheet } from 'react-native'
import { Colors, Fonts, ApplicationStyles, Metrics } from '../../Themes/'

export default StyleSheet.create({
  ...ApplicationStyles.screen,
  container: {
    marginBottom: 36
  },
  headerButtonContainer: {
    flexDirection: 'row',
    flex: 1
  },
  buttonsContainer: {
    flexDirection: 'row',
    flex: 1,
    justifyContent: 'center',
    marginTop: Metrics.doubleBaseMargin,
    flexWrap: 'wrap'
  },
  secondButtonbox: {
    marginLeft: 0
  },
  centered: {
    alignItems: 'center'
  },
  sectionText: {
    textAlign: 'center',
    fontWeight: 'bold',
    fontFamily: Fonts.base,
    fontSize: Fonts.size.h5,
    lineHeight: 50,
    color: Colors.text,
    backgroundColor: Colors.headerBackground
  },
  head: { height: 40, backgroundColor: Colors.tertiaryColor },
  wrapper: { flexDirection: 'row' },
  title: { flex: 1, backgroundColor: Colors.tertiaryColor },
  row: { height: 28 },
  text: { textAlign: 'right', marginRight: Metrics.smallMargin },
  borderStyle: { borderColor: Colors.secondaryColor },
  stats: { margin: Metrics.baseMargin }
})
