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
import OrderListingActions from '../Redux/OrderListingRedux'
// import { OrderListingSelectors } from '../Redux/OrderListingRedux'

export function * getOrderList (api, action) {
  const { data = {} } = action
  try {
    const response = yield call(api.getOrders, data)
    yield put(OrderListingActions.orderListSuccess(response.data || [], data))
  } catch (e) {
    yield put(OrderListingActions.orderListFailure())
  }
}

export function * searchOrder (action) {
  yield delay(1000)
  const { searchTerm = '' } = action
  yield put(OrderListingActions.orderListRequest({ page: 1, search: searchTerm }))
}

/*export function * updateStatus (api, action) {
  try {
    const { id, status } = action
    const response = yield call(api.updateOrderStatus, id, status)
    if (response.ok) {
      yield put(OrderListingActions.updatedStatus(id, status))
    } else {
      yield put(OrderListingActions.errorUpdatingStatus(response.data))
    }
  } catch (e) {
    yield put(OrderListingActions.errorUpdatingStatus(e))
  }
}*/
