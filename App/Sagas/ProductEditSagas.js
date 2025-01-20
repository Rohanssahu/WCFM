/* ***********************************************************
* A short word on how to use this automagically generated file.
* We're often asked in the ignite gitter channel how to connect
* to a to a third party api, so we thought we'd demonstrate - but
* you should know you can use sagas for other flow control too.
*
* Other points:
*  - You'll need to add this saga to sagas/index.js
*  - This template uses the api declared in sagas/index.js, so
*    you'll need to define a constant in that file.
*************************************************************/

import { call, put, select } from 'redux-saga/effects'
import _ from 'lodash'
import ProductEditActions, { ProductEditSelectors } from '../Redux/ProductEditRedux'
import ProductListingActions from '../Redux/ProductListingRedux'
import Toast from 'react-native-simple-toast'
import I18n from '../I18n'

export function * getProduct (api, action) {
  const { id } = action
  // get current data from Store
  // const currentData = yield select(ProductEditSelectors.getData)
  // make the call to the api
  try {
    const response = yield call(api.getProduct, id)
    // success?
    if (response.ok) {
      // You might need to change the response here - do this with a 'transform',
      // located in ../Transforms/. Otherwise, just pass the data back from the api.
      yield put(ProductEditActions.productSuccess(response.data))
    } else {
      yield put(ProductEditActions.productFailure())
    }
  } catch (e) {
    yield put(ProductEditActions.productFailure())
  }
}

export function * updateProduct (api, action) {
  try {
    //const product = yield select(ProductEditSelectors.getProduct)
    const { productData } = action
    //const initialState = yield select(ProductEditSelectors.getInitialState)
    const productId = productData.id

    // const data = _.reduce(Object.keys(product), (result, key) => _.isEqual(product[key], initialState[key])
    //   ? result : { ...result, [key]: product[key] }, {})

    const response = yield call(api.updateProduct, productId, productData)
    // console.log(response)
    if (response.ok) {
      yield put(ProductEditActions.updatedProduct(response.data))
      yield put(ProductListingActions.updateProductInList(response.data))
      Toast.show(I18n.t('Product Updated Successfully'))
    } else {
      yield put(ProductEditActions.errorUpdatingProduct())
      Toast.show(I18n.t('Error Updating Product'))
    }
  } catch (e) {
    // console.log(e)
    yield put(ProductEditActions.errorUpdatingProduct())
    Toast.show(I18n.t('Error Updating Product'))
  }
}

export function * createProduct (api, action) {
  try {
    //const product = yield select(ProductEditSelectors.getProduct)
    const { productData } = action
    //console.log(product)

    const response = yield call(api.createProduct, productData)
    if (response.ok) {
      yield put(ProductEditActions.updatedProduct(response.data))
      yield put(ProductListingActions.updateProductInList(response.data))
      Toast.show(I18n.t('Product Created Successfully'))
    } else {
      yield put(ProductEditActions.errorUpdatingProduct())
      Toast.show(I18n.t('Error Creating Product'))
    }
  } catch (e) {
    // console.log(e)
    yield put(ProductEditActions.errorUpdatingProduct())
    Toast.show(I18n.t('Error Creating Product'))
  }
}
