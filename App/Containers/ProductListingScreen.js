import React from 'react'
import { View, Text, FlatList, ActivityIndicator, LayoutAnimation, UIManager } from 'react-native'
import { compose } from 'redux'
import { connect } from 'react-redux'
import { withNavigation } from 'react-navigation'
import { Colors, Fonts } from '../Themes'
import { SearchBar } from 'react-native-elements'
import ProductListingActions, { ProductListingSelectors } from '../Redux/ProductListingRedux'
import ProductListItem from '../Components/ProductListing/ProductListItem'
import FloatingAddButton from '../Components/FloatingAddButton'
// More info here: https://facebook.github.io/react-native/docs/flatlist.html
import I18n from '../I18n'
// Styles
import styles from './Styles/ProductListingScreenStyle'

class ProductListing extends React.PureComponent {
  static navigationOptions = {
    title: `${I18n.t('All Products')}`,
    headerTitleStyle: { width: 280, fontWeight: 'normal', fontSize: Fonts.size.input, alignSelf: 'flex-start', marginHorizontal: 0 },
    headerTintColor: '#fff',
    headerStyle: { backgroundColor: Colors.secondaryColor }
    // headerTitleStyle: { color: 'green' },
  }

  constructor () {
    super()
    UIManager.setLayoutAnimationEnabledExperimental && UIManager.setLayoutAnimationEnabledExperimental(true)
  }

  state = {
    isActionButtonVisible: true
  }

  onAddButtonPress = () => {
    this.props.navigation.navigate(
      'CreateProductScreen'
    )
  }

  componentDidMount () {
    if (!this.props.page) {
      this.props.getProducts({ page: 1 })
    }
  }

  handleRefresh = () => {
    this.props.getProducts({ page: 1 })
  };

  handleLoadMore = () => {
    const { page, search, hasError, isLoading, isAllLoaded } = this.props
    if (!isAllLoaded && !hasError && !isLoading) {
      this.props.getProducts({ page: page + 1, search })
    }
  };

  handleOnPress = (product) => {
    this.props.navigation.navigate(
      'ProductEditScreen',
      { product }
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
        }}x
      >
        <ActivityIndicator animating size='large' />
      </View>
    )
  };

  renderRow = ({ item, index }) => {
    return (
      <ProductListItem product={item} index={index} onPress={this.handleOnPress} />
    )
  }

  renderEmpty = () => this.props.isLoading ? null : (<View style={styles.messagesContainer}><Text style={styles.label}> {this.props.hasError ? I18n.t('Error Loading Products') : '- ' + I18n.t('No Products Found') + ' -'} </Text></View>)

  keyExtractor = (item, index) => item.id + '' + index

  stickyHeaderIndices = [0]

  _listViewOffset = 0

  _onScroll = (event) => {
    const CustomLayoutLinear = {
      duration: 100,
      create: { type: LayoutAnimation.Types.linear, property: LayoutAnimation.Properties.opacity },
      update: { type: LayoutAnimation.Types.linear, property: LayoutAnimation.Properties.opacity },
      delete: { type: LayoutAnimation.Types.linear, property: LayoutAnimation.Properties.opacity }
    }
    const currentOffset = event.nativeEvent.contentOffset.y
    const direction = (currentOffset > 0 && currentOffset > this._listViewOffset)
      ? 'down'
      : 'up'
    const isActionButtonVisible = direction === 'up'
    if (isActionButtonVisible !== this.state.isActionButtonVisible) {
      LayoutAnimation.configureNext(CustomLayoutLinear)
      this.setState({ isActionButtonVisible })
    }
    // Update your scroll position
    this._listViewOffset = currentOffset
  }

  render () {
    const { products, isLoading, search } = this.props
    const { isActionButtonVisible } = this.state
    return (
      <View style={styles.container}>
        <SearchBar
          onChangeText={this.props.onSearch}
          placeholder={I18n.t('Search') + '...'}
          searchIcon={{ size: 27 }}
          containerStyle={styles.searchContainer}
          inputContainerStyle={styles.searchInputContainerStyle}
          inputStyle={styles.searchInput}
          placeholderTextColor={Colors.textColorTwo}
          value={search}
          //round
        />
        <View style={styles.InnerFlatListContainer}>
          <FlatList
            data={products}
            renderItem={this.renderRow}
            keyExtractor={this.keyExtractor}
            ListHeaderComponent={this.renderHeader}
            ListFooterComponent={this.renderFooter}
            refreshing={isLoading}
            onEndReached={this.handleLoadMore}
            onEndReachedThreshold={0.4}
            stickyHeaderIndices={this.stickyHeaderIndices}
            ListEmptyComponent={this.renderEmpty}
            onRefresh={this.handleRefresh}
            onScroll={this._onScroll}
          />
          {isActionButtonVisible && !isLoading && <FloatingAddButton handlePress={this.onAddButtonPress} />}
        </View>
        
      </View>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    products: ProductListingSelectors.products(state),
    isLoading: ProductListingSelectors.isLoading(state),
    search: ProductListingSelectors.search(state),
    page: ProductListingSelectors.page(state),
    hasError: ProductListingSelectors.hasError(state),
    isAllLoaded: ProductListingSelectors.isAllLoaded(state)
  }
}

const mapDispatchToProps = {
  getProducts: ProductListingActions.productListRequest,
  onSearch: ProductListingActions.productSearchInput
}

export default compose(
  connect(mapStateToProps, mapDispatchToProps),
  withNavigation
)(ProductListing)
