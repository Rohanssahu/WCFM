import React from 'react'
import { View, Text, FlatList, ActivityIndicator } from 'react-native'
import { connect } from 'react-redux'
import { Colors, Fonts } from '../Themes/'
import BookingListingActions, { BookingListingSelectors } from '../Redux/BookingListingRedux'
import BookingListItem from '../Components/BookingListing/BookingListItem'
// More info here: https://facebook.github.io/react-native/docs/flatlist.html
import I18n from '../I18n'
// Styles
import styles from './Styles/BookingListingScreenStyle'

class BookingListing extends React.PureComponent {
  /* ***********************************************************
  * STEP 1
  * This is an array of objects with the properties you desire
  * Usually this should come from Redux mapStateToProps
  *************************************************************/
  static navigationOptions = {
    title: `${I18n.t('All Bookings')}`,
    headerTitleStyle: { width: 280, fontWeight: 'normal', fontSize: Fonts.size.input, alignSelf: 'flex-start', marginHorizontal: 0 },
    headerTintColor: '#fff',
    headerStyle: { backgroundColor: Colors.secondaryColor }
  }

  componentDidMount () {
    if (!this.props.page) {
      this.props.getBookings({ page: 1 })
    }
  }

  handleRefresh = () => {
    this.props.getBookings({ page: 1 })
  };

  handleLoadMore = () => {
    const { page, search, hasError, isLoading, isAllLoaded } = this.props

    if (!isAllLoaded && !hasError && !isLoading) {
      this.props.getBookings({ page: page + 1, search })
    }
  };

  handleOnPress = (booking) => {
    this.props.navigation.navigate(
      'BookingDetailsScreen',
      { bookingId: booking.id }
    )
  }

  renderHeader = () => {
    return null
  };

  renderFooter = () => {
    if (!this.props.isLoading) return null

    return (
      <View
        style={{
          paddingVertical: 20,
          borderTopWidth: 1,
          borderColor: '#CED0CE'
        }}
      >
        <ActivityIndicator animating size='large' />
      </View>
    )
  };

  /* ***********************************************************
  * STEP 2
  * `renderRow` function. How each cell/row should be rendered
  * It's our best practice to place a single component here:
  *
  * e.g.
    return <MyCustomCell title={item.title} description={item.description} />
  *************************************************************/
  renderRow = ({ item, index }) => {
    return (
      <BookingListItem booking={item} index={index} onPress={this.handleOnPress} />
    )
  }

  /* ***********************************************************
  * STEP 3
  * Consider the configurations we've set below.  Customize them
  * to your liking!  Each with some friendly advice.
  *************************************************************/

  // Show this when data is empty
  // Show this when data is empty
  renderEmpty = () => this.props.isLoading ? null : (<View style={styles.messagesContainer}><Text style={styles.label}> - {I18n.t('No Bookings Found')} - </Text></View>)

  // The default function if no Key is provided is index
  // an identifiable key is important if you plan on
  // item reordering.  Otherwise index is fine
  keyExtractor = (item, index) => `${index}`

  // How many items should be kept im memory as we scroll?
  oneScreensWorth = 20

  // extraData is for anything that is not indicated in data
  // for instance, if you kept 'favorites' in `this.state.favs`
  // pass that in, so changes in favorites will cause a re-render
  // and your renderItem will have access to change depending on state
  // e.g. `extraData`={this.state.favs}

  // Optimize your list if the height of each item can be calculated
  // by supplying a constant height, there is no need to measure each
  // item after it renders.  This can save significant time for lists
  // of a size 100+
  // e.g. itemLayout={(data, index) => (
  //   {length: ITEM_HEIGHT, offset: ITEM_HEIGHT * index, index}
  // )}

  render () {
    const { bookings, isLoading } = this.props
    return (
      <View style={styles.container}>
        <FlatList
          data={bookings}
          renderItem={this.renderRow}
          keyExtractor={this.keyExtractor}
          ListHeaderComponent={this.renderHeader}
          ListFooterComponent={this.renderFooter}
          refreshing={isLoading}
          onEndReached={this.handleLoadMore}
          onEndReachedThreshold={0.4}
          stickyHeaderIndices={[0]}
          onRefresh={this.handleRefresh}
          ListEmptyComponent={this.renderEmpty}
        />
      </View>
    )
  }
}

// const mapStateToProps = (state) => {
//   return {
//     // ...redux state to props here
//   }
// }
//
// const mapDispatchToProps = (dispatch) => {
//   return {
//   }
// }
const mapStateToProps = (state) => {
  return {
    bookings: BookingListingSelectors.bookings(state),
    isLoading: BookingListingSelectors.isLoading(state),
    search: BookingListingSelectors.search(state),
    page: BookingListingSelectors.page(state),
    hasError: BookingListingSelectors.hasError(state),
    isAllLoaded: BookingListingSelectors.isAllLoaded(state)
  }
}

const mapDispatchToProps = {
  getBookings: BookingListingActions.bookingListRequest,
  onSearch: BookingListingActions.bookingSearchInput
}

export default connect(mapStateToProps, mapDispatchToProps)(BookingListing)
