import React from 'react'
import { View, Text, FlatList, ActivityIndicator } from 'react-native'
import { connect } from 'react-redux'
import { Colors, Fonts } from '../Themes/'
import { SearchBar } from 'react-native-elements'
import OrderListingActions, { OrderListingSelectors } from '../Redux/OrderListingRedux'
import OrderListItem from '../Components/OrderListing/OrderListItem'
// More info here: https://facebook.github.io/react-native/docs/flatlist.html
import I18n from '../I18n'
// Styles
import styles from './Styles/OrderListingScreenStyle'

class OrderListing extends React.PureComponent {
  /* ***********************************************************
  * STEP 1
  * This is an array of objects with the properties you desire
  * Usually this should come from Redux mapStateToProps
  *************************************************************/
  static navigationOptions = {
    title: `${I18n.t('All Orders')}`,
    headerTitleStyle: { width: 280, fontWeight: 'normal', fontSize: Fonts.size.input, alignSelf: 'flex-start', marginHorizontal: 0 },
    headerTintColor: '#fff',
    headerStyle: { backgroundColor: Colors.secondaryColor }
  }

  componentDidMount () {
    if (!this.props.page) {
      this.props.getOrders({ page: 1 })
    }
  }

  handleRefresh = () => {
    this.props.getOrders({ page: 1 })
  };

  handleLoadMore = () => {
    const { page, search, hasError, isLoading, isAllLoaded } = this.props

    if (!isAllLoaded && !hasError && !isLoading) {
      this.props.getOrders({ page: page + 1, search })
    }
  };

  handleOnPress = (order) => {
    this.props.navigation.navigate(
      'OrderDetailsScreen',
      { order }
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
          paddingVertical: 20
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
      <OrderListItem order={item} index={index} onPress={this.handleOnPress} />
    )
  }

  /* ***********************************************************
  * STEP 3
  * Consider the configurations we've set below.  Customize them
  * to your liking!  Each with some friendly advice.
  *************************************************************/

  // Show this when data is empty
  // Show this when data is empty
  renderEmpty = () => this.props.isLoading ? null : (<View style={styles.messagesContainer}><Text style={styles.label}> - {I18n.t('No Orders Found')} - </Text></View>)

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
    const { orders, isLoading, search } = this.props
    // console.log(orders)
    return (
      <View style={styles.container}>
        <SearchBar
          onChangeText={this.props.onSearch}
          placeholder={I18n.t('Search Order Id') + '...'}
          searchIcon={{ size: 27 }}
          containerStyle={styles.searchContainer}
          inputContainerStyle={styles.searchInputContainerStyle}
          inputStyle={styles.searchInput}
          placeholderTextColor={Colors.textColorTwo}
          // inputStyle={styles.searchInput}
          value={search}
          // round
        />
        <FlatList
          data={orders}
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
    orders: OrderListingSelectors.orders(state),
    isLoading: OrderListingSelectors.isLoading(state),
    search: OrderListingSelectors.search(state),
    page: OrderListingSelectors.page(state),
    hasError: OrderListingSelectors.hasError(state),
    isAllLoaded: OrderListingSelectors.isAllLoaded(state)
  }
}

const mapDispatchToProps = {
  getOrders: OrderListingActions.orderListRequest,
  onSearch: OrderListingActions.orderSearchInput
}

export default connect(mapStateToProps, mapDispatchToProps)(OrderListing)
