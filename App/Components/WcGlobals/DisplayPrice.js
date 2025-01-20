import React, { Component } from 'react'
import PropTypes from 'prop-types'
import HTML from 'react-native-render-html'
import { View, Text } from 'react-native'
import { Colors, Fonts } from '../../Themes/'
import styles from './Styles/DisplayPriceStyle'
import I18n from '../../I18n'

export default class DisplayPrice extends Component {
  // // Prop type warnings
  static propTypes = {
    regularPrice: PropTypes.string.isRequired,
    onSale: PropTypes.bool.isRequired,
    salePrice: PropTypes.string.isRequired,
    priceHtml: PropTypes.string
  }

  //
  // // Defaults for props
  static defaultProps = {
    regularPrice: 0,
    onSale: false,
    salePrice: 0
  }

  render () {
    // console.log(this.props.style);
    // if( this.props.onSale ){
    const hasPrice = <HTML
      html={this.props.priceHtml}
      tagsStyles={{
        del: { color: Colors.colorFailed, textDecorationLine: 'line-through', flex: 1, alignSelf: 'flex-start', textDecorationStyle: 'solid', fontSize: 14 },
        ins: { flex: 1, marginRight: 30, fontSize: 14, alignSelf: 'flex-start' }
      }}
      classesStyles={{
        'woocommerce-Price-amount': { fontSize: 14 }
      }}
    />
    const noPrice = <Text style={styles.productPriceText} >-</Text>
    return (
      <View style={[styles.container, this.props.style]}>
        <Text style={styles.productPriceText} >{I18n.t('Price')}: </Text>
        {this.props.priceHtml ? hasPrice : noPrice}
      </View>
    )
  }
}
