import React from 'react'
import { View, Text, FlatList, ActivityIndicator } from 'react-native'
import { connect } from 'react-redux'
import { Colors, Fonts } from '../Themes/'

import NotificationListingActions, { NotificationListingSelectors } from '../Redux/NotificationListingRedux'
import NotificationListItem from '../Components/NotificationListing/NotificationListItem'
// More info here: https://facebook.github.io/react-native/docs/flatlist.html
import I18n from '../I18n'
// Styles
import styles from './Styles/NotificationListingScreenStyle'

class NotificationListingScreen extends React.PureComponent {
  /* ***********************************************************
  * STEP 1
  * This is an array of objects with the properties you desire
  * Usually this should come from Redux mapStateToProps
  *************************************************************/
  static navigationOptions = {
    title: `${I18n.t('Notifications')}`,
    headerTitleStyle: { width: 280, fontWeight: 'normal', fontSize: Fonts.size.input, alignSelf: 'flex-start', marginHorizontal: 0 },
    headerTintColor: '#fff',
    headerStyle: { backgroundColor: Colors.secondaryColor }
  }

  componentDidMount () {
    if (!this.props.page) {
      this.props.getNotifications({ page: 1 })
    }
  }

  handleRefresh = () => {
    this.props.getNotifications({ page: 1 })
  };

  handleLoadMore = () => {
    const { page, hasError, isLoading, isAllLoaded } = this.props
    if (!isAllLoaded && !hasError && !isLoading) {
      this.props.getNotifications({ page: page + 1 })
    }
  };

  handleOnPress = (notification) => {
    this.props.navigation.navigate(
      'NotificationEditScreen',
      { notification }
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
  renderRow ({ item, index }) {
    return (
      <NotificationListItem notification={item} index={index} />
    )
  }

  /* ***********************************************************
  * STEP 3
  * Consider the configurations we've set below.  Customize them
  * to your liking!  Each with some friendly advice.
  *************************************************************/
  // Render a header?

  // Show this when data is empty
  renderEmpty = () => this.props.isLoading ? null : (<View style={styles.messagesContainer}><Text style={styles.label}> - {I18n.t('No Notifications Found')} - </Text></View>)

  // The default function if no Key is provided is index
  // an identifiable key is important if you plan on
  // item reordering.  Otherwise index is fine
  keyExtractor = (item, index) => `${index}`

  // How many items should be kept im memory as we scroll?
  oneScreensWorth = 20

  // extraData is for anything that is not indicated in data
  // for instance, if you kept "favorites" in `this.state.favs`
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
    const { notifications, isLoading } = this.props
    // console.log(this.props);
    return (
      <View style={styles.container}>
        <FlatList
          data={notifications}
          renderItem={this.renderRow}
          keyExtractor={this.keyExtractor}
          ListHeaderComponent={this.renderHeader}
          ListFooterComponent={this.renderFooter}
          refreshing={isLoading}
          onEndReached={this.handleLoadMore}
          onEndReachedThreshold={0.4}
          stickyHeaderIndices={[0]}
          ListEmptyComponent={this.renderEmpty}
          onRefresh={this.handleRefresh}
        />
      </View>
    )
  }
}
const mapStateToProps = (state) => {
  // console.log(state);
  return {
    notifications: NotificationListingSelectors.notifications(state),
    isLoading: NotificationListingSelectors.isLoading(state),
    page: NotificationListingSelectors.page(state),
    hasError: NotificationListingSelectors.hasError(state),
    isAllLoaded: NotificationListingSelectors.isAllLoaded(state)
  }
}

const mapDispatchToProps = {
  getNotifications: NotificationListingActions.notificationListRequest,
  onSearch: NotificationListingActions.notificationSearchInput
}

export default connect(mapStateToProps, mapDispatchToProps)(NotificationListingScreen)
