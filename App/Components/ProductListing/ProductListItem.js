import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { compose } from 'redux'
import { CapabilitiesSelectors } from '../../Redux/CapabilitiesRedux'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
import { View, Text, TouchableOpacity } from 'react-native'
import { Image } from 'react-native-elements'
import StatusLabel from '../WcGlobals/StatusLabel'
import DisplayPrice from '../WcGlobals/DisplayPrice'
import styles from './Styles/ProductListItemStyle'
import { Colors } from '../../Themes'

class ProductListItem extends Component {
  // // Prop type warnings
  static propTypes = {
    product: PropTypes.object,
    index: PropTypes.number,
    onPress: PropTypes.func,
    capabilities: PropTypes.object
  }

  onPress = () => {
    if (this.props.capabilities.edit_live_products) return
    if (this.props.onPress) {
      this.props.onPress(this.props.product, this.props.index)
    }
  }

  render () {
    return (
      <TouchableOpacity style={this.props.index ? styles.listItemContainer : styles.listItemContainerFirst} onPress={this.onPress}>
        <View style={styles.listItemRow}>
          <Image
            style={styles.productImage}
            source={{ uri: `${this.props.product.images[0].src}` }}
          />
          <View style={styles.productNamePriceContainer}>
            <Text style={styles.productName}>{this.props.product.name}</Text>
            <View style={styles.productPriceContainer}>
              <DisplayPrice
                style={styles.productPrice}
                regularPrice={this.props.product.regular_price}
                onSale={this.props.product.on_sale}
                salePrice={this.props.product.sale_price}
                priceHtml={this.props.product.price_html}
              />
              <Text style={styles.productTypeStyle}>{this.props.product.type}</Text>
            </View>
          </View>
        </View>
      </TouchableOpacity>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    capabilities: CapabilitiesSelectors.getData(state)
  }
}

export default compose(
  connect(mapStateToProps)
)(ProductListItem)
