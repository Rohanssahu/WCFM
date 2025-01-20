import React, { Component } from 'react'
// import PropTypes from 'prop-types';
import styles from './Styles/ProductEditFormStyle'
import t from 'tcomb-form-native'

const Form = t.form.Form

const Product = t.struct({
  name: t.String,
  featured: t.Boolean,
  description: t.String,
  short_description: t.String,
  regular_price: t.String,
  sale_price: t.String,
  manage_stock: t.Boolean,
  in_stock: t.Boolean,
  stock_quantity: t.Number
})

export default class ProductEditForm extends Component {
  // // Prop type warnings
  // static propTypes = {
  //   someProperty: PropTypes.object,
  //   someSetting: PropTypes.bool.isRequired,
  // }
  //
  // // Defaults for props
  // static defaultProps = {
  //   someSetting: false
  // }

  setRef = (e) => {
    this.form = e
  }

  render () {
    return (
      <Form
        ref={this.setRef}
        type={Product}
        styles={styles.container}
      />
    )
  }
}
