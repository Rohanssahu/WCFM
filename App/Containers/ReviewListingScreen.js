import React from 'react'
import { View, Text, FlatList, ActivityIndicator } from 'react-native'
import { connect } from 'react-redux'
import { Colors, Fonts } from '../Themes/'
// import { SearchBar } from 'react-native-elements'
import ReviewListingActions, { ReviewListingSelectors } from '../Redux/ReviewListingRedux'
import ReviewListItem from '../Components/ReviewListing/ReviewListItem'
// More info here: https://facebook.github.io/react-native/docs/flatlist.html
import I18n from '../I18n'
// Styles
import styles from './Styles/ReviewListingScreenStyle'

class ReviewListing extends React.PureComponent {
  /* ***********************************************************
  * STEP 1
  * This is an array of objects with the properties you desire
  * Usually this should come from Redux mapStateToProps
  *************************************************************/
  static navigationOptions = {
    title: `${I18n.t('All Reviews')}`,
    headerTitleStyle: { width: 280, fontWeight: 'normal', fontSize: Fonts.size.input, alignSelf: 'flex-start', marginHorizontal: 0 },
    headerTintColor: '#fff',
    headerStyle: { backgroundColor: Colors.secondaryColor }
  }

  componentDidMount () {
    // console.log(this.props)
    if (!this.props.page) {
      this.props.getReviews({ page: 1 })
    }
  }

  handleRefresh = () => {
    this.props.getReviews({ page: 1 })
  };

  handleLoadMore = () => {
    const { page, hasError, isLoading, isAllLoaded } = this.props

    if (!isAllLoaded && !hasError && !isLoading) {
      this.props.getReviews({ page: page + 1 })
    }
  };

  //   handleOnPress = (review) => {
  //     this.props.navigation.navigate(
  //       'ReviewEditScreen',
  //       { review }
  //     )
  //   }

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
    const { isUpdating, updatingId, updateReviewStatus } = this.props
    // console.log(item)
    return (
      <ReviewListItem review={item} index={index} updating={isUpdating && parseInt(item.ID) === updatingId} onUpdate={updateReviewStatus} />
    )
  }

  /* ***********************************************************
  * STEP 3
  * Consider the configurations we've set below.  Customize them
  * to your liking!  Each with some friendly advice.
  *************************************************************/

  // Show this when data is empty
  // Show this when data is empty
  renderEmpty = () => this.props.isLoading ? null : (<View style={styles.messagesContainer}><Text style={styles.label}> - {I18n.t('No Reviews Found')} - </Text></View>)

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
    const { reviews, isLoading } = this.props
    if (!reviews) {
      return null
    }

    return (
      <View style={styles.container}>
        <FlatList
          data={reviews}
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

const mapStateToProps = (state) => {
  // console.log
  return {
    reviews: ReviewListingSelectors.reviews(state),
    isLoading: ReviewListingSelectors.isLoading(state),
    // search: ReviewListingSelectors.search(state),
    page: ReviewListingSelectors.page(state),
    hasError: ReviewListingSelectors.hasError(state),
    isAllLoaded: ReviewListingSelectors.isAllLoaded(state),
    isUpdating: ReviewListingSelectors.isUpdating(state),
    updatingId: ReviewListingSelectors.updatingId(state)
  }
}

const mapDispatchToProps = {
  getReviews: ReviewListingActions.reviewListRequest,
  //   onSearch: ReviewListingActions.reviewSearchInput,
  updateReviewStatus: ReviewListingActions.updateReviewStatus
}

export default connect(mapStateToProps, mapDispatchToProps)(ReviewListing)
