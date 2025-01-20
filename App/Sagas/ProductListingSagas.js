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

import { call, put } from 'redux-saga/effects'
import { delay } from 'redux-saga/effects'
import ProductListingActions from '../Redux/ProductListingRedux'
// import { ProductListingSelectors } from '../Redux/ProductListingRedux'

export function * getProductList (api, action) {
  const { data = {} } = action
  try {
    const response = yield call(api.getProducts, data)
    yield put(ProductListingActions.productListSuccess(response.data || [], data))
  } catch (e) {
    // console.log(e)
    yield put(ProductListingActions.productListFailure())
  }
}

export function * searchProduct (action) {
  yield delay(1000)
  const { searchTerm = '' } = action
  yield put(ProductListingActions.productListRequest({ page: 1, search: searchTerm }))
}
